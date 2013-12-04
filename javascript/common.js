// common variables and functions
//
// Available video resolutions:
//
//   "480x270"
//   "960x540"
//   "1920x1080"

var videoResolution = "960x540";

// When testing = true
// A label with waltz/movement, address, and video resolution
// is displayed on the video page along with playback controls.
// Additional information is also included in the movement popup
// labels that appear on the map.
//
// When testing = false
// No label or controls appear on the video page and simpler
// movement popup labels appear on the map page.

var testing = true;

var contentContainer,
    contentWidth,
    contentHeight,
    contentMaxDist,

    circleRadius,
    circleStrokeWidth,

    topleft,
    bottomright,

    originalMapWidth,
    originalMapHeight,

    mapScaleFactorX,
    mapScaleFactorY,

    xScale,
    yScale,

    fontSizeInPixels,

    numberOfWaltzes = 49,
    waltzMovements,
    waltzLocations,
    waltzes = [],
    waltzList = [],
    waltzLocation,
    currentWaltz,

    selected,

    waltzFormatter = d3.format("03d"),
    pixelFormatter = d3.format("f"),
    latLonFormatter = d3.format(".3f");

function resizeDocumentFont() {
  fontSizeInPixels = contentWidth/960 * 12;
  document.body.style.fontSize = fontSizeInPixels + 'px';
}

function initializeLocations() {
  waltzLocations = waltzLocationAndMovementData.locations;
  waltzLocations.forEach(function (loc) {
    var xPixel = xScale.invert(loc.longitude),
        yPixel = yScale.invert(loc.latitude);

    loc.x = xPixel*mapScaleFactorX;
    loc.y = yPixel*mapScaleFactorY;
    loc.movementIndex = 0;
  });
}

function initializeMovements() {
  waltzMovements = waltzLocationAndMovementData.movements;
  waltzMovements.forEach(function (mov) {
    mov.interview = interviewForMovement(mov);
  });
}

function resetWaltzOpacity() {
  waltzes.forEach(function (waltz) {
    waltz.opacity = 0;
  });
}

function resetWaltzPoints() {
  waltzes.forEach(function (waltz) {
    var waltzNum = waltz.waltz;
    waltz.points = locationsForWaltz(waltzNum).map(function(loc) { return [loc.x, loc.y].join(",") }).join(" ");
  });
}

function calculateNumOfVideosForwaltz() {
  waltzes.forEach(function (waltz) {
    var waltzNum = waltz.waltz;
    waltz.numOfVideos = 3 + interviewsForWaltz(waltzNum-1);
  });
}

function setup() {
  contentContainer = d3.select('#content-container');
  contentWidth = contentContainer.node().offsetWidth;
  contentHeight = contentContainer.node().offsetHeight;
  contentMaxDist = Math.sqrt(contentWidth * contentWidth + contentHeight * contentHeight);

  circleRadius = contentWidth/100;
  circleStrokeWidth = circleRadius/4;

  topleft = mapdata.registration.topleft;
  bottomright = mapdata.registration.bottomright;
  originalMapWidth = mapdata.width;
  originalMapHeight = mapdata.height;

  mapScaleFactorX = contentWidth/originalMapWidth;
  mapScaleFactorY = contentHeight/originalMapHeight;

  xScale = d3.scale.linear();
  xScale.domain([topleft.x_pixel, bottomright.x_pixel])
  xScale.range([topleft.longitude, bottomright.longitude])

  yScale = d3.scale.linear();
  yScale.domain([topleft.y_pixel, bottomright.y_pixel])
  yScale.range([topleft.latitude, bottomright.latitude])

  resizeDocumentFont();

  initializeMovements();
  initializeLocations();
  calculateNumOfVideosForwaltz();
}

// relational functions

function movementByIndex(index) {
  return waltzMovements.filter(function(obj) {
      // coerce both obj.index and index to numbers for val & type comparison
      return +obj.index === +index;
  })[ 0 ];
}

function stillImageForWaltzNumber(num) {
  return stillImageData["" + num];
}

function stillImageForMovement(movement) {
  var stillImageDatum = stillImageForWaltzNumber(movement.waltz);
  if (stillImageDatum.movement === movement.movement) {
    return stillImageDatum;
  } else {
    return null;
  }
}

function movementForLocation(loc) {
  var index = loc.movements[loc.movementIndex];
  return movementByIndex(index);
}

function waltzForLocation(loc) {
  var index = loc.movements[loc.movementIndex];
  return movementByIndex(index).waltz;
}

function locationsForWaltz(waltz) {
  return waltzLocations.filter(function(loc) {
    return movementForLocation(loc).waltz === waltz;
  })
}

function interviewForMovement(movement) {
  return interviewData[movement.waltz + movement.movement]
}

function interviewsForWaltz(waltz) {
  var locs = locationsForWaltz(waltz),
      mov,
      interviews = [],
      i;
  for(i = 0; i < locs.length; i++) {
    mov = movementForLocation(locs[i]);
    if (mov.interview) {
      interviews.push(mov.interview);
    }
  }
  return interviews;
}

function waltzKeyForMovement(mov) {
  return "" + mov.waltz + mov.movement;
}

function movementForWaltz(waltzNum, movLetter) {
  var movements;
  movements = waltzMovements.filter(function(mov) {
    return (mov.waltz === waltzNum && mov.movement === movLetter);
  })
  if (movements.length > 0) {
    return movements[0];
  } else {
    return false;
  }
}


// local storage functions

function saveWaltzLocation(loc, eventType, eventData) {
  loc.testing = testing;
  loc.eventType = eventType;
  loc.eventData = eventData;
  loc.videoResolution = videoResolution;
  localStorage.setItem("waltzLocation", JSON.stringify(loc));
  // how to read these data: loc = JSON.parse(localStorage.getItem("waltzLocation"))
}

// waltzes initialization when source file is loaded

(function () {
  for(var i = 1; i <= numberOfWaltzes; i++) {
    waltzes[i-1] = {
      waltz: i,
      opacity: 0,
      movementsPlayed: [],
      interviewsPlayed: []
    };
    waltzList[i-1] = [i-1];
  }
})();
