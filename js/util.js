'use strict';

(function () {
  window.util = {
    keycode: {
      enter: 13,
      esc: 27
    },
    makeDisabledFormField: function (elements, flag) {
      [].forEach.call(elements, function (element) {
        element.disabled = flag;
      });
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
