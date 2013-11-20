
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
    circle,
    tooltip,
    videoContainer,
    video,
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

function setup() {
  mapWidth = mapImage.clientWidth;
  mapHeight = mapImage.clientHeight;

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

  updateActualPositions();
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

function handleResize() {
  setup();
  svg.attr("width",  mapWidth)
     .attr("height", mapHeight);

  updateCircles();

  videoContainer
      .style("left", mapWidth/3*2 - 24 + "px")
      .style("width", mapWidth/3 + "px")
      .style("top", mapHeight - (mapWidth/3)/1.777 - 12 + "px")
      .style("height", (mapWidth/3 - 12)/1.777 + "px");
}

function generateVideoKeyStr(location) {
  var istr = waltzFormatter(location.index)
  return istr + "-" + location.waltz + location.movement
}

// localStorage["locationVideo"] = "mp4-480x270-500k/001-1A-480x270-500k.mp4"


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

function showTooltip(d) {
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
    if (d3.event) {
      return d3.event.pageX + 8;
    } else {
      if (xpos + 8 + width > mapWidth ) {
        return mapWidth - width;
      } else if (xpos + 8 < 0) {
        return 0;
      } else {
        return xpos + 8;
      }
    }
  }

  function tooltipPosTop(height) {
    if (d3.event) {
      return d3.event.pageY - 28;
    } else {
      if (ypos - 28 < 0) {
        return 0;
      } else if (ypos - 28 + height > mapHeight) {
        return mapHeight - height;
      } else {
        return ypos - 28;
      }
    }
  }

  tooltip.transition()
     .duration(200)
     .style("opacity", .9);
  html = tooltip.html(d.index + ": " + d.waltz + d.movement +
         "<br/>" + d.address +
         "<br/>" + latLonFormatter(d.latitude) + ", " + latLonFormatter(d.longitude) +
         "<br/>" + pixelFormatter(d.x) + ", " + pixelFormatter(d.y));
  height = html.node().clientHeight;
  width = html.node().clientWidth;
  html
     .style("left", tooltipPosLeft(width) + "px")
     .style("top", tooltipPosTop(height) + "px");
}

function hideTooltip(d) {
  tooltip.transition()
     .duration(500)
     .style("opacity", 0)
}

// oldCircle = d3.select('circle[data-index="' + selected.index + '"]');
// newCircle = d3.select('circle[data-index="' + newIndex + '"]');

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
      }
      updateCircles();
      showTooltip(selected);
      showVideo(selected);
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
      showVideo(selected);
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

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  mapImage = document.getElementById('map-image');
  setup();
  tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("z-index", 3);

  videoContainer = d3.select("body")
      .append("div")
      .attr("class", "videoContainer")
      .style("opacity", 0)
      .style("left", mapWidth/3*2 - 24 + "px")
      .style("width", mapWidth/3 + "px")
      .style("top", mapHeight - (mapWidth/3)/1.777 - 12 + "px")
      .style("height", (mapWidth/3 - 12)/1.777 + "px")
      .style("z-index", 1);

  svg = mapContainer.append("svg")
      .attr("width",  mapWidth)
      .attr("height", mapHeight)
      .attr("class", "map-svg")
      .style("z-index", 2);

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
        showVideo(d);
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
