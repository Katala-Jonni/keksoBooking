'use strict';
(function () {
  var tools = window.tool;
  var utils = window.util;
  var mapCard = window.card;
  var statePage = window.pageState;
  var validateForm = window.validateForm;
  var server = window.backend;
  var requestMethod = 'POST';
  var MIN_LENGTH = 30;
  var MAX_PRICE = 1000000;

  var invalidClass = 'requirements';

  var validateTitlePrice = true;

  var fieldName = {
    'title': 'title',
    'price': 'price',
    'type': 'type'
  };

  var createInvalidElement = function () {
    var element = document.createElement('p');
    element.classList.add(invalidClass, tools.hiddenClass);
    return element;
  };

  var element = createInvalidElement();

  var showLengthError = function () {
    return '* Минимальное количество символов ' + MIN_LENGTH;
  };

  var showErrorPrice = function (max) {
    var price = '* Минимальная цена для типа жилья ' + mapCard.houseType[fieldName.type.value] + ' составляет ' + fieldName.price.placeholder + ' руб';
    if (max) {
      price = '* Цена не должна превышать ' + MAX_PRICE + ' руб.';
    }
    return price;
  };

  var showInvalidNumber = function () {
    return 'Поле Цена должно быть числом';
  };

  var errorMessage = {
    minLength: showLengthError,
    minPrice: showErrorPrice,
    priceType: showInvalidNumber
  };


  var showError = function (field, callError, boolMaxPrice) {
    validateTitlePrice = false;
    utils.class.remove(element, tools.hiddenClass);
    element.textContent = callError(boolMaxPrice);
    utils.appendElement(field.parentElement, element);
  };

  Array.from(tools.mainForm.elements).forEach(function (el) {
    if (fieldName[el.name]) {
      fieldName[el.name] = el;
    }
  });

  var getValidData = function () {
    return {
      minLength: !(fieldName.title.value.length < MIN_LENGTH),
      minPrice: !(+fieldName.price.value < validateForm.defaultPriceHouse[fieldName.type.value]),
      maxPrice: (+fieldName.price.value < MAX_PRICE),
      priceType: !(isNaN(+fieldName.price.value)) && (typeof +fieldName.price.value === 'number')
    };
  };

  var onItemBlur = function (evt) {
    validation();
    element.remove();
    evt.target.removeEventListener('blur', onItemBlur);
    getFocusEvent();
  };

  var getFocusEvent = function () {
    for (var key in fieldName) {
      if (key !== 'type') {
        fieldName[key].addEventListener('blur', onItemBlur);
      }
    }
  };
  getFocusEvent();

  var validation = function () {
    var isValidData = getValidData();
    if (!isValidData.minLength) {
      showError(fieldName.title, errorMessage.minLength);
    } else if (!isValidData.minPrice) {
      showError(fieldName.price, errorMessage.minPrice);
    } else if (!isValidData.priceType) {
      showError(fieldName.price, errorMessage.priceType);
    } else if (!isValidData.maxPrice) {
      showError(fieldName.price, errorMessage.minPrice, true);
    } else {
      validateTitlePrice = true;
      element.remove();
    }
  };

  tools.mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validation();
    if (validateTitlePrice) {
      server.request(statePage.getSuccess, statePage.getError, requestMethod, new FormData(tools.mainForm));
    }
  });

  tools.mainForm.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    element.remove();
    statePage.isActive();
  });

})();
