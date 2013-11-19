
var xScale,
    yScale,

    map,

    mapImage,
    mapWidth,
    mapHeight,

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

    actualLocationData;

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

function handleResize() {
  setup();
  svg.attr("width",  mapWidth)
     .attr("height", mapHeight);
  circle.each(function(d) {
    var c = d3.select(this);
     c.attr("cx", function(d) {
       return d.x })
     c.attr("cy", function(d) { return d.y });
  })
  videoContainer
      .style("left", mapWidth/3*2 - 24 + "px")
      .style("width", mapWidth/3 + "px")
      .style("top", mapHeight - (mapWidth/3)/1.777 - 12 + "px")
      .style("height", (mapWidth/3 - 12)/1.777 + "px");
}

function generateVideoKeyStr(location) {
  var i = location.index,
      istr;
  if (i < 10) {
    istr = "00" + i;
  } else if (i < 100) {
    istr = "0" + i;
  } else {
    istr = i.toString();
  }
  return istr + "-" + location.waltz + location.movement
}
// localStorage["locationVideo"] = "mp4-480x270-500k/001-1A-480x270-500k.mp4"

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  mapImage = document.getElementById('map-image');
  setup();
  tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  videoContainer = d3.select("body")
      .append("div")
      .attr("class", "videoContainer")
      .style("opacity", 0)
      .style("left", mapWidth/3*2 - 24 + "px")
      .style("width", mapWidth/3 + "px")
      .style("top", mapHeight - (mapWidth/3)/1.777 - 12 + "px")
      .style("height", (mapWidth/3 - 12)/1.777 + "px");

  svg = mapContainer.append("svg")
      .attr("width",  mapWidth)
      .attr("height", mapHeight)
      .attr("class", "map-svg")
      .style('z-index', 1);

  circle = svg.selectAll("circle")
    .data(locationdata, function (d) { return d.index });

  circle.enter().append("circle")
      .attr("class", "location")
      .attr("cx", function(d) { return d.x })
      .attr("cy", function(d) { return d.y })
      .attr("r", 6)
      .on("mouseover", function(d) {
           tooltip.transition()
               .duration(200)
               .style("opacity", .9);
           tooltip.html(d.index + ": " + d.waltz + d.movement + "<br/>"  + d.address)
               .style("left", (d3.event.pageX + 8) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
           videoContainer.transition()
               .duration(200)
               .style("opacity", 1.0);
           video = videoContainer.append("video")
               .attr("autoplay", "autoplay")
           video.append("source")
             .attr("src", "video/mp4-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.mp4")
             .attr("type", 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
           video.append("source")
             .attr("src", "video/webm-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.webm")
             .attr("type", 'video/webm; codecs="vp8, vorbis"')
        })
       .on("mouseout", function(d) {
           tooltip.transition()
               .duration(500)
               .style("opacity", 0)
           video.remove();
           videoContainer.transition()
               .duration(500)
               .style("opacity", 0);
        });

  window.onresize = handleResize;

});

