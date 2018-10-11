'use strict';

(function () {
  var utils = window.util;
  var tools = window.tool;
  var mainForm = tools.mainForm;
  var roomNumber = mainForm.querySelector('#room_number');
  var capacity = mainForm.querySelector('#capacity');

  var houseTypes = mainForm.querySelector('#type');
  var price = mainForm.querySelector('#price');
  var maxCountRooms = 100;
  var zeroValue = 0;

  var minimalPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var onTimeChange = function (evt) {
    var timeIn = mainForm.querySelector('#timein');
    var timeOut = mainForm.querySelector('#timeout');

    if (evt.target === timeIn) {
      timeOut.value = evt.target.value;
    } else if (evt.target === timeOut) {
      timeIn.value = evt.target.value;
    }
  };

  mainForm.querySelectorAll('.ad-form__element--time select').forEach(function (el) {
    el.addEventListener('change', onTimeChange);
  });

  var getAllGuests = function (cloneCapacity) {
    var options = cloneCapacity.querySelectorAll('option');
    return Array.from(options).filter(function (el) {
      return el;
    });
  };

  var getTotalGuest = function (guests, countRooms) {
    var filter = guests.filter(function (el) {
      if (+countRooms.value === maxCountRooms) {
        if (+el.value === zeroValue) {
          return el;
        }
      } else {
        if (+el.value <= +countRooms.value && +el.value !== zeroValue) {
          return el;
        }
      }
      return '';
    });

    var box = filter.reduce(function (fragment, el) {
      fragment.appendChild(el);
      return fragment;
    }, document.createDocumentFragment());

    return box;
  };

  var pasteCountGuests = function (capacityVariable) {
    var parent = mainForm.querySelector('label[for="capacity"]').parentElement;
    parent.querySelector('#capacity').remove();
    utils.appendElement(parent, capacityVariable);
  };

  var showCountGuests = function (evt) {
    var targetElement = evt || roomNumber;
    var cloneCapacity = capacity.cloneNode(true);
    var copyAllGuests = getAllGuests(cloneCapacity);
    cloneCapacity.innerHTML = '';
    var totalGuests = getTotalGuest(copyAllGuests, targetElement);
    cloneCapacity.appendChild(totalGuests);
    pasteCountGuests(cloneCapacity);
  };

  var onGuestChange = function (evt) {
    showCountGuests(evt.target);
  };
  roomNumber.addEventListener('change', onGuestChange);

  var onTypeChange = function (evt) {
    var targetPrice = evt || houseTypes;
    price.placeholder = minimalPrice[targetPrice.value];
  };

  houseTypes.addEventListener('change', function (evt) {
    onTypeChange(evt.target);
  });

  window.validateForm = {
    showGuests: showCountGuests,
    getTypeChange: onTypeChange,
    pasteGuests: pasteCountGuests,
    defaultPriceHouse: minimalPrice
  };

})();
