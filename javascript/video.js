var video,
    videoNode,
    mp4Source,
    webmSource,
    contentContainer,
    selected = null,
    stillImage,
    interview;

function showLocationTip(selection) {
  var loc = selection.location,
      mov = selection.movement,
      htmlContent = waltzKeyForMovement(mov) + " (" + mov.index + "): " +
                    loc.address + ", " + waltzLocation.videoResolution;
  waltzLocationTip.html(htmlContent);
  waltzLocationTip.transition()
     .duration(200)
     .style("opacity", .9);
}

function hideLocationtip() {
  waltzLocationTip.transition()
     .duration(200)
     .style("opacity", 0)
}

function updateLocationTip() {
  if (waltzLocation.testing) {
    showLocationTip(selected);
  } else {
    hideLocationtip();
  }
}

function generateVideoKeyStr(movement) {
  var index_str = waltzFormatter(movement.index)
  return index_str + "-" + movement.waltz + movement.movement
}

function loadVideo(selection) {
  var location = selection.location,
      movement = selection.movement;

  switch (location.videoResolution) {
  case "480x270":
    webmSource
      .attr("src", "video/webm-480x270-500k/" + generateVideoKeyStr(movement) + "-480x270-500k.webm")
      .attr("type", 'video/webm;');
    mp4Source
      .attr("src", "video/mp4-480x270-500k/" + generateVideoKeyStr(movement) + "-480x270-500k.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    break;

  case "960x540":
    webmSource
      .attr("src", "video/webm-960x540-2M/" + generateVideoKeyStr(movement) + "-960x540-2M.webm")
      .attr("type", 'video/webm;');
    mp4Source
      .attr("src", "video/mp4-960x540-2M/" + generateVideoKeyStr(movement) + "-960x540-2M.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    break;

  case "1920x1080":
    webmSource
      .attr("src", "video/webm-1920x1080-10M/" + generateVideoKeyStr(movement) + "-webm-1920x1080-10M.webm")
      .attr("type", 'video/webm;');
    mp4Source
      .attr("src", "video/mp4-1920x1080-10M/" + generateVideoKeyStr(movement) + "-1920x1080-10M.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    break;
  }
  videoNode.load();
}

function loadVideoInterview(selection) {
  var location = selection.location,
      movement = selection.movement;

  switch (location.videoResolution) {
  case "480x270":
    webmSource
      .attr("src", "video/webm-480x270-500k/interviews/" + generateVideoKeyStr(movement) + "-interview-480x270-500k.webm")
      .attr("type", 'video/webm;');
    mp4Source
      .attr("src", "video/mp4-480x270-500k/interviews/" + generateVideoKeyStr(movement) + "-interview-480x270-500k.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    break;

  case "960x540":
    webmSource
      .attr("src", "video/webm-960x540-2M/interviews/" + generateVideoKeyStr(movement) + "-interview-960x540-2M.webm")
      .attr("type", 'video/webm;');
    mp4Source
      .attr("src", "video/mp4-960x540-2M/interviews/" + generateVideoKeyStr(movement) + "-interview-960x540-2M.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    break;

  case "1920x1080":
    webmSource
      .attr("src", "video/webm-1920x1080-10M/interviews/" + generateVideoKeyStr(movement) + "-interview-webm-1920x1080-10M.webm")
      .attr("type", 'video/webm;');
    mp4Source
      .attr("src", "video/mp4-1920x1080-10M/interviews/" + generateVideoKeyStr(movement) + "-interview-1920x1080-10M.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    break;
  }
  videoNode.load();
}

function transitionVideoOn() {
  video.transition()
     .duration(200)
     .style("opacity", 1.0)
     .each("end", function() {
       videoNode.play();
       video.attr("controls", waltzLocation.testing ? "controls" : null );
       waltzLocation.videoEvent = "started";
       saveWaltzLocation(waltzLocation, "videoEvent");
      })
}

function videoEnded() {
  waltzLocation.videoEvent = "ended";
  saveWaltzLocation(waltzLocation, "videoEvent");
}

function showVideo() {
  if (videoNode.readyState < 4) {
    videoNode.addEventListener('canplaythrough', transitionVideoOn);
  } else {
    transitionVideoOn();
  }
  videoNode.addEventListener('ended', videoEnded);
}

function hideVideo() {
  videoNode.removeEventListener('canplaythrough', transitionVideoOn);
  video.transition()
     .duration(200)
     .style("opacity", 0.0)
     .each("end", function() {
       videoNode.pause();
      })
}

function stopVideo() {
  videoNode.pause();
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
      case 84:                    // "t"
      if (evt.ctrlKey || evt.altKey) {          // control or alt-t, toggle testing flag
        evt.preventDefault();
        testing = !testing;
        waltzLocation.testing = testing;
        updateLocationTip();
        video.attr("controls", waltzLocation.testing ? "controls" : null );
        saveWaltzLocation(waltzLocation, "testing");
      }
      break;
    }
  }
}

function resizeContentContainer() {
  // var paddingWidth = mapWidth/160,
  //     paddingHeight = paddingWidth,
  //     videoWidth = mapWidth/2.5,
  //     videoHeight = videoWidth * 9/16,
  //     videoLeft = Math.min(mapWidth, window.innerWidth) - (videoWidth + paddingWidth),
  //     videoTop =  Math.min(mapHeight, window.innerHeight) - (videoHeight + paddingHeight);
  //
  // videoContainer
  //     .style("left", videoLeft + "px")
  //     .style("top", videoTop + "px")
  //     .style("width", videoWidth + "px")
  //     .style("height", videoHeight + "px");
}

function handleResize() {
  setup();
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  setup();
  setupFullScreenSupport();
  handleResize();

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

  contentContainer = d3.select("#content-container");
  video = contentContainer.append("video")
      .attr("controls", null)
      .style("opacity", 0.0);

  webmSource = video.append("source")
          .attr("id", "webm")
          .attr("type", 'video/webm;');

  mp4Source = video.append("source")
      .attr("id", "mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  videoNode = video.node();

  video.transition()
     .duration(200)
     .style("opacity", 1.0);

  waltzLocationTip = contentContainer.append("div")
      .attr("class", "waltzLocationTip")
      .style("opacity", 0)
      .style("z-index", 3);

  window.addEventListener("storage", function(e) {
    var movement, stillImageDatum;
    console.log("handling storage event: video window");
    if (e && e.key === "waltzLocation") {
      waltzLocation = JSON.parse(e.newValue);
      switch (waltzLocation.eventType) {

        case "testing":
        updateLocationTip();
        video.attr("controls", waltzLocation.testing ? "controls" : null );
        break;

        case "movement":
        videoNode.removeEventListener('canplaythrough', transitionVideoOn);
        if (stillImage) {
          stillImage.remove();
        }
        stopVideo();
        hideVideo();
        selected = {};
        movement = movementForLocation(waltzLocation);
        selected.location = waltzLocation;
        selected.movement = movement;
        console.log("waltzLocation: " + movement.index + ": " + movement.waltz + movement.movement);
        stillImageDatum = stillImageForMovement(movement);
        interview = interviewForMovement(movement);
        updateLocationTip();
        loadVideo(selected);
        if (stillImageDatum) {
          stillImage = contentContainer.append("img")
              .attr("src", stillImageDatum.path["1920x1080"]);

          stillImage.transition()
              .duration(5000)
              .remove()
              .each("end", function() {
                showVideo();
              })
        } else {
          showVideo();
        }
        break;

        case "interview":
        videoNode.removeEventListener('canplaythrough', transitionVideoOn);
        stopVideo();
        hideVideo();
        loadVideoInterview(selected);
        showVideo();
        break;
      }
    }
  }, false);

  window.onresize = handleResize;
  addFullScreenChangeListener(handleResize);
  document.onkeydown = handleKeyboardEvents;
});
