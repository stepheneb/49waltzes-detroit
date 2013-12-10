var mainVideo,
    nextVideo,
    video1,
    video1Node,
    mp4Source1,
    webmSource1,
    video2,
    vide2oNode,
    mp4Source2,
    webmSource2,
    mainVideoAlmostOver = false,
    mainVideoStarted = false,
    preloadedMovementWaltzKey,
    preloadedInterviewWaltzKey,
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
     .style("opacity", 0.9);
}

function hideLocationtip() {
  waltzLocationTip.transition()
     .duration(200)
     .style("opacity", 0);
}

function updateLocationTip() {
  if (waltzLocation.testing) {
    showLocationTip(selected);
  } else {
    hideLocationtip();
  }
}

function generateVideoKeyStr(movement) {
  var index_str = waltzFormatter(movement.index);
  return index_str + "-" + movement.waltz + movement.movement;
}

function videoLoadError(e) {
  var mov = movementForLocation(waltzLocation);
  console.log("video error: " + e + " for " + generateVideoKeyStr(mov));
}

function loadVideo(node) {
  node.load();
  // node.addEventListener('error', videoLoadError, false);
}

function loadVideoMovement(selection, node) {
  var location = selection.location,
      movement = selection.movement,
      webmSource,
      mp4Source;

  if (node === video1Node) {
    webmSource = webmSource1;
    mp4Source = mp4Source1;
  } else {
    webmSource = webmSource2;
    mp4Source = mp4Source2;
  }

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
  loadVideo(node);
}

function loadVideoInterview(selection, node) {
  var location = selection.location,
      movement = selection.movement,
      webmSource,
      mp4Source;

  if (node === video1Node) {
    webmSource = webmSource1;
    mp4Source = mp4Source1;
  } else {
    webmSource = webmSource2;
    mp4Source = mp4Source2;
  }

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
  loadVideo(node);
}

function transitionVideoOn() {
  mainVideoStarted = false;
  mainVideo.transition()
     .duration(200)
     .style("opacity", 1.0)
     .each("end", function() {
       mainVideoNode.play();
       setupVideoTimeListener(mainVideoNode);
       mainVideoAlmostOver = false;
       mainVideo.attr("controls", waltzLocation.testing ? "controls" : null );
       waltzLocation.videoEvent = "started";
       saveWaltzLocation(waltzLocation, "videoEvent");
      });
}

function swapVideos() {
  if (mainVideo === video1) {
    video2.style("display","block");
    video1.style("display","none");
    mainVideo = video2;
    mainVideoNode = video2Node;
    nextVideo = video1;
    nextVideoNode = video1Node;
    video1.transition()
       .duration(200)
       .style("opacity", 0.0)
       .each("end", function() {
         video1.style("display","none");
        });
    video2.transition()
      .duration(200)
      .style("opacity", 1.0);
  } else {
    video1.style("display","block");
    mainVideo = video1;
    mainVideoNode = video1Node;
    nextVideo = video2;
    nextVideoNode = video2Node;
    video2.transition()
       .duration(200)
       .style("opacity", 0.0)
       .each("end", function() {
         video2.style("display","none");
        });
    video1.transition()
      .duration(200)
      .style("opacity", 1.0);
  }
}

function videoReport() {
  console.log("currentTime: " + mainVideoNode.currentTime + " duration: " + mainVideoNode.duration);
}

function videoTimeListener(node) {
  var duration = mainVideoNode.duration,
      currentTime = mainVideoNode.currentTime;

  if (currentTime && currentTime/duration >= 0.05 && mainVideoStarted === false) {
    mainVideoStarted = true;
    timeToPreloadVideo();
    videoReport();
  }
  if (currentTime && currentTime/duration >= 0.80 && mainVideoAlmostOver === false) {
    mainVideoAlmostOver = true;
    videoReport();
  }
}

function removeVideoTimeListener(node) {
  node.removeEventListener('timeupdate', videoTimeListener);
}

function setupVideoTimeListener(node) {
  node.addEventListener('timeupdate', videoTimeListener);
}

function timeToPreloadVideo() {
  waltzLocation.videoEvent = "preload";
  saveWaltzLocation(waltzLocation, "videoEvent");
}

function videoEnded() {
  waltzLocation.videoEvent = "ended";
  saveWaltzLocation(waltzLocation, "videoEvent");
}

function showVideo(vid) {
  var node = vid.node();
  if (node.readyState < 4) {
    node.addEventListener('canplaythrough', transitionVideoOn);
  } else {
    transitionVideoOn(vid);
  }
  node.addEventListener('ended', videoEnded);
}

function hideVideo(vid) {
  var node = vid.node();
  node.removeEventListener('canplaythrough', transitionVideoOn);
  removeVideoTimeListener(node);
  vid.transition()
     .duration(200)
     .style("opacity", 0.0)
     .each("end", function() {
       node.pause();
      });
}

function stopVideo(vid) {
  var node = vid.node();
  node.pause();
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
        mainVideo.attr("controls", waltzLocation.testing ? "controls" : null );
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

function preloadMovement(nextSelection) {
  loadVideoMovement(nextSelection, nextVideoNode);
  preloadedMovementWaltzKey = generateWaltzKeyForMovement(nextSelection.movement);
}

function preloadInterview(nextSelection) {
  loadVideoInterview(nextSelection, nextVideoNode);
  preloadedInterviewWaltzKey = generateWaltzKeyForMovement(nextSelection.movement);
}

function playMovement() {
  var stillImageDatum,
      movement = movementForLocation(waltzLocation);

  selected = {};
  selected.location = waltzLocation;
  selected.movement = movement;
  updateLocationTip();
  if (movement.waltz !== waltzLocation.lastWaltzNum) {
    stillImageDatum = stillImageForWaltzNumber(movement.waltz);
  }
  waltzKey = generateWaltzKeyForMovement(movement);
  if (waltzKey === preloadedMovementWaltzKey) {
    swapVideos();
  } else {
    loadVideoMovement(selected, mainVideoNode);
  }
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
        showVideo(mainVideo);
        imageNumberTip.transition()
          .duration(500)
          .style("opacity", 0);
        stillImage.transition()
          .duration(200)
          .style("opacity", 0)
          .remove();
      });
    imageNumberTip.transition()
      .duration(100)
      .style("opacity", 1);
  } else {
    showVideo(mainVideo);
  }
}

function playInterview() {
  var mov = movementForLocation(waltzLocation),
      waltzKey = generateWaltzKeyForMovement(mov);

  if (waltzKey === preloadedInterviewWaltzKey) {
    swapVideos();
  } else {
    loadVideoInterview(selected, mainVideoNode);
  }
  showVideo(mainVideo);
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

  // video1
  video1 = contentContainer.append("video")
      .attr("id", "video1")
      .attr("controls", null)
      .attr("preload", "auto")
      .style("opacity", 0.0);

  video1Node = video1.node();

  webmSource1 = video1.append("source")
          .attr("id", "webm")
          .attr("type", 'video/webm;');

  mp4Source1 = video1.append("source")
      .attr("id", "mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  // video2
  video2 = contentContainer.append("video")
      .attr("id", "video2")
      .attr("controls", null)
      .attr("preload", "auto")
      .style("opacity", 0.0);

  video2Node = video2.node();

  webmSource2 = video2.append("source")
          .attr("id", "webm")
          .attr("type", 'video/webm;');

  mp4Source2 = video2.append("source")
      .attr("id", "mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');


  mainVideo = video1;
  mainVideoNode = video1Node;

  nextVideo = video2;
  nextVideo.style("display", "none");
  nextVideoNode = video2Node;

  mainVideo.transition()
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
    var movement,
        eventType,
        eventData,
        nextMovement,
        waltzKey;
    console.log("video: storage event: ");
    if (e && e.key === "waltzLocation") {
      waltzLocation = JSON.parse(e.newValue);
      eventType = waltzLocation.eventType;
      eventData = waltzLocation.eventData;
      videoResolution = waltzLocation.videoResolution;
      switch (eventType) {

        case "testing":
          updateLocationTip();
          mainVideo.attr("controls", waltzLocation.testing ? "controls" : null );
          nextVideo.attr("controls", waltzLocation.testing ? "controls" : null );
          console.log("video: test mode: " + waltzLocation.testing);
          break;

        case "preloadVideo":
          waltzKey = generateWaltzKeyForMovement(eventData.nextSelection.movement);
          console.log("video: preloadVideo: " + eventData.type + ": " + waltzKey);
          switch (eventData.type) {
            case "movement":
              preloadMovement(eventData.nextSelection);
              break;
            case "interview":
              preloadInterview(eventData.nextSelection);
              break;
          }
          break;

        case "playVideo":
          waltzKey = generateWaltzKeyForMovement(movementForLocation(waltzLocation));
          stopVideo(mainVideo);
          hideVideo(mainVideo);
          if (stillImage) stillImage.remove();
          imageNumberTip.style("opacity", 0);
          console.log("video: playVideo: " + eventData.type + ": " + waltzKey);
          switch (eventData.type) {
            case "movement":
              playMovement();
              break;
            case "interview":
              playInterview();
              break;
          }
      }
    }
  }, false);

  window.onresize = handleResize;
  addFullScreenChangeListener(handleResize);
  document.onkeydown = handleKeyboardEvents;
});
