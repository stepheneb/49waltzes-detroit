var testing = false;

var map,
    mapImage,

    svg,
    svgContainer,
    node,
    nodeEnter,
    circle,
    label,
    waltzLine,
    renderedWaltzes = [],
    tooltip,
    selected = null;

function updateWaltzes() {
  waltzLine
      .attr("stroke-width", fontSizeInPixels/6 + "px")
      .attr("opacity", function(waltz) { return waltz.opacity; })
      .attr("points", function(waltz) { return waltz.points });
}

function updateLocationCircles() {
  nodeEnter
    .attr("transform", function(loc) {
      return "translate(" + loc.x + "," + loc.y + ")";
    });

  circle
    .classed("selected", function(loc) {
      return selected && selected.location === loc;
    })
    .classed("waltz", function(loc) {
      return selected && selected.movement.waltz === waltzForLocation(loc);
    })
    .attr("r", circleRadius)
    .style("stroke-width", function(loc) {
      if (selected && selected.location === loc) {
        return circleStrokeWidth * 1.5;
      } else {
        return circleStrokeWidth;
      }
    })

  label
    .attr("transform","translate(0," + fontSizeInPixels/2 + ")")
    .classed("selected", function(loc) {
      return selected && selected.location === loc ? true : false
    });

  updateWaltzes();
}

function updateWaltzOpacity(loc) {
  var waltzNum = waltzForLocation(loc),
      waltzOpacity = 1,
      i;
  renderedWaltzes.unshift(waltzNum);
  if (renderedWaltzes.length > numberOfWaltzes) {
    renderedWaltzes.length = numberOfWaltzes;
  }
  for(i = 0; i < renderedWaltzes.length; i++) {
    waltzNum = renderedWaltzes[i];
    waltzes[waltzNum-1].opacity = waltzOpacity;
    waltzOpacity -= 1/numberOfWaltzes;
    if (waltzOpacity < 0) {
      waltzOpacity = 0;
    }
  }
  updateWaltzes();
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
    if (xpos + 8 + width > contentWidth ) {
      return contentWidth - width;
    } else if (xpos + 8 < 0) {
      return 0;
    } else {
      return xpos + 8;
    }
  }

  function tooltipPosTop(height) {
    if (ypos - 12 < 0) {
      return 0;
    } else if (ypos - 12 + height > contentHeight) {
      return contentHeight - height;
    } else {
      return ypos - 12;
    }
  }

  height = tooltip.node().offsetHeight;
  width = tooltip.node().offsetWidth;
  tooltip
      .style("left", tooltipPosLeft(width) + "px")
      .style("top", tooltipPosTop(height) + "px");
}

function showTooltip(loc) {
  var movement = movementForLocation(loc),
      htmlContent;

  if (testing) {
    htmlContent = movement.index + ": " + movement.waltz + movement.movement +
       "<br/>" + loc.address +
       "<br/>" + latLonFormatter(loc.latitude) + ", " + latLonFormatter(loc.longitude) +
       "<br/>" + pixelFormatter(loc.x) + ", " + pixelFormatter(loc.y)
  } else {
    htmlContent = movement.waltz + movement.movement + ": " + loc.address;
  }
  tooltip.html(htmlContent);
  resizeTooltip(loc);
  tooltip.transition()
     .duration(200)
     .style("opacity", 1.0)
     .style("background-color", "rgba(255,255,255, 0.4)");
}

function hideTooltip() {
  tooltip.transition()
     .duration(200)
     .style("opacity", 0)
     .style("background-color", "rgba(255,255,255, 0)");
}

function saveLocation(loc) {
  loc.testing = testing;
  loc.videoResolution = "960x540"
  localStorage.setItem("waltzLocation", JSON.stringify(loc));
  // how to read these data: loc = JSON.parse(localStorage.getItem("waltzLocation"))
}

function resetSelection() {
  var loc = waltzLocations[0];
  loc.movementIndex = 0;
  selected = {};
  selected.location = loc;
  selected.movement = waltzMovements[loc.movements[0]];
  return selected;
}

function randomSelection() {
  var mov = waltzMovements[Math.floor(Math.random() * waltzMovements.length)],
      loc = waltzLocations[mov.location];
  selected = {};
  selected.location = loc;
  selected.movement = mov;
  return selected;
}

function updateWaltz() {
  var loc = selected.location;
  updateLocationCircles();
  showTooltip(loc);
  updateWaltzOpacity(loc);
  saveLocation(loc);
  stepThroughMovementsForThisLocation(loc);
}

function incrementSelection() {
  var i, movement;
  if (!selected) {
    randomSelection();
  } else {
    i = waltzMovements.indexOf(selected.movement) + 1;
    if (i >= waltzMovements.length) {
      i = 0;
    }
    movement = waltzMovements[i];
    selected.movement = movement;
    selected.location = waltzLocations[movement.location];
    selected.location.movementIndex = selected.location.movements.indexOf(movement.index);
  }
  updateWaltz();
}

function decrementSelection() {
  var i, movement;
  if (!selected) {
    randomSelection();
  } else {
    i = waltzMovements.indexOf(selected.movement) - 1;
    if (i < 0) {
      i = waltzMovements.length - 1;
    }
    movement = waltzMovements[i];
    selected.movement = movement;
    selected.location = waltzLocations[movement.location];
    selected.location.movementIndex = selected.location.movements.indexOf(movement.index);
  }
  updateWaltz();
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
  // evt.ctrlKey
  // evt.shiftKey
  // evt.metaKey   Mac OS X command key and Windows key
  // evt.altKey    Mac OS X option key

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

      case 82:                    // "r"
      if (evt.ctrlKey) {          // control-r, random movement
        evt.preventDefault();
        randomSelection();
        updateWaltz();
      }
      break;

      case 84:                    // "t"
      if (evt.ctrlKey) {          // control-t, toggle testing flag
        evt.preventDefault();
        testing = !testing;
        showTooltip(selected.location);
        saveLocation(selected.location);
      }
      break;

      case 27:                   // ESC
      evt.preventDefault();
      if (selected) {
        hideTooltip();
        selected = null;
        updateLocationCircles();
      }
      break;
    }
  }
}

function resizeSVG() {
  svg.attr("width",  contentWidth)
     .attr("height", contentHeight);
}

function handleResize() {
  setup();
  resetWaltzPoints();
  resizeSVG();
  updateLocationCircles();
  if (selected) {
    resizeTooltip(selected.location);
  }
}

function findClosestLocation(clickPos) {
  var minDistance = contentMaxDist,
      x = clickPos[0],
      y = clickPos[1],
      index = 0,
      d;
  for (i = 0; i < waltzLocations.length; i++) {
    dx = waltzLocations[i].x - x;
    dy = waltzLocations[i].y - y;
    d = Math.sqrt(dx * dx + dy * dy);
    if (d < minDistance) {
      minDistance = d;
      index = i;
    }
  }
  return waltzLocations[index];
}

function setupVideoEventListener() {
  window.addEventListener("storage", function(e) {
    var videoEvent;
    console.log("handling storage event: main window");
    if (e && e.key === "waltzLocation") {
      videoEvent = JSON.parse(e.newValue).videoEvent;
      console.log("videoEvent: " + videoEvent);
      if (videoEvent == "ended") {
        incrementSelection();
      }
    }
  })
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  setupVideoEventListener();
  mapImage = document.getElementById('map-image');
  mapImage.addEventListener('load', function() {
    setup();
    resetWaltzPoints();
    setupFullScreenSupport();

    fullScreenLink = d3.select('body').append("div")
        .attr("class", "fullscreen")
        .style("z-index", 4)
        .on("click", function(loc) {
          if (!isFullscreen()) {
            requestFullscreenMethod.call(document.body);
          } else {
            document.cancelFullscreenMethod();
          }
        });

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

    waltzLine = svg.selectAll("polygon.waltz")
        .data(waltzes)
      .enter().append("polygon")
        .attr("class", "waltz")
        .attr("data-waltz", function(waltz) { return waltz.waltz; })
        .attr("stroke","#28c")
        .attr("opacity", function(waltz) { return waltz.opacity; })
        .attr("stroke-width", fontSizeInPixels/6 + "px")
        .attr("points", function(waltz) { return waltz.points });

    node = svg.selectAll("g")
        .data(waltzLocations);

    nodeEnter = node.enter().append("g")
        .attr("transform", function(loc) {
          return "translate(" + loc.x + "," + loc.y + ")";
        });

    circle = nodeEnter
        .append("circle")
            .attr("class", "location")
            .attr("data-address", function(loc) { return loc.address; })
            .attr("r", circleRadius)
            .style("stroke-width", circleStrokeWidth)
            .style("z-index", 2)
            .on("mouseover", function(loc) {
            })
            .on("mouseout", function(loc) {
            })
            .on("mousedown", function(loc) {
            })

    label = nodeEnter
        .append("text")
          .attr("class", "location")
          .attr("transform","translate(0," + fontSizeInPixels/2 + ")")
          .style("text-anchor","middle")
          .text(function(loc) {
              var mov = movementForLocation(loc);
              return mov.interview ? "i": "";
            })

    svg.on("mousedown", function (e) {
      var clickPos = d3.mouse(this),
          loc = findClosestLocation(clickPos);
      hideTooltip();
      if (loc !== selected) {
        selected = {};
        selected.location = loc;
        selected.movement = movementForLocation(loc);
        console.log(loc);
        updateWaltz();
      }
    });

    window.onresize = handleResize;
    addFullScreenChangeListener(handleResize);
    document.onkeydown = handleKeyboardEvents;
  })
});
