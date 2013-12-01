
function addFullScreenChangeListener(fullScreenChangeCallback) {
  document.addEventListener("fullscreenchange", fullScreenChangeCallback, false);
  document.addEventListener("mozfullscreenchange", fullScreenChangeCallback, false);
  document.addEventListener("webkitfullscreenchange", fullScreenChangeCallback, false);
}

function setupFullScreenSupport() {
  requestFullscreenMethod =
       document.body.requestFullScreen ||
       document.body.webkitRequestFullScreen ||
       document.body.mozRequestFullScreen ||
       document.body.msRequestFullScreen;

  document.cancelFullscreenMethod =
       document.cancelFullScreen ||
       document.webkitCancelFullScreen ||
       document.mozCancelFullScreen ||
       document.msCancelFullScreen;
}

function isFullscreen() {
  if (document.fullscreenElement||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement) {
    return true;
  }
}
