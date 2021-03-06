"use strict";
window.modal = (function () {

    var btnFeedback = document.querySelector(".header__feedback");
    var overlay = document.querySelector(".overlay");
    var modal = document.querySelector(".modal");

    var showModal = function () {
      window.overlay.show();
      modal.classList.add("modal--opened");
      modal.querySelector(".modal__close").addEventListener("click", closeModal);
      document.addEventListener("keydown", onEscPress);
    };
  
    var closeModal = function () {
      modal.classList.remove("modal--opened");
      window.overlay.hide();
      modal.querySelector(".modal__close").removeEventListener("click", closeModal);
      document.removeEventListener("keydown", onEscPress);
    };

    var onEscPress = function (evt) {
      if (window.evtKeyPress.isEscPressed(evt)) {
        closeModal();
      }
    };

    btnFeedback.addEventListener("click", showModal);
    overlay.addEventListener("click", closeModal);
  
    return {
      onEscPress: onEscPress,
      showModal: showModal,
      closeModal: closeModal
    }
  
  })();
