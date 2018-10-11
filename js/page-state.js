'use strict';

(function () {
  var utils = window.util;
  var tools = window.tool;
  var mapCard = window.card;
  var pins = window.pin;
  var validateForm = window.validateForm;
  var address = window.address;
  var server = window.backend;
  var filters = window.filterForm;
  var image = window.image;

  var dataServer = {
    get: server.request
  };

  var mainForm = tools.mainForm;
  var mainFormFields = mainForm.querySelectorAll('.ad-form-header, .ad-form__element');
  var capacity = mainForm.querySelector('#capacity');
  var price = mainForm.querySelector('#price');
  var inActivePrice = price.placeholder;

  var getPins = function () {
    var onMapPinMouseUp = function () {
      isActivePage(true);
      tools.mainPin.removeEventListener('mouseup', onMapPinMouseUp);
    };
    tools.mainPin.addEventListener('mouseup', onMapPinMouseUp);
  };

  var getActivePage = function () {
    utils.class.remove(tools.map, tools.fadeClass);
    utils.class.remove(mainForm, tools.formDisabledClass);
    utils.isDisabled(mainFormFields, false);
    if (dataServer.get) {
      dataServer.get(onSuccess, onError);
      validateForm.showGuests();
      validateForm.getTypeChange();
      delete dataServer.get;
    }
  };

  var getInactivePage = function () {
    mainForm.reset();
    getPins();
    filters.reset();
    utils.class.add(tools.map, tools.fadeClass);
    utils.class.add(mainForm, tools.formDisabledClass);
    utils.isDisabled(mainFormFields, true);
    address.show(true);
    validateForm.pasteGuests(capacity);
    price.placeholder = inActivePrice;
    pins.remove();
    dataServer.get = server.request;
    image.remove();
  };

  var isActivePage = function (boolean) {
    mapCard.delete();
    var isActive = boolean || false;
    return isActive ? getActivePage() : getInactivePage();
  };

  isActivePage();

  var onError = function (errorMessage) {
    window.modalError(errorMessage);
  };

  var successMessage = function () {
    tools.success.classList.remove(tools.hiddenClass);
    var onRemoveSuccessClick = function () {
      tools.success.classList.add(tools.hiddenClass);
      document.removeEventListener('click', onRemoveSuccessClick);
    };
    var onRemoveSuccessKeyUp = function (evt) {
      if (evt.code === tools.esc) {
        tools.success.classList.add(tools.hiddenClass);
        document.removeEventListener('keyup', onRemoveSuccessKeyUp);
      }
    };
    document.addEventListener('click', onRemoveSuccessClick);
    document.addEventListener('keyup', onRemoveSuccessKeyUp);
  };

  var onSuccess = function (data, isPost) {

    if (isPost) {
      isActivePage();
      successMessage();
    } else {
      utils.appendElement(tools.pins, pins.create(data, tools.template));
      utils.isDisabled(filters.filterBox, false);
    }
  };

  window.pageState = {
    isActive: isActivePage,
    getError: onError,
    getSuccess: onSuccess,
  };

})();
