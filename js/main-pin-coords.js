'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER = 22;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var addressField = notice.querySelector('#address');

  window.mainPinCoords = {
    calculateLocation: function () {
      window.mainPinLocation = window.util.getCoords(mainPin);
      var mapLocation = window.util.getCoords(map);
      var mainPinLocationX = Math.floor(window.mainPinLocation.left + MAIN_PIN_WIDTH / 2 - mapLocation.left);
      var mainPinLocationY = Math.floor(window.mainPinLocation.top + MAIN_PIN_HEIGHT / 2 - mapLocation.top);
      if (!map.classList.contains('map--faded')) {
        mainPinLocationY = Math.floor(window.mainPinLocation.top + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER - mapLocation.top);
      }
      return {
        x: mainPinLocationX,
        y: mainPinLocationY
      };
    },
    writeLocation: function (mainPinLocationX, mainPinLocationY) {
      addressField.value = mainPinLocationX + ', ' + mainPinLocationY;
    }
  };
})();
