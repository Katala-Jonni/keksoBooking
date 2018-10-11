'use strict';

(function () {

  var tmp = document.querySelector('template').content;
  var mapSection = document.querySelector('.map');
  var pinsWrapper = mapSection.querySelector('.map__pins');
  var mainPointerPin = pinsWrapper.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var boundsMainPointerPin = mainPointerPin.getBoundingClientRect();
  var successElement = document.querySelector('.success');
  var imagesFiles = noticeForm.querySelectorAll('input[type="file"]');

  window.tool = {
    template: tmp,
    map: mapSection,
    pins: pinsWrapper,
    mainPin: mainPointerPin,
    mainForm: noticeForm,
    boundsMainPin: boundsMainPointerPin,
    mainPinWidth: boundsMainPointerPin.width,
    mainPinHeight: boundsMainPointerPin.height,
    heightMainPinLabelEnd: 5,
    esc: 'Escape',
    success: successElement,
    fadeClass: 'map--faded',
    hiddenClass: 'hidden',
    files: imagesFiles,
    formDisabledClass: 'ad-form--disabled',
    boxFotoClass: 'ad-form__photo'
  };
})();
