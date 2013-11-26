
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

    selected = null,

    locations,
    movements,

    waltzFormatter = d3.format("03d"),
    pixelFormatter = d3.format("f"),
    latLonFormatter = d3.format(".3f");

function updateCircles() {
  circle
    .classed("selected", function(loc) { return selected && selected.location === loc ? true : false })
    .attr("cx", function(loc) { return loc.x })
    .attr("cy", function(loc) { return loc.y })
    .attr("r", circleRadius)
    .style("stroke-width", function(loc) {
      if (selected && selected.location === loc) {
        return circleStrokeWidth * 1.5;
      } else {
        return circleStrokeWidth;
      }
    })
}

function findMovementByIndex(index) {
  return movements.filter(function(obj) {
      // coerce both obj.index and index to numbers for val & type comparison
      return +obj.index === +index;
  })[ 0 ];
}

function getMovementFromLocation(loc) {
  var index = loc.movements[loc.movementIndex];
  return findMovementByIndex(index);
}

function resizeTooltip(loc) {
  var cnode = d3.select('circle[data-address="' + loc.address + '"]').node(),
      cx = +cnode.getAttribute('cx'),
      cy = +cnode.getAttribute('cy'),
      ctm = cnode.getCTM(),
      xpos = ctm.e + cx*ctm.a,
      ypos = ctm.f + cy*ctm.d,
      html,
      height,
      width;

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

function showTooltip(loc) {
  var movement = getMovementFromLocation(loc);
  tooltip.html(movement.index + ": " + movement.waltz + movement.movement +
         "<br/>" + loc.address +
         "<br/>" + latLonFormatter(loc.latitude) + ", " + latLonFormatter(loc.longitude) +
         "<br/>" + pixelFormatter(loc.x) + ", " + pixelFormatter(loc.y));
  resizeTooltip(loc);
  tooltip.transition()
     .duration(200)
     .style("opacity", .9);
}

function hideTooltip() {
  tooltip.transition()
     .duration(200)
     .style("opacity", 0)
}

function saveLocation(loc) {
  loc.testing = true;
  localStorage.setItem("waltzLocation", JSON.stringify(loc));
  // how to read these data: loc = JSON.parse(localStorage.getItem("waltzLocation"))
}

function resetSelection() {
  var loc = locations[0];
  loc.movementIndex = 0;
  selected = {};
  selected.location = loc;
  selected.movement = movements[loc.movements[0]];
  return selected;
}

function incrementSelection() {
  var i, movement;
  if (!selected) {
    resetSelection();
  } else {
    i = movements.indexOf(selected.movement) + 1;
    if (i >= movements.length) {
      i = 0;
    }
    movement = movements[i];
    selected.movement = movement;
    selected.location = locations[movement.location];
    selected.location.movementIndex = selected.location.movements.indexOf(movement.index);
  }
  updateCircles();
  showTooltip(selected.location);
  saveLocation(selected.location);
}

function decrementSelection() {
  var i, movement;
  if (!selected) {
    resetSelection();
  } else {
    i = movements.indexOf(selected.movement) - 1;
    if (i < 0) {
      i = movements.length - 1;
    }
    movement = movements[i];
    selected.movement = movement;
    selected.location = locations[movement.location];
    selected.location.movementIndex = selected.location.movements.indexOf(movement.index);
  }
  updateCircles();
  showTooltip(selected.location);
  saveLocation(selected.location);
}

function stepThroughMovementsForThisLocation(loc) {
  if (loc.movements.length > 1) {
    loc.movementIndex++;
    if (loc.movementIndex >= loc.movements.length) {
      loc.movementIndex = 0;
    }
  }
}

function handleKeyboardEvents(evt) {
  var newIndex, loc;
  evt = (evt) ? evt : ((window.event) ? event : null);
  if (evt) {
    switch (evt.keyCode) {
      case 37:                    // left arrow
      decrementSelection();
      evt.preventDefault();
      break;

      case 38:                    // up arrow
      evt.preventDefault();
      break;

      case 39:                    // right arrow
      incrementSelection();
      evt.preventDefault();
      break;

      case 40:                    // down arrow
      evt.preventDefault();
      break;

      case 27:                   // ESC
      evt.preventDefault();
      if (selected) {
        hideTooltip();
        selected = null;
        updateCircles();
      }
      break;
    }
  }
}

function resizeDocumentFont() {
  document.body.style.fontSize = mapWidth/960 * 12 + 'px';
}

function initializeLocations() {
  locations = locationAndMovementData.locations;
  locations.forEach(function (loc) {
    var xPixel = xScale.invert(loc.longitude),
        yPixel = yScale.invert(loc.latitude);

    loc.x = xPixel*mapScaleFactorX;
    loc.y = yPixel*mapScaleFactorY;
    loc.movementIndex = 0;
  });
}

function initializeMovements() {
  movements = locationAndMovementData.movements;
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

  resizeDocumentFont();

  initializeMovements();
  initializeLocations();
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
    resizeTooltip(selected.location);
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  localStorage.setItem("videoPath", "");
  mapImage = document.getElementById('map-image');
  mapImage.addEventListener('load', function() {
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
      .data(locations, function (loc) {
        console.log(loc.address);
        return getMovementFromLocation(loc).index; });

    circle.enter().append("circle")
        .attr("class", "location")
        .attr("cx", function(loc) {
          return loc.x; })
        .attr("cy", function(loc) { return loc.y; })
        .attr("data-address", function(loc) { return loc.address; })
        .attr("r", circleRadius)
        .style("stroke-width", circleStrokeWidth)
        .style("z-index", 2)
        .on("mouseover", function(loc) {
          if (!selected) {
            showTooltip(loc);
            saveLocation(loc);
            stepThroughMovementsForThisLocation(loc);
          }
        })
        .on("mouseout", function(loc) {
          if (!selected) {
            hideTooltip();
          }
        })
        .on("mousedown", function(loc) {
          d3.event.preventDefault();
          d3.event.stopPropagation();
          selected = {};
          selected.location = loc;
          selected.movement = getMovementFromLocation(loc);
          updateCircles();
          showTooltip(loc);
          saveLocation(loc);
          stepThroughMovementsForThisLocation(loc);
        })

    d3.select(window).on("mousedown", function () {
      if (selected) {
        hideTooltip();
      }
      selected = null;
      updateCircles();
    });

    window.onresize = handleResize;
    document.onkeydown = handleKeyboardEvents;
  })
});
