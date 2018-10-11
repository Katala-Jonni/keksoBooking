'use strict';

(function () {
  var tools = window.tool;
  var pins = window.pin;
  var utils = window.util;
  var mapCard = window.card;

  var lowHousingPrice = 10000;
  var highHousingPrice = 50000;
  var features = document.querySelectorAll('.map__features input');
  var featuresName = 'features';
  var copyCardsPins;

  var filterContainer = document.querySelector('.map__filters');
  var filterContainerChildren = Array.from(filterContainer.children);

  var filterName = {
    'type': 'type',
    'price': 'price',
    'rooms': 'rooms',
    'guests': 'guests',
  };

  var priceValue = {
    low: 'low',
    high: 'high',
    middle: 'middle',
    any: 'any'
  };

  var getElementName = function (el) {
    return el.id.split('-').pop();
  };

  var getData = function (count, name) {
    var data = count;

    if (name === filterName['price']) {
      if (count < lowHousingPrice) {
        data = priceValue.low;
      } else if (count > highHousingPrice) {
        data = priceValue.high;
      } else {
        data = priceValue.middle;
      }
    }
    return data;
  };

  var getAnotherFilters = function (filter, el, name) {
    return filter.filter(function (card) {
      return el.value === priceValue.any ? card : '' + getData(card.offer[name], name) === el.value;
    });
  };

  var getFilterFeatures = function () {
    features.forEach(function (elements) {
      if (elements.checked) {
        copyCardsPins = copyCardsPins.filter(function (elem) {
          return elem.offer.features.indexOf(elements.value) >= 0;
        });
      }
    });
  };

  var onFilterChange = function () {
    copyCardsPins = pins.cardsForFilter.slice();
    mapCard.delete();
    pins.remove();

    filterContainerChildren.filter(function (el) {
      var elementName = getElementName(el);
      if (filterName[elementName]) {
        copyCardsPins = getAnotherFilters(copyCardsPins, el, filterName[elementName]);
      }
      if (elementName === featuresName) {
        getFilterFeatures();
      }
    });

    utils.appendElement(tools.pins, pins.create(copyCardsPins, tools.template));
  };
  filterContainer.addEventListener('change', function () {
    utils.getDebounce(onFilterChange);
  });

  var resetFilters = function () {
    filterContainerChildren.forEach(function (filter) {
      var elementName = getElementName(filter);
      if (filterName[elementName]) {
        Array.from(filter).forEach(function (item) {
          item.selected = false;
        });
      }
      if (elementName === featuresName) {
        features.forEach(function (item) {
          item.checked = false;
        });
      }
      utils.isDisabled(filterContainerChildren, true);
    });
  };

  window.filterForm = {
    reset: resetFilters,
    filterBox: filterContainerChildren
  };

})();
