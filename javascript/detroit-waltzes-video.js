var video,
    videoContainer,
    selected = null,
    locations,
    movements,
    waltzFormatter = d3.format("03d");


function showLocationtip(selection) {
  var location = selection.location,
      movement = selection.movement;
  locationtip.html(movement.index + ": " + movement.waltz + movement.movement + ", "+ location.address);
  locationtip.transition()
     .duration(200)
     .style("opacity", .9);
}

function hideLocationtip() {
  locationtip.transition()
     .duration(200)
     .style("opacity", 0)
}

function generateVideoKeyStr(movement) {
  var index_str = waltzFormatter(movement.index)
  return index_str + "-" + movement.waltz + movement.movement
}


function showVideo(selection) {
  var location = selection.location,
      movement = selection.movement;

  video = videoContainer.append("video")
      .attr("controls", location.testing)
      .attr("autoplay", "autoplay")
      .style("opacity", 0.0);

  video
    .append("source")
      .attr("src", "video/mp4-480x270-500k/" + generateVideoKeyStr(movement) + "-480x270-500k.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

  video
    .append("source")
      .attr("src", "video/webm-480x270-500k/" + generateVideoKeyStr(movement) + "-480x270-500k.webm")
      .attr("type", 'video/webm; codecs="vp8, vorbis"');

  video.transition()
     .duration(200)
     .style("opacity", 1.0)
     .each("end", function() {
       video.node().play();
      })
}

function hideVideo() {
  video.transition()
     .duration(200)
     .style("opacity", 0.0)
     .each("end", function() {
       video.node().pause();
      })
}

function handleResize() {
  document.body.style.fontSize = window.innerWidth/960 * 12 + 'px';
}

function setup() {
  function initializeLocations() {
    locations = locationAndMovementData.locations;
  }

  function initializeMovements() {
    movements = locationAndMovementData.movements;
  }
  handleResize();
  initializeLocations();
  initializeMovements();
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

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  video = d3.select("#full-video");
  videoContainer = d3.select("#full-video-container");
  locationtip = videoContainer.append("div")
      .attr("class", "locationtip")
      .style("opacity", 0)
      .style("z-index", 3);
  setup();

  window.addEventListener("storage", function(e) {
    var location, movement;
    console.log("storage event");
    if (e && e.key === "waltzLocation") {
      selected = {};
      location = JSON.parse(e.newValue);
      movement = getMovementFromLocation(location);
      selected.location = location;
      selected.movement = movement;
      console.log("waltzLocation: " + movement.index + ": " + movement.waltz + movement.movement);
      hideVideo();
      videoContainer.selectAll('video').remove();
      showVideo(selected);
      showLocationtip(selected);
    }
  }, false);

  window.onresize = handleResize;

});
