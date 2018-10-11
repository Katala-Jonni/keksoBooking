'use strict';
(function () {
  var tools = window.tool;
  var address = window.address;
  var mapCard = window.card;
  var statePage = window.pageState;


  var getDrop = function () {

    var minX = tools.pins.offsetLeft;
    var minY = 130 - tools.heightMainPinLabelEnd;

    var maxX;
    var maxY = 630 - tools.heightMainPinLabelEnd;

    var onMapPinMouseDown = function (event) {
      event.preventDefault();

      var startCoords = {
        x: event.clientX,
        y: event.clientY
      };

      maxX = minX + tools.pins.offsetWidth - tools.mainPin.offsetWidth;

      var onMapPinMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        statePage.isActive(true);

        var shift = {
          x: moveEvt.clientX - startCoords.x,
          y: moveEvt.clientY - startCoords.y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var x = tools.mainPin.offsetLeft + shift.x;
        var y = tools.mainPin.offsetTop + shift.y;

        x = Math.min(x, maxX);
        y = Math.min(y, maxY);

        x = Math.max(x, minX);
        y = Math.max(y, minY);

        tools.mainPin.style.left = x + 'px';
        tools.mainPin.style.top = y + 'px';

        mapCard.delete();
        address.show();

      };

      var onMapPinDropMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMapPinMouseMove);
        document.removeEventListener('mouseup', onMapPinDropMouseUp);
      };

      document.addEventListener('mousemove', onMapPinMouseMove);
      document.addEventListener('mouseup', onMapPinDropMouseUp);
    };
    tools.mainPin.addEventListener('mousedown', onMapPinMouseDown);
  };

  getDrop();

})();
