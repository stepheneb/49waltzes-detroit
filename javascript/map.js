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
  var ghostFactor = fontSizeInPixels/4;
  visitedWaltzLine = svg.selectAll("polygon.visited")
      .data(waltzes, function (d) { return d.waltzNum; });

  visitedWaltzLine.enter().append("polygon")
      .attr("class", "visited")
      .attr("stroke", "#555")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

  visitedWaltzLine
      .attr("opacity", function(waltz) { return waltz.opacity*0.6; })
      .attr("stroke-width", ghostFactor + "px")
      .attr("stroke-dasharray", ghostFactor/5 + "," + ghostFactor*1.5)
      .attr("points", function(waltz) { return waltz.rendered ? waltz.points : []; });

  visitedWaltzLine.exit()
    .remove();

  waltzLine = svg.selectAll("polygon.waltz")
      .data(waltzes, function (d) { return d.waltzNum; });

  waltzLine.enter().append("polygon")
      .attr("class", "waltz")
      .attr("stroke-linejoin", "round");

  waltzLine
      .attr("stroke", function(waltz) { return waltz.color; })
      .attr("stroke-width", function(waltz) { return waltz.width + "px"; })
      .attr("opacity", function(waltz) { return waltz.opacity; })
      .attr("points", function(waltz) { return waltz.renderedPoints; });

  waltzLine.exit()
    .remove();
}

function resizeWaltzData() {
  var i,
      j;
  waltzes.forEach(function (waltz) {
    var waltzNum = waltz.waltzNum;
    resetLocationMovementIndiciesForWaltz(waltzNum);
    waltz.points =
      locationsForWaltz(waltzNum)
        .map(function (loc) { return [loc.x, loc.y]; });
  });
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

function updateRestOfRenderedWaltzes(selectedWaltzNum) {
  var waltz,
      color = "#128",
      opacity = 0.7,
      width = fontSizeInPixels/5,
      maxQueueLength,
      i;
  if (renderedWaltzes.length > 1) {
    if (renderedWaltzes.slice(1).indexOf(selectedWaltzNum) !== -1) {
      renderedWaltzes.splice(renderedWaltzes.slice(1).indexOf(selectedWaltzNum)+1,1);
    }
  }
  for (i = 1; i < renderedWaltzes.length; i++) {
    waltz = waltzes[renderedWaltzes[i]-1];
    waltz.color = color;
    waltz.opacity = opacity;
    waltz.width = width;
    width *= 0.95;
    opacity -= 0.08;
    if (opacity <= 0) {
      renderedWaltzes.pop();
      waltz.opacity = 0;
      waltz.rendered = false;
      maxQueueLength = i;
      waltz.renderedPoints = [];
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
  currentWaltz.renderedPoints = [];
  updateRestOfRenderedWaltzes(waltzNum);
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
  updateRestOfRenderedWaltzes(waltzNum);
}

function pulseSelectedLocationCircle() {
  setInterval(function(){
    var selectedCircle = d3.select("circle.selected.waltz.location");
    selectedCircle
        .transition()
        .duration(500)
        .style("fill-opacity", 0.6)
        .style("fill", "#ff8000")
        .style("stroke-width", circleStrokeWidth*1.1)
        .attr("r", circleRadius*0.9)
        .transition()
        .duration(500)
        .style("fill-opacity", 0.3)
        .style("fill", "#80ffff")
        .style("stroke-width", circleStrokeWidth)
        .attr("r", circleRadius*1.0);
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
      return selected && locationIsPartOfWaltz(loc, selected.movement.waltz);
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
    })
    .classed("waltz", function(loc) {
      return selected && locationIsPartOfWaltz(loc, selected.movement.waltz);
    })
    .text(function(loc) {
      var mov = movementForLocation(loc);
      return mov.interview ? "i": "";
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
      htmlContent = generateWaltzKeyForMovement(mov) + ": " + loc.address;

  tooltip.html(htmlContent);
  if (testing) {
    tooltip.append("div")
      .attr("class", "details")
      .html("mov: " + mov.index + " loc: " + loc.index +
            "<br/> pixel: " + pixelFormatter(loc.x) + ", " + pixelFormatter(loc.y));
  }
  resizeTooltip(loc);
  tooltip.transition()
     .duration(200)
     .style("opacity", 0.7)
     .style("background-color", "rgba(255,255,255, 0)");
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

function stepThroughMovementsForThisLocation2(loc) {
  if (loc.movements.length > 1 && loc.savedMovementIndex === loc.movementIndex) {
    stepThroughMovementsForThisLocation(loc);
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
        updateWaltzData(1, "A");
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
      if (evt.altKey) {           // alt or option--1, video-resolution: 1920x1080
        if (!selected) resetSelection();
        videoResolution = "1920x1080";
        updateWaltz("playVideo", { type: "movement" });
        return handled(evt);
      }
      break;

      case 82:                    // "r"
      if (evt.altKey) {           // alt or option--r, new random movement
        randomSelection();
        updateWaltz("playVideo", { type: "movement" });
        return handled(evt);
      }
      break;

      case 84:                    // "t"
      if (evt.altKey) {           // alt or option-t, toggle testing flag
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
  resizeSVG();
  resizeWaltzData();
  updateRestOfRenderedWaltzes();
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
  currentWaltz.rendered = true;
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
      enteringWaltz,
      enteringMovLetter,
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
    // stepThroughMovementsForThisLocation2(loc);
    // if (newLoc.savedMovementIndex !== newLoc.movementIndex;)
    mov = movementForLocation(loc);
    previousMov = mov;
    movLetter = mov.movement;
    enteringMovLetter = movLetter;
    currentWaltz = waltzForMovement(mov);
    enteringWaltz = currentWaltz;
    numOfVideos = currentWaltz.numOfVideos;
    movementsPlayed = currentWaltz.movementsPlayed;
    interviewsPlayed = currentWaltz.interviewsPlayed;

    if (mov.interview && interviewNotPlayed(currentWaltz, movLetter)) {
      kindOfVideo = "interview";
      interviewsPlayed.push(movLetter);
    } else if (movementsPlayed.length < 3) {
      kindOfVideo = "movement";
      resetLocationMovementIndiciesForWaltz(currentWaltz.waltzNum);
      mov = nextUnplayedMovementForWaltz(currentWaltz);
      movLetter = mov.movement;
      updateWaltzData(mov.waltz, movLetter);
    } else {
      waltzNum = mov.waltz + 1;
      if (waltzNum > numberOfWaltzes) {
        waltzNum = 1;
      }
      movLetter = "A";
      resetCurrentWaltz(waltzNum, movLetter);
      resetLocationMovementIndiciesForWaltz(waltzNum);
      // stepThroughMovementsForThisLocation(loc);
      mov = movementForWaltz(waltzNum, movLetter);
      updateWaltzData(mov.waltz, movLetter);
      kindOfVideo = "movement";
    }
    selected.movement = mov;
    selected.location = waltzLocations[mov.location];
    updateWaltz("playVideo", { type: kindOfVideo, letter: movLetter });
    if (currentWaltz === enteringWaltz && kindOfVideo === "movement") {
      markInterviewNotPlayed(currentWaltz, enteringMovLetter);
    }
    if (currentWaltz !== enteringWaltz) {
      markInterviewNotPlayed(enteringWaltz, enteringMovLetter);
    }
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

function inSameMovement(previousMov, newMov) {
  return newMov.index === previousMov.index;
}

function inSameWaltz(previousMov, newMov) {
  return previousMov.waltz === newMov.waltz;
}

function interviewNotPlayed(waltz, movLetter) {
  return waltz.interviewsPlayed.indexOf(movLetter) === -1;
}

function markInterviewNotPlayed(waltz, movLetter) {
  var interviewIndex = waltz.interviewsPlayed.indexOf(movLetter);
  if (interviewIndex !== -1) {
    waltz.interviewsPlayed.splice(interviewIndex, 1);
  }
}

function setupWaltzForThisLocation(loc) {
  var waltzList,
      waltzNum = loc.previousWaltzNum;
  if (loc.movements.length > 1) {
    waltzList = waltzesForLocation(loc);
    index = waltzList.indexOf(loc.previousWaltzNum);
    if (index !== -1) {
      index++;
      if (index >= loc.movements.length) {
        index = 0;
      }
      waltzNum = waltzList[index];
    }
  }
  resetLocationMovementIndiciesForWaltz(waltzNum);
  return waltzNum;
}

function finishStartup() {
  setup();
  resizeWaltzData();
  resetLocationMovementIndicies();
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
        .style("text-anchor","middle");

  pulseSelectedLocationCircle();

  svg.on("mousedown", function (e) {
    var clickPos = d3.mouse(this),
        newLoc = findClosestLocation(clickPos),
        newMov,
        previousMov,
        previousWaltz,
        previousWaltzNum,
        waltzNum,
        movLetter,
        eventType,
        i;

    hideTooltip();
    console.log("map: mousedown: " + clickPos);
    if (newLoc !== selected) {
      if (selected) {
        previousMov = movementForLocation(selected.location);
        previousWaltz = waltzForMovement(previousMov);
        previousWaltzNum = previousWaltz.waltzNum;
        setupWaltzForThisLocation(newLoc);
        newMov = movementForLocation(newLoc);
        waltzNum = newMov.waltz;
        if (!inSameWaltz(previousMov, newMov)) {
          //  selecting movement at new location and waltz -- *not* in current waltz
          newLoc.previousWaltzNum = waltzNum;
          movLetter = newMov.movement;
          waltzNum = newMov.waltz;
          resetCurrentWaltz(waltzNum, movLetter);
          updateWaltzData(newMov.waltz, movLetter);
          selected.movement = newMov;
          selected.location = waltzLocations[newMov.location];
          updateWaltz("playVideo", { type: "movement", letter: movLetter });
          lastWaltzNum = newMov.waltz;
        } else {
          // selecting movement in current waltz
          movLetter = newMov.movement;
          currentWaltz = waltzes[newMov.waltz-1];
          if (renderedWaltzes.length === 0) {
            resetCurrentWaltz(newMov.waltz, movLetter);
          }
          if (inSameMovement(previousMov, newMov)) {
            if (newMov.interview && interviewNotPlayed(currentWaltz, movLetter)) {
              kindOfVideo = "interview";
              currentWaltz.interviewsPlayed.push(movLetter);
              updateWaltzData(newMov.waltz, movLetter);
            } else {
              kindOfVideo = "movement";
              updateWaltzData(newMov.waltz, movLetter);
              markInterviewNotPlayed(currentWaltz, movLetter);
            }
          } else {
            kindOfVideo = "movement";
            updateWaltzData(newMov.waltz, movLetter);
            markInterviewNotPlayed(currentWaltz, previousMov.movement);
          }
          selected.movement = newMov;
          selected.location = newLoc;
          updateWaltz("playVideo", { type: kindOfVideo, letter: movLetter });
          stepThroughMovementsForThisLocation(selected.location);
          lastWaltzNum = newMov.waltz;
        }
      } else {
        // first selection after program start
        selected = {};
        newMov = movementForLocation(newLoc);
        movLetter = newMov.movement;
        waltzNum = newMov.waltz;
        previousWaltzNum = waltzNum;
        resetCurrentWaltz(waltzNum, movLetter);
        resetLocationMovementIndiciesForWaltz(waltzNum);
        newLoc.previousWaltzNum = previousWaltzNum;
        updateWaltzData(waltzNum, movLetter);
        selected.movement = newMov;
        selected.location = newLoc;
        updateWaltz("playVideo", { type: "movement", letter: movLetter });
        lastWaltzNum = newMov.waltz;
      }
    }
  });

  window.onresize = handleResize;
  addFullScreenChangeListener(handleResize);
  document.onkeydown = handleKeyboardEvents;

  // disable tap and hold context menu
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  }, false);
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
