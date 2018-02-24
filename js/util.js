'use strict';

(function () {
  window.util = {
    keycode: {
      enter: 13,
      esc: 27
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
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
      };
    }
  };
})();
