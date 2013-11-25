var video,
    videoContainer,
    selected,
    waltzFormatter = d3.format("03d");


function showLocationtip(d) {
  locationtip.html(d.index + ": " + d.waltz + d.movement + ", "+ d.address);
  locationtip.transition()
     .duration(200)
     .style("opacity", .9);
}

function hideLocationtip(d) {
  locationtip.transition()
     .duration(200)
     .style("opacity", 0)
}

function generateVideoKeyStr(location) {
  var istr = waltzFormatter(location.index)
  return istr + "-" + location.waltz + location.movement
}

function showVideo(d) {
  video = videoContainer.append("video")
      .attr("controls", d.testing)
      .attr("autoplay", "autoplay")
      .style("opacity", 0.0);

  video.transition()
     .duration(500)
     .style("opacity", 1.0)
     .each("end", function(d) {
       video.node().play();
      })

  video
    .append("source")
      .attr("src", "video/mp4-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

  video
    .append("source")
      .attr("src", "video/webm-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.webm")
      .attr("type", 'video/webm; codecs="vp8, vorbis"');

}

function hideVideo() {
  video.transition()
     .duration(500)
     .style("opacity", 0.0)
     .each("end", function(d) {
       video.node().play();
      })

}

function handleResize() {
  document.body.style.fontSize = window.innerWidth/960 * 12 + 'px';
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  handleResize();
  video = d3.select("#full-video");
  videoContainer = d3.select("#full-video-container");
  locationtip = videoContainer.append("div")
      .attr("class", "locationtip")
      .style("opacity", 0)
      .style("z-index", 3);

  window.addEventListener("storage", function(e) {
    console.log("storage event");
    if (e && e.key === "waltzLocation") {
      selected = JSON.parse(e.newValue);
      console.log("waltzLocation: " + selected.index + ": " + selected.waltz + selected.movement);
      hideVideo();
      showLocationtip(selected);
      videoContainer.selectAll('video').remove();
      showVideo(selected);
      showLocationtip(selected);
    }
  }, false);

  window.onresize = handleResize;

});
