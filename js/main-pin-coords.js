'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER = 22;
  var addressField = notice.querySelector('#address');
  var mapLocation = window.util.getCoords(map);
  var mainPinLocation = window.util.getCoords(mainPin);

  window.mainPinCoords = {
    calculateMainPinPosition: function () {
      var mainPinLocationX = Math.floor(mainPinLocation.left + MAIN_PIN_WIDTH / 2 - mapLocation.left);
      var mainPinLocationY = Math.floor(mainPinLocation.top + MAIN_PIN_HEIGHT / 2 - mapLocation.top);
      if (!map.classList.contains('map--faded')) {
        mainPinLocationY = Math.floor(mainPinLocation.top + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER - mapLocation.top);
      }
      return {
        x: mainPinLocationX,
        y: mainPinLocationY
      };
    },
    writeMainPinLocation: function (mainPinLocationX, mainPinLocationY) {
      addressField.value = mainPinLocationX + ', ' + mainPinLocationY;
    }
  };
})();
