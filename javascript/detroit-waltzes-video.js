var video,
    videoContainer,
    selected,
    waltzFormatter = d3.format("03d");

function generateVideoKeyStr(location) {
  var istr = waltzFormatter(location.index)
  return istr + "-" + location.waltz + location.movement
}

function showVideo(d) {
  // videoContainer.transition()
  //    .duration(500)
  //    .style("opacity", 1.0)
  //    .each("end", function(d) {
  //      video.node().play();
  //     })
  // 
  video = videoContainer.append("video")
      .style("opacity", 0.0);
  video
    .append("source")
      .attr("src", "video/mp4-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
    .append("source")
      .attr("src", "video/webm-480x270-500k/" + generateVideoKeyStr(d) + "-480x270-500k.webm")
      .attr("type", 'video/webm; codecs="vp8, vorbis"');

  video.transition()
     .duration(500)
     .style("opacity", 1.0)
     .each("end", function(d) {
       video.node().play();
      })

}

function hideVideo() {
  // videoContainer.transition()
  //    .duration(500)
  //    .style("opacity", 0)
  //    .each("end", function(d) {
  //      videoContainer.selectAll('video').remove();
  //    })
  video.transition()
     .duration(500)
     .style("opacity", 0.0)
     .each("end", function(d) {
       video.node().play();
      })

}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  video = d3.select("#full-video");
  videoContainer = d3.select("#full-video-container");
  window.addEventListener("storage", function(e) {
    console.log("storage event");
    if (e && e.key === "waltzLocation") {
      selected = JSON.parse(e.newValue);
      console.log("waltzLocation: " + selected.index + ": " + selected.waltz + selected.movement);
      hideVideo();
      videoContainer.selectAll('video').remove();
      showVideo(selected);
    }
  }, false);
});
