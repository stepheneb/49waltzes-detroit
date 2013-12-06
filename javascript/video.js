var video,
    videoNode,
    mp4Source,
    webmSource,
    selected = null,
    imageContainer,
    stillImage,
    stillImageDiv,
    waltzLocationTip,
    imageNumberTip,
    interview;


function showLocationTip(selection) {
  var loc = selection.location,
      mov = selection.movement,
      htmlContent = generateLocationString(loc);
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

function videoLoadError(e) {
  var mov = movementForLocation(waltzLocation);
  console.log("video error: " + e + " for " + generateVideoKeyStr(mov));
}

function loadVideo() {
  videoNode.load();
  videoNode.addEventListener('error', videoLoadError, false);
}

function loadVideoMovement(selection) {
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
      .attr("src", "video/webm-1920x1080-10M/" + generateVideoKeyStr(movement) + "-1920x1080-10M.webm")
      .attr("type", 'video/webm;');
    mp4Source
      .attr("src", "video/mp4-1920x1080-10M/" + generateVideoKeyStr(movement) + "-1920x1080-10M.mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    break;
  }
  loadVideo();
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
  loadVideo();
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

window.addEventListener("load", function(event) {
  console.log("DOM fully loaded and parsed, stylesheets and images loaded");
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
      .attr("preload", "auto")
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

  imageContainer = contentContainer.append("div")
      .attr("class", "image-container");

  imageNumberTip = imageContainer.append("div")
      .attr("class", "imageNumberTip")
      .style("opacity", 0);

  window.addEventListener("storage", function(e) {
    var movement, stillImageDatum;
    console.log("video: storage event: ");
    if (e && e.key === "waltzLocation") {
      waltzLocation = JSON.parse(e.newValue);
      videoResolution = waltzLocation.videoResolution;
      switch (waltzLocation.eventType) {

        case "testing":
        updateLocationTip();
        video.attr("controls", waltzLocation.testing ? "controls" : null );
        console.log("video: test mode: " + waltzLocation.testing);
        break;

        case "movement":
        videoNode.removeEventListener('canplaythrough', transitionVideoOn);
        stopVideo();
        hideVideo();
        selected = {};
        movement = movementForLocation(waltzLocation);
        selected.location = waltzLocation;
        selected.movement = movement;
        console.log("video: " + generateLocationString(waltzLocation));
        if (stillImage) {
          stillImage.remove();
        }
        imageNumberTip.style("opacity", 0);
        if (movement.waltz !== waltzLocation.lastWaltzNum) {
          stillImageDatum = stillImageForWaltzNumber(movement.waltz);
        }
        interview = interviewForMovement(movement);
        updateLocationTip();
        loadVideoMovement(selected);
        if (stillImageDatum) {
          stillImage = imageContainer.append("img")
            .attr("src", stillImageDatum.path["1920x1080"]);
          imageNumberTip
            .style("left", stillImageDatum.numPosX)
            .style("top", stillImageDatum.numPosY)
            .text(movement.waltz);
          stillImage.transition()
            .duration(5000)
            .each("end", function() {
              showVideo();
              imageNumberTip.transition()
                .duration(500)
                .style("opacity", 0);
              stillImage.transition()
                .duration(200)
                .style("opacity", 0)
                .remove();
            });
          imageNumberTip.transition()
            .duration(200)
            .style("opacity", 1)
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
