'use strict';

(function () {
  var utils = window.util;
  var mapCard = window.card;
  var renderedPins = [];
  var filterCards = [];
  var TOTAL_PIN = 5;

  var createPins = function (cards, tmp) {
    var templatePins = tmp.querySelector('.map__pin');
    var box = document.createDocumentFragment();
    cards.forEach(function (card, idx) {
      if (idx >= TOTAL_PIN) {
        return;
      }
      var pin = templatePins.cloneNode(true);
      pin.style.left = card.location.x + 'px';
      pin.style.top = card.location.y + 'px';
      var pinImg = pin.querySelector('img');
      pinImg.src = card.author.avatar;
      pinImg.alt = card.offer.title;
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        mapCard.show(card);
      });
      utils.appendElement(box, pin);
      filterCards.push(card);
      renderedPins.push(pin);
    });
    filterCards = [];
    return box;
  };
  var removePins = function () {
    renderedPins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    create: createPins,
    remove: removePins,
    cardsForFilter: filterCards,
    totalPins: renderedPins
  };

})();
