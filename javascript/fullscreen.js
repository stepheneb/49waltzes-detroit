
function addFullScreenChangeListener(fullScreenChangeCallback) {
  document.addEventListener("fullscreenchange", fullScreenChangeCallback, false);
  document.addEventListener("mozfullscreenchange", fullScreenChangeCallback, false);
  document.addEventListener("webkitfullscreenchange", fullScreenChangeCallback, false);
  document.addEventListener("MSFullscreenChange", fullScreenChangeCallback, false);  
}

function setupFullScreenSupport() {
  requestFullscreenMethod =
       document.body.requestFullScreen ||
       document.body.webkitRequestFullScreen ||
       document.body.mozRequestFullScreen ||
       document.body.msRequestFullscreen;

  document.cancelFullscreenMethod =
       document.cancelFullScreen ||
       document.webkitCancelFullScreen ||
       document.mozCancelFullScreen ||
       document.msExitFullscreen;
}

function isFullscreen() {
  if (document.fullscreenElement||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement  ||
      document.msFullscreenElement) {
    return true;
  }
}
