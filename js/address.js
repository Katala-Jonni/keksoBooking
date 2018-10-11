'use strict';
(function () {
  var tools = window.tool;
  var address = tools.mainForm.querySelector('#address');
  var radix = 10;
  var halfMainPinWidth = tools.mainPinWidth / 2;

  var getCountAddress = function (left, top) {
    return {
      left: parseInt(left, radix) + halfMainPinWidth,
      top: parseInt(top, radix) + tools.heightMainPinLabelEnd
    };
  };
  var positionLeft = tools.mainPin.style.left;
  var positionTop = tools.mainPin.style.top;
  var positionMainPin;
  var totalAddress;

  var showAddress = function (bool) {
    if (bool) {
      tools.mainPin.style.left = positionLeft;
      tools.mainPin.style.top = positionTop;
      positionMainPin = getCountAddress(positionLeft, positionTop);
      totalAddress = positionMainPin.left + ' ' + positionMainPin.top;

    } else {
      positionMainPin = getCountAddress(tools.mainPin.style.left, tools.mainPin.style.top);
      totalAddress = positionMainPin.left + ' ' + positionMainPin.top;
    }
    address.value = totalAddress;
  };
  window.address = {
    show: showAddress
  };

})();
