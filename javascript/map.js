var map,
    mapImage,
    svg,
    svgContainer,
    node,
    nodeEnter,
    circle,
    label,
    waltzLine,
    waltzLineData = [],
    renderedWaltzes = [],
    visitedWaltzLine,
    visitedWaltzData = [],
    tooltip,
    selected = null,
    renderedPointsKey = {
      "A": 0,
      "B": 1,
      "C": 2
    },
    nextMovLetterKey = {
      "A": "B",
      "B": "C",
      "C": "A"
    };

function renderWaltzLines() {
  visitedWaltzLine = svg.selectAll("polygon.currentWaltz")
      .data(visitedWaltzData, function (d) {
        return d.waltzNum; });

  visitedWaltzLine.enter().append("polygon")
      .attr("class", "currentWaltz")
      .attr("stroke-linejoin", "round");

  visitedWaltzLine
      .attr("stroke", "#888")
      .attr("stroke-width", function(waltz) { return waltz.width/2; })
      .attr("opacity", 0.5)
      .attr("points", function(waltz) { return waltz.points; });

  visitedWaltzLine.exit()
    .remove();

  waltzLine = svg.selectAll("polygon.waltz")
      .data(waltzes, function (d) {
        return d.waltzNum; });

  waltzLine.enter().append("polygon")
      .attr("class", "waltz")
      .attr("stroke-linejoin", "round");

  waltzLine
      .attr("stroke", function(waltz) { return waltz.color; })
      .attr("stroke-width", function(waltz) { return waltz.width; })
      .attr("opacity", function(waltz) {
        return waltz.opacity; })
      .attr("points", function(waltz) { return waltz.renderedPoints; });

  waltzLine.exit()
    .remove();
}

function resizeWaltzData() {
  var i,
      j;
  waltzes.forEach(function (waltz) {
    var waltzNum = waltz.waltzNum;
    waltz.points =
      locationsForWaltz(waltzNum)
        .map(function (loc) { return [loc.x, loc.y]; });
  });
  for (i = 0; i < visitedWaltzData.length; i++) {
    vistedWaltz = visitedWaltzData[i];
    vistedWaltz.points = waltzes[vistedWaltz.waltzNum-1].points;
  }
  for (i = 0; i < renderedWaltzes.length; i++) {
    renderedWaltz = waltzes[renderedWaltzes[i]-1];
    renderedWaltz.renderedPoints = [];
    for (j = 0; j < renderedWaltz.movementsPlayed.length; j++) {
      movLetter = renderedWaltz.movementsPlayed[j];
      renderedWaltz.renderedPoints.push(renderedWaltz.points[renderedPointsKey[movLetter]]);
    }
    renderedWaltz.renderedPoints = flattenArray(renderedWaltz.renderedPoints);
  }
}

function updateRestOfRenderedWaltzes() {
  var waltz,
      color = "#227",
      opacity = 0.8,
      width = fontSizeInPixels/5,
      i;
  for (i = 1; i < renderedWaltzes.length; i++) {
    waltz = waltzes[renderedWaltzes[i]-1];
    waltz.color = color;
    waltz.opacity = opacity;
    waltz.width -= fontSizeInPixels/100;
    opacity -= 0.04;
    if (opacity <= 0) {
      for (; i < renderedWaltzes.length; i++) {
        waltz.renderedPoints = [];
      }
      visitedWaltzData.length = i;
      return;
    }
  }
}

function resetCurrentWaltz(waltzNum, movLetter) {
  currentWaltz = waltzes[waltzNum-1];
  renderedWaltzes.unshift(waltzNum);
  currentWaltz.color = "#31f";
  currentWaltz.opacity = 1;
  currentWaltz.width = fontSizeInPixels/3;
  currentWaltz.interviewsPlayed.length = 0;
  currentWaltz.movementsPlayed.length = 0;
  currentWaltz.movementsPlayed.push(movLetter);
  currentWaltz.renderedPoints = flattenArray(currentWaltz.points[renderedPointsKey[movLetter]].slice(0));
  updateRestOfRenderedWaltzes();
}

function movementNotYetPlayed(waltz, movLetter) {
  return waltz.movementsPlayed.indexOf(movLetter) === -1;
}

function updateWaltzData(waltzNum, movLetter) {
  currentWaltz = waltzes[waltzNum-1];
  if (movementNotYetPlayed(currentWaltz, movLetter)) {
    currentWaltz.movementsPlayed.push(movLetter);
    currentWaltz.renderedPoints.push(currentWaltz.points[renderedPointsKey[movLetter]].slice(0));
  }
  currentWaltz.renderedPoints = flattenArray(currentWaltz.renderedPoints);
  updateRestOfRenderedWaltzes();
}

function pulseSelectedLocationCircle() {
  setInterval(function(){
    var selectedCircle = d3.select("circle.selected.waltz.location");
    selectedCircle
        .transition()
        .duration(500)
        .style("fill-opacity", 1.0)
        .transition()
        .duration(500)
        .style("fill-opacity", 0.2);
  },1000);
}

function renderLocationCircles() {
  nodeEnter
    .attr("transform", function(loc) {
      return "translate(" + loc.x + "," + loc.y + ")";
    });

  circle
    .classed("selected", function(loc) {
      return selected && selected.location === loc;
    })
    .classed("waltz", function(loc) {
      return selected && selected.movement.waltz === waltzNumForLocation(loc);
    })
    .attr("r", circleRadius)
    .style("stroke-width", function(loc) {
      if (selected && selected.location === loc) {
        return circleStrokeWidth * 1.5;
      } else {
        return circleStrokeWidth;
      }
    });

  label
    .attr("transform","translate(0," + fontSizeInPixels/2 + ")")
    .classed("selected", function(loc) {
      return selected && selected.location === loc ? true : false;
    });
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
  var mov = movementForLocation(loc),
      htmlContent = loc.address;

  if (testing) {
    htmlContent = generateWaltzKeyForMovement(mov) + " (" + mov.index + "): " + loc.address;
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

function resetSelection() {
  var loc = waltzLocations[0];
  loc.movementIndex = 0;
  lastWaltzNum = 0;
  selected = {};
  selected.location = loc;
  selected.movement = waltzMovements[loc.movements[0]];
  renderedWaltzes = [];
  resetCurrentWaltz(1, "A");
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
  updateWaltz("playVideo", { type: "movement" });
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
  updateWaltz("playVideo", { type: "movement" });
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
  var newIndex,
      loc;

  function handled(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  }

  // evt.ctrlKey
  // evt.shiftKey
  // evt.metaKey   Mac OS X command key and Windows key
  // evt.altKey    Mac OS X option key

  evt = (evt) ? evt : ((window.event) ? event : null);
  if (evt) {
    switch (evt.keyCode) {
      case 37:                    // left arrow
      decrementSelection();
      console.log("map: left-arrow");
      return handled(evt);

      case 38:                    // up arrow
      break;

      case 39:                    // right arrow
      if (!selected) {
        resetSelection();
        updateWaltz("playVideo", { type: "movement" });
        lastWaltzNum = 1;
      } else {
        nextMovement();
      }
      console.log("map: right-arrow");
      return handled(evt);

      case 40:                    // down arrow
      break;

      case 49:                    // "1"
      if (evt.altKey) {          // alt or option--1, video-resolution: 480x270
        if (!selected) resetSelection();
        videoResolution = "480x270";
        updateWaltz("playVideo", { type: "movement" });
        return handled(evt);
      }
      break;

      case 50:                    // "2"
      if (evt.altKey) {          // alt or option--2, video-resolution: 960x540
        if (!selected) resetSelection();
        videoResolution = "960x540";
        updateWaltz("playVideo", { type: "movement" });
        return handled(evt);
      }
      break;

      case 51:                    // "3"
      if (evt.altKey) {          // alt or option--1, video-resolution: 1920x1080
        if (!selected) resetSelection();
        videoResolution = "1920x1080";
        updateWaltz("playVideo", { type: "movement" });
        return handled(evt);
      }
      break;

      case 82:                    // "r"
      if (evt.altKey) {          // alt or option--r, new random movement
        randomSelection();
        updateWaltz("playVideo", { type: "movement" });
        return handled(evt);
      }
      break;

      case 84:                    // "t"
      if (evt.altKey) {          // alt or option-t, toggle testing flag
        testing = !testing;
        if (!selected) {
          resetSelection();
          updateWaltz("playVideo", { type: "movement" });
        }
        showTooltip(selected.location);
        saveWaltzLocation(selected.location, "testing");
        return handled(evt);
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
  resizeWaltzData();
  resizeSVG();
  renderLocationCircles();
  renderWaltzLines();
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

function updateWaltz(eventType, eventData) {
  var loc = selected.location;
  if (visitedWaltzData.length === 0) {
    visitedWaltzData.unshift(currentWaltz);
  } else if (visitedWaltzData[0].waltzNum !== currentWaltz.waltzNum) {
    visitedWaltzData.unshift(currentWaltz);
  }
  renderLocationCircles();
  renderWaltzLines();
  showTooltip(loc);
  saveWaltzLocation(loc, eventType, eventData);
  if (lastWaltzNum === 0) lastWaltzNum = 1;
  console.log("map: updateWaltz: eventType: " + eventType + ", eventData: " + eventData);
  console.log("map: " + generateLocationString(loc));
}

function preloadMovement() {
  var mov,
      nextMov,
      waltzNum,
      movLetter,
      movementsPlayed,
      interviewsPlayed,
      numOfVideos,
      kindOfVideo,
      nextSelection = cloneObject(selected),
      i;

  mov = movementForLocation(nextSelection.location);
  waltzNum = mov.waltz;
  movLetter = mov.movement;
  currentWaltz = waltzes[mov.waltz-1];
  numOfVideos = currentWaltz.numOfVideos;
  movementsPlayed = currentWaltz.movementsPlayed;
  interviewsPlayed = currentWaltz.interviewsPlayed;

  if (mov.interview && interviewsPlayed.indexOf(movLetter) === -1) {
    kindOfVideo = "interview";
  } else if (movementsPlayed.length < 3) {
    kindOfVideo = "movement";
    movLetter = nextMovLetterKey[movLetter];
  } else {
    kindOfVideo = "movement";
    waltzNum++;
    if (waltzNum > numberOfWaltzes) {
      waltzNum = 1;
    }
    movLetter = "A";
  }
  nextMov = movementForWaltz(waltzNum, movLetter);
  nextSelection.movement = nextMov;
  nextSelection.location = waltzLocations[mov.location];
  nextSelection.location.movementIndex = nextSelection.location.movements.indexOf(mov.index);
  saveWaltzLocation(nextSelection.location, "preloadVideo", { type: kindOfVideo, nextSelection: cloneObject(nextSelection) });
}

function nextUnplayedMovementForWaltz(waltz) {
  var movLetter,
      movementsPlayed = currentWaltz.movementsPlayed,
      possibleMovementLetters = ["A", "B", "C"];
  switch (movementsPlayed.length) {
  case 0:
    return movementForWaltz(waltz.waltzNum, "A");

  case 1:
    movLetter = waltz.movementsPlayed[0];
    return movementForWaltz(waltz.waltzNum, nextMovLetterKey[movLetter]);

  case 2:
    movementsPlayed.forEach(function(m) {
       possibleMovementLetters.splice(possibleMovementLetters.indexOf(m), 1);
    });
    movLetter = possibleMovementLetters[0];
    return movementForWaltz(waltz.waltzNum, movLetter);
  }
}

function nextMovement() {
  var loc,
      mov,
      waltzNum,
      movLetter,
      movementsPlayed,
      interviewsPlayed,
      numOfVideos,
      kindOfVideo,
      i;

  if (!selected) {
    resetSelection();
    loc = selected.location;
    updateWaltz("movement");
  } else {
    loc = selected.location;
    mov = movementForLocation(loc);
    movLetter = mov.movement;
    currentWaltz = waltzes[mov.waltz-1];
    numOfVideos = currentWaltz.numOfVideos;
    movementsPlayed = currentWaltz.movementsPlayed;
    interviewsPlayed = currentWaltz.interviewsPlayed;

    if (mov.interview && interviewsPlayed.indexOf(movLetter) === -1) {
      kindOfVideo = "interview";
      interviewsPlayed.push(movLetter);
    } else if (movementsPlayed.length < 3) {
      kindOfVideo = "movement";
      mov = nextUnplayedMovementForWaltz(currentWaltz);
      movLetter = mov.movement;
      updateWaltzData(mov.waltz, movLetter);
    } else {
      stepThroughMovementsForThisLocation(loc);
      waltzNum = mov.waltz + 1;
      if (waltzNum > numberOfWaltzes) {
        waltzNum = 1;
      }
      movLetter = "A";
      resetCurrentWaltz(waltzNum, movLetter);
      mov = movementForWaltz(waltzNum, movLetter);
      updateWaltzData(mov.waltz, movLetter);
      kindOfVideo = "movement";
    }
    selected.movement = mov;
    selected.location = waltzLocations[mov.location];
    selected.location.movementIndex = selected.location.movements.indexOf(mov.index);
    updateWaltz("playVideo", { type: kindOfVideo, letter: movLetter });
    lastWaltzNum = mov.waltz;
  }
}

function setupStorageEventListener() {
  window.addEventListener("storage", function(e) {
    var movement, stillImageDatum;
    console.log("map: storage event: ");
    if (e && e.key === "waltzLocation") {
      waltzLocation = JSON.parse(e.newValue);
      switch (waltzLocation.eventType) {
      case "testing":
        testing = waltzLocation.testing;
        showTooltip(selected.location);
        console.log("map: test mode: " + waltzLocation.testing);
        break;

      case "videoEvent":
        console.log("map: videoEvent: " + waltzLocation.videoEvent);
        switch (waltzLocation.videoEvent) {
        case "preload":
          preloadMovement();
          break;
        case "ended":
          nextMovement();
          break;
        }
      }
    }
  });
}

function finishStartup() {
  setup();
  resizeWaltzData();
  setupFullScreenSupport();

  fullScreenLink = d3.select('body').append("div")
      .attr("class", "fullscreen")
      .style("z-index", 4)
      .on("click", function(loc) {
        if (!isFullscreen()) {
          requestFullscreenMethod.call(document.body);
        } else {
          if (testing) {
            document.cancelFullscreenMethod();
          }
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
          });

  label = nodeEnter
      .append("text")
        .attr("class", "location")
        .attr("transform","translate(0," + fontSizeInPixels/2 + ")")
        .style("text-anchor","middle")
        .text(function(loc) {
            var mov = movementForLocation(loc);
            return mov.interview ? "i": "";
          });

  pulseSelectedLocationCircle();

  svg.on("mousedown", function (e) {
    var clickPos = d3.mouse(this),
        newLoc = findClosestLocation(clickPos),
        currentMov,
        newMov,
        waltzNum,
        movLetter,
        eventType,
        i;

    hideTooltip();
    console.log("map: mousedown: " + clickPos);
    if (newLoc !== selected) {
      if (selected) {
        currentMov = movementForLocation(selected.location);
      }
      newMov = movementForLocation(newLoc);
      if (currentMov && newMov.waltz !== currentMov.waltz) {
        //  selecting movement *not* in current waltz
        stepThroughMovementsForThisLocation(selected.location);
        movLetter = newMov.movement;
        waltzNum = newMov.waltz;
        resetCurrentWaltz(waltzNum, movLetter);

        selected = {};
        selected.movement = newMov;
        selected.location = waltzLocations[newMov.location];
        selected.location.movementIndex = selected.location.movements.indexOf(newMov.index);
        updateWaltz("playVideo", { type: "movement", letter: movLetter });
        lastWaltzNum = newMov.waltz;
      } else {
        // selecting movement in current waltz
        movLetter = newMov.movement;
        currentWaltz = waltzes[newMov.waltz-1];
        updateWaltzData(newMov.waltz, movLetter);
        selected.movement = newMov;
        selected.location = newLoc;
        selected.location.movementIndex = selected.location.movements.indexOf(newMov.index);
        updateWaltz("playVideo", { type: "movement", letter: movLetter });
      }
    }
  });

  window.onresize = handleResize;
  addFullScreenChangeListener(handleResize);
  document.onkeydown = handleKeyboardEvents;
}

window.addEventListener("load", function(event) {
  console.log("DOM fully loaded and parsed, stylesheets and images loaded");
  setupStorageEventListener();
  mapImage = document.getElementById('map-image');
  if (mapImage.complete) {
    finishStartup();
  } else {
    mapImage.addEventListener('load', finishStartup);
  }
});
