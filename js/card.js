'use strict';

(function () {
  var utils = window.util;
  var tools = window.tool;

  var mapFiltersContainer = tools.map.querySelector('.map__filters-container');
  var templateCard = tools.template.querySelector('.map__card');
  var currentCard = null;

  var typeHouse = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var getMapCard = function (card) {
    var cardClone = templateCard.cloneNode(true);
    cardClone.querySelector('.popup__avatar').src = card.author.avatar;
    cardClone.querySelector('.popup__title').textContent = card.offer.title;
    cardClone.querySelector('.popup__text--address').textContent = card.offer.address;
    cardClone.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardClone.querySelector('.popup__type').textContent = typeHouse[card.offer.type];
    cardClone.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardClone.querySelector('.popup__text--time').textContent = 'Заезд после  ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
    var features = cardClone.querySelector('.popup__features');
    features.innerHTML = '';
    card.offer.features.forEach(function (elem) {
      var className = 'popup__feature--' + elem + '';
      var item = document.createElement('li');
      item.classList.add('popup__feature', className);
      utils.appendElement(features, item);
    });
    cardClone.querySelector('.popup__description').textContent = card.offer.description;
    var photoBox = cardClone.querySelector('.popup__photos');
    var img = photoBox.querySelector('img');
    photoBox.innerHTML = '';
    card.offer.photos.forEach(function (photo) {
      var photoClone = img.cloneNode(true);
      photoClone.src = photo;
      utils.appendElement(photoBox, photoClone);
    });
    cardClone.querySelector('.popup__close').addEventListener('click', function () {
      deleteCard();
    });
    document.addEventListener('keyup', onCloseCardKeyUp);
    return cardClone;
  };

  var deleteCard = function () {
    if (currentCard) {
      currentCard.remove();
    }
  };

  var onCloseCardKeyUp = function (evt) {
    if (evt.code === tools.esc) {
      deleteCard();
      document.removeEventListener('keyup', onCloseCardKeyUp);
    }
  };

  var showCard = function (card) {
    deleteCard();
    currentCard = getMapCard(card);
    utils.insertElement(tools.map, currentCard, mapFiltersContainer);
  };

  window.card = {
    show: showCard,
    delete: deleteCard,
    houseType: typeHouse
  };

})();
