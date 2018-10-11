'use strict';

(function () {
  var TIMEOUT = 10000;
  var SUCCESS = 200;
  var URL = {
    'GET': 'https://js.dump.academy/keksobooking/data',
    'POST': 'https://js.dump.academy/keksobooking'
  };
  var getServer = function (successHandler, errorHandler, method, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    var information = data || '';
    var request = method || 'GET';

    var onLoadData = function () {
      if (xhr.status === SUCCESS) {
        successHandler(xhr.response, request === 'POST');
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
    var onTimeOutData = function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };
    var onErrorData = function () {
      errorHandler('Произошла ошибка соединения');
    };

    xhr.addEventListener('load', onLoadData);
    xhr.addEventListener('error', onErrorData);
    xhr.addEventListener('timeout', onTimeOutData);

    xhr.open(request, URL[request]);
    xhr.send(information);
  };

  window.backend = {
    request: getServer
  };
})();
