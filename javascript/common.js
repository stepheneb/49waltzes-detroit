// common variables and functions
//
// Available video resolutions:
//
//   "480x270"
//   "960x540"
//   "1920x1080"

var videoResolution = "1920x1080";

// When testing = true
// A label with waltz/movement, address, and video resolution
// is displayed on the video page along with playback controls.
// Additional information is also included in the movement popup
// labels that appear on the map.
//
// When testing = false
// No label or controls appear on the video page and simpler
// movement popup labels appear on the map page.

var testing = false;

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

    mainTransformationMatrix4,
    scaledTransformationMatrix4,

    fontSizeInPixels,

    numberOfWaltzes = 49,
    waltzMovements,
    waltzLocations,
    waltzes = [],
    waltzList = [],
    waltzLocation,
    currentWaltz,
    lastWaltzNum = 0,

    selected,

    waltzFormatter = d3.format("03d"),
    pixelFormatter = d3.format("f"),
    latLonFormatter = d3.format(".3f");

// utility functions

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function flattenArray(a) {
  return a.reduce(function (j,k) { return j.concat(k); }, []);
}

// initialization and setup functions

function resizeDocumentFont() {
  fontSizeInPixels = contentWidth/960 * 12;
  document.body.style.fontSize = fontSizeInPixels + 'px';
}

function getPixelLocFromGeo(lon, lat) {
  var point = vec3.transformMat4(vec3.create(), [lon, lat, 1], scaledTransformationMatrix4);
  return [
    point[0]/point[2],
    point[1]/point[2]
  ];
}

function initializeLocations() {
  var scale = vec3.fromValues(mapScaleFactorX, mapScaleFactorY, 1),
      i = 0;
  waltzLocations = waltzLocationAndMovementData.locations;
  waltzLocations.forEach(function (loc) {
    var point = getPixelLocFromGeo(loc.longitude, loc.latitude, scaledTransformationMatrix4);
    loc.x = point[0];
    loc.y = point[1];
    loc.movementIndex = 0;
    loc.index = i;
    i++;
  });
}

function initializeMovements() {
  waltzMovements = waltzLocationAndMovementData.movements;
  waltzMovements.forEach(function (mov) {
    mov.interview = interviewForMovement(mov);
  });
}

function calculateNumOfVideosForwaltz() {
  waltzes.forEach(function (waltz) {
    var waltzNum = waltz.waltzNum;
    waltz.numOfVideos = 3 + interviewsForWaltz(waltzNum-1).length;
  });
}

function setupTransformation() {
  var topleft = mapdata.registration.topleft;
      topright = mapdata.registration.topright;
      bottomleft = mapdata.registration.bottomleft;
      bottomright = mapdata.registration.bottomright;
      originalMapWidth = mapdata.width;
      originalMapHeight = mapdata.height;

  mapScaleFactorX = contentWidth/originalMapWidth;
  mapScaleFactorY = contentHeight/originalMapHeight;

  scaledTransformationMatrix4 = transform2d(
    topleft.longitude, topleft.latitude,
    topright.longitude, topright.latitude,
    bottomleft.longitude, bottomleft.latitude,
    bottomright.longitude, bottomright.latitude,
    topleft.x_pixel*mapScaleFactorX, topleft.y_pixel*mapScaleFactorY,
    topright.x_pixel*mapScaleFactorX, topright.y_pixel*mapScaleFactorY,
    bottomleft.x_pixel*mapScaleFactorX, bottomleft.y_pixel*mapScaleFactorY,
    bottomright.x_pixel*mapScaleFactorX, bottomright.y_pixel*mapScaleFactorY);
  }

function setup() {
  contentContainer = d3.select('#content-container');
  contentWidth = contentContainer.node().offsetWidth;
  contentHeight = contentContainer.node().offsetHeight;
  contentMaxDist = Math.sqrt(contentWidth * contentWidth + contentHeight * contentHeight);

  circleRadius = contentWidth/100;
  circleStrokeWidth = circleRadius/4;

  setupTransformation();

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

function waltzNumForLocation(loc) {
  var index = loc.movements[loc.movementIndex];
  return movementByIndex(index).waltz;
}

function locationsForWaltz(waltz) {
  var locations = waltzLocations.filter(function(loc) {
    var locationHasWaltzMovement = loc.movements.filter(function(m) { return waltzMovements[m-1].waltz === waltz; }).length > 0;
    return locationHasWaltzMovement;
  });
  return locations.sort(function (a, b) {
    if (movementForLocation(a).movement < movementForLocation(b).movement) {
      return -1;
    } else {
      return 1;
    }
  });
}

function waltzesForLocation(loc) {
  return waltzMovements.filter(function(m) { return m.location === loc.index; })
    .map(function(m) { return m.waltz; });
}

function movementsForWaltz(waltzNum) {
  return waltzMovements.filter(function(m) { return m.waltz === waltzNum; });
}

function resetLocationMovementIndicies() {
  waltzLocations.forEach(function(loc) {
    loc.movementIndex = 0;
    loc.previousWaltzNum = 0;
    // loc.previousWaltzNum = waltzesForLocation(loc)[0];
  });
}

function resetLocationMovementIndiciesForWaltz(waltzNum) {
  movementsForWaltz(waltzNum).forEach(function (mov) {
    var loc = waltzLocations[mov.location];
    loc.movementIndex = loc.movements.indexOf(mov.index);
  });
}

function locationIsPartOfWaltz(loc, waltzNum) {
  return waltzesForLocation(loc).indexOf(waltzNum) !== -1;
}

function interviewForMovement(movement) {
  return interviewData[movement.waltz + movement.movement];
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

function movementForWaltz(waltzNum, movLetter) {
  var movements;
  movements = waltzMovements.filter(function(mov) {
    return (mov.waltz === waltzNum && mov.movement === movLetter);
  });
  if (movements.length > 0) {
    return movements[0];
  } else {
    return false;
  }
}

// string generators

function generateWaltzKeyForMovement(mov) {
  return "" + mov.waltz + mov.movement;
}

function generateLocationString(loc) {
  var mov = movementForLocation(loc);
  return generateWaltzKeyForMovement(mov) + " (" + mov.index + "): " +
           loc.address + ", " + videoResolution;
}

// local storage functions

function saveWaltzLocation(loc, eventType, eventData) {
  loc.testing = testing;
  loc.eventType = eventType;
  loc.eventData = eventData;
  loc.videoResolution = videoResolution;
  loc.lastWaltzNum = lastWaltzNum;
  localStorage.setItem("waltzLocation", JSON.stringify(loc));
  // how to read these data: loc = JSON.parse(localStorage.getItem("waltzLocation"))
}

// waltzes initialization when source file is loaded

(function () {
  for(var i = 1; i <= numberOfWaltzes; i++) {
    waltzes[i-1] = {
      waltzNum: i,
      color: "#13f",
      opacity: 0,
      movementsPlayed: [],
      interviewsPlayed: [],
      rendered: false,
      points: [],
      renderedPoints: []
    };
    waltzList[i-1] = [i-1];
  }
})();

function checkWaltzPoints() {
  return waltzes.map(function(v, i) {
    return v.points.length !== 3 ? i : null;
  }).filter(function(v) { return v; });
}
