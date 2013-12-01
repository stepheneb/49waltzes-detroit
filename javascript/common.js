// common variables and functions

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

    waltzMovements,
    waltzLocations,
    waltzes = [],

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
function initializeWaltzes() {
  var i;
  for(i = 1; i <= 47; i++) {
    var waltz = {},
        points = locationsForWaltz(i).map(function(loc) { return [loc.x, loc.y].join(",") }).join(" ");
    waltz.waltz = i;
    waltz.points = points;
    waltz.opacity = 0;
    waltzes[i-1] = waltz;
  }
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
  initializeWaltzes();
}

// relational functions

function interviewForMovement(movement) {
  return interviewData[movement.waltz + movement.movement]
}

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