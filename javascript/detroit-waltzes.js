
var xScale,
    yScale,

    map,

    mapImage,
    mapWidth,
    mapHeight,

    circleRadius,
    circleStrokeWidth,

    topleft,
    bottomright,

    originalMapWidth,
    originalMapHeight,

    mapScaleFactorX,
    mapScaleFactorY,

    svg,
    svgContainer,
    circle,
    tooltip,
    video,
    videoContainer,
    selected = null,

    waltzFormatter = d3.format("03d"),
    pixelFormatter = d3.format("f"),
    latLonFormatter = d3.format(".3f");

function findByIndex(index) {
  return locationdata.filter(function(obj) {
      // coerce both obj.index and index to numbers for val & type comparison
      return +obj.index === +index;
  })[ 0 ];
}

function originalPixelLocation(index) {
  var location = findByIndex(index),
      xPixel = xScale.invert(location.longitude),
      yPixel = yScale.invert(location.latitude);
  return [xPixel, yPixel];
}

function actualPixelLocation(index) {
  var location = originalPixelLocation(index);
  return [location[0]*mapScaleFactorX, location[1]*mapScaleFactorY];
}

function updateActualPositions() {
  locationdata.forEach(function(location) {
    var pos = actualPixelLocation(location.index);
    location.x = pos[0];
    location.y = pos[1];
  })
}

function updateCircles() {
  circle
    .classed("selected", function(d) {
      return selected === d ? true : false })
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y })
    .attr("r", circleRadius)
    .style("stroke-width", function(d) {
      if (selected === d) {
        return circleStrokeWidth * 1.5;
      } else {
        return circleStrokeWidth;
      }
    })
}

function generateVideoKeyStr(location) {
  var istr = waltzFormatter(location.index)
  return istr + "-" + location.waltz + location.movement
}

function showVideo(d) {
  videoContainer.transition()
     .duration(500)
     .style("opacity", 1.0)
     .each("end", function(d) {
       video.node().play();
      })

  video = videoContainer.append("video");
  video
    .append("source")
      .attr("src", "video/mp4-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
    .append("source")
      .attr("src", "video/webm-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.webm")
      .attr("type", 'video/webm; codecs="vp8, vorbis"');
}

function hideVideo(d) {
  videoContainer.transition()
     .duration(500)
     .style("opacity", 0)
     .each("end", function(d) {
       videoContainer.selectAll('video').remove();
     })
}

function resizeTooltip(d) {
  var cnode = d3.select('circle[data-index="' + d.index + '"]').node(),
      cx = +cnode.getAttribute('cx'),
      cy = +cnode.getAttribute('cy'),
      ctm = cnode.getCTM(),
      xpos = ctm.e + cx*ctm.a,
      ypos = ctm.f + cy*ctm.d,
      html,
      height,
      width;

  d3.event = null;
  function tooltipPosLeft(width) {
    if (xpos + 8 + width > mapWidth ) {
      return mapWidth - width;
    } else if (xpos + 8 < 0) {
      return 0;
    } else {
      return xpos + 8;
    }
  }

  function tooltipPosTop(height) {
    if (ypos - 28 < 0) {
      return 0;
    } else if (ypos - 28 + height > mapHeight) {
      return mapHeight - height;
    } else {
      return ypos - 28;
    }
  }

  height = tooltip.node().offsetHeight;
  width = tooltip.node().offsetWidth;
  tooltip
      .style("left", tooltipPosLeft(width) + "px")
      .style("top", tooltipPosTop(height) + "px");
}

function showTooltip(d) {
  tooltip.html(d.index + ": " + d.waltz + d.movement +
         "<br/>" + d.address +
         "<br/>" + latLonFormatter(d.latitude) + ", " + latLonFormatter(d.longitude) +
         "<br/>" + pixelFormatter(d.x) + ", " + pixelFormatter(d.y));
  resizeTooltip(d);
  tooltip.transition()
     .duration(200)
     .style("opacity", .9);
}

function hideTooltip(d) {
  tooltip.transition()
     .duration(500)
     .style("opacity", 0)
}

function saveLocation(d) {
  localStorage.setItem("waltzLocation", JSON.stringify(d));
}
// JSON.parse(localStorage.getItem("waltzLocation"))

function handleKeyboardEvents(evt) {
  var newIndex;
  evt = (evt) ? evt : ((window.event) ? event : null);
  if (evt) {
    switch (evt.keyCode) {
      case 37:                    // left arrow
      if (!selected) {
        selected = locationdata[locationdata.length - 1]
      } else {
        newIndex = locationdata.indexOf(selected) - 1;
        if (newIndex < 0) {
          newIndex = locationdata.length - 1;
        }
        hideTooltip(selected);
        hideVideo(selected);
        videoContainer.selectAll('video').remove();
        videoContainer.style("opacity", 0)
        selected = locationdata[newIndex];
        saveLocation(selected);
      }
      updateCircles();
      showTooltip(selected);
      // showVideo(selected);
      evt.preventDefault();
      break;

      case 38:                    // up arrow
      evt.preventDefault();
      break;

      case 39:                    // right arrow
      evt.preventDefault();
      if (!selected) {
        selected = locationdata[0]
      } else {
        newIndex = locationdata.indexOf(selected) + 1;
        if (newIndex + 1 > locationdata.length) {
          newIndex = 0;
        }
        hideTooltip(selected);
        hideVideo(selected);
        videoContainer.selectAll('video').remove();
        videoContainer.style("opacity", 0)
        selected = locationdata[newIndex];
      }
      updateCircles();
      showTooltip(selected);
      // showVideo(selected);
      saveLocation(selected);
      break;

      case 40:                    // down arrow
      evt.preventDefault();
      break;

      case 27:                   // ESC
      evt.preventDefault();
      if (selected) {
        hideTooltip(selected);
        hideVideo(selected);
        videoContainer.selectAll('video').remove();
        videoContainer.style("opacity", 0)
        selected = null;
        updateCircles();
      }
      break;
    }
  }
}

function setup() {
  mapWidth = mapImage.offsetWidth;
  mapHeight = mapImage.offsetHeight;

  circleRadius = mapWidth/200;
  circleStrokeWidth = circleRadius/4;

  topleft = mapdata.registration.topleft;
  bottomright = mapdata.registration.bottomright;
  originalMapWidth = mapdata.width;
  originalMapHeight = mapdata.height;

  mapScaleFactorX = mapWidth/originalMapWidth;
  mapScaleFactorY = mapHeight/originalMapHeight;

  xScale = d3.scale.linear();
  xScale.domain([topleft.x_pixel, bottomright.x_pixel])
  xScale.range([topleft.longitude, bottomright.longitude])

  yScale = d3.scale.linear();
  yScale.domain([topleft.y_pixel, bottomright.y_pixel])
  yScale.range([topleft.latitude, bottomright.latitude])

  mapContainer = d3.select('#map-container');

  document.body.style.fontSize = mapWidth/960 * 12 + 'px';

  updateActualPositions();
}

function resizeSVG() {
  svg.attr("width",  mapWidth)
     .attr("height", mapHeight);
}

function resizeVideoContainer() {
  var paddingWidth = mapWidth/160,
      paddingHeight = paddingWidth,
      videoWidth = mapWidth/2.5,
      videoHeight = videoWidth * 9/16,
      videoLeft = Math.min(mapWidth, window.innerWidth) - (videoWidth + paddingWidth),
      videoTop =  Math.min(mapHeight, window.innerHeight) - (videoHeight + paddingHeight);

  videoContainer
      .style("left", videoLeft + "px")
      .style("top", videoTop + "px")
      .style("width", videoWidth + "px")
      .style("height", videoHeight + "px");
}

function handleResize() {
  setup();
  resizeSVG();
  updateCircles();
  resizeVideoContainer();
  if (selected) {
    resizeTooltip(selected);
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  mapImage = document.getElementById('map-image');
  localStorage.setItem("videoPath", "");
  setup();

  svgContainer = d3.select('body').append("div")
      .attr("id", "svg-container");

  svg = svgContainer.append("svg")
      .attr("class", "map-svg");

  resizeSVG();

  tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("z-index", 3);

  videoContainer = d3.select("body")
      .append("div")
      .attr("id", "video-container")
      .style("opacity", 0)
      .style("z-index", 1);

  resizeVideoContainer();

  circle = svg.selectAll("circle")
    .data(locationdata, function (d) { return d.index });

  circle.enter().append("circle")
      .attr("class", "location")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("data-index", function(d) { return d.index; })
      .attr("r", circleRadius)
      .style("stroke-width", circleStrokeWidth)
      .style("z-index", 2)
      .on("mouseover", function(d) {
        if (!selected) {
          videoContainer.selectAll('video').remove();
          videoContainer.style("opacity", 0);
          showTooltip(d);
          showVideo(d);
          saveLocation(d);
        }
      })
      .on("mouseout", function(d) {
        if (!selected) {
          hideVideo(d);
          hideTooltip(d);
        }
      })
      .on("mousedown", function(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        selected = d;
        if (video) {
          video.remove();
        }
        updateCircles();
        showTooltip(d);
        // showVideo(d);
        saveLocation(d);
      })

  d3.select(window).on("mousedown", function () {
    if (selected) {
      hideVideo(selected);
      hideTooltip(selected);
    }
    selected = null;
    updateCircles();
  });

  window.onresize = handleResize;
  document.onkeydown = handleKeyboardEvents;

});
