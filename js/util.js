'use strict';

(function () {
  var lastTimeout;
  var timeInterval = 500;

  var addClass = function (element, elClass) {
    element.classList.add(elClass);
  };

  var getDisabled = function (elem, bool) {
    elem.forEach(function (el) {
      el.disabled = bool;
    });
  };

  var removeClass = function (element, elClass) {
    element.classList.remove(elClass);
  };

  var appendChild = function (box, element) {
    box.appendChild(element);
  };

  var insertBefore = function (box, element, beforeElement) {
    box.insertBefore(element, beforeElement);
  };

  var debounce = function (action) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(action, timeInterval);
  };

  window.util = {
    class: {
      add: addClass,
      remove: removeClass
    },
    isDisabled: getDisabled,
    appendElement: appendChild,
    insertElement: insertBefore,
    getDebounce: debounce
  };
})();
