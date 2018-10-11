'use strict';
(function () {
  var tools = window.tool;
  var utils = window.util;

  var tmp = document.body.querySelector('template');
  var popup = tools.template.querySelector('.modal-wrap').cloneNode(true);
  var modal = popup.querySelector('.modal');
  var modalOverlay = tools.template.querySelector('.overlay').cloneNode(true);
  var modalClose = modal.querySelector('.modal-close');
  var errorMessage = modal.querySelector('h2');

  var modalClass = {
    hidden: 'visually-hidden',
    animation: 'animationModal',
    overlay: 'modal-overlay'
  };

  var showModal = function () {
    utils.class.remove(modal, modalClass.hidden);
    utils.class.add(modal, modalClass.animation);
    utils.class.add(modalOverlay, modalClass.overlay);
  };

  var onCloseModalClick = function (evt) {
    evt.preventDefault();
    utils.class.add(modal, modalClass.hidden);
    utils.class.remove(modal, modalClass.animation);
    utils.class.remove(modalOverlay, modalClass.overlay);
  };
  var onCloseModalOverlayClick = function () {
    utils.class.add(modal, modalClass.hidden);
    utils.class.remove(modalOverlay, modalClass.overlay);
  };
  var onCloseModalOverlayKeyup = function (evt) {
    if (evt.code !== tools.esc) {
      return;
    }
    if (!modal.classList.contains(modalClass.hidden)) {
      event.preventDefault();
      utils.class.add(modal, modalClass.hidden);
      utils.class.remove(modal, modalClass.animation);
      utils.class.remove(modalOverlay, modalClass.overlay);
    }
    document.removeEventListener('keyup', onCloseModalOverlayKeyup);
  };

  var getModal = function (text) {
    errorMessage.textContent = text;
    showModal();
    modalClose.addEventListener('click', onCloseModalClick);
    modalOverlay.addEventListener('click', onCloseModalOverlayClick);
    document.addEventListener('keyup', onCloseModalOverlayKeyup);
    document.body.insertBefore(popup, tmp.nextElementSibling);
    document.body.insertBefore(modalOverlay, modal.nextElementSibling);
  };

  window.modalError = getModal;
})();
