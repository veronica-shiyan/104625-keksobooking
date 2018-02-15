'use strict';

(function () {
  window.util = {
    calculateRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },
    getRandomElement: function (elements) {
      return elements[Math.floor(Math.random() * elements.length)];
    },
    makeDisabledFormField: function (elements, flag) {
      for (var i = 0; i < elements.length; i++) {
        if (flag) {
          elements[i].setAttribute('disabled', 'disabled');
        } else {
          elements[i].removeAttribute('disabled');
        }
      }
    },
    getCoords: function (element) {
      var box = element.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };
})();
