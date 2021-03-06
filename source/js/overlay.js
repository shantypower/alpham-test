"use strict";
// * Модуль управляет слоем наложения

window.overlay = (function () {
  var overlay = document.querySelector(".overlay");

  var showOverlay = function () {
    overlay.classList.add("overlay--visible");
  };

  var hideOverlay = function () {
    overlay.classList.remove("overlay--visible");
  };

  return {
    show: showOverlay,
    hide: hideOverlay
  };
})();
