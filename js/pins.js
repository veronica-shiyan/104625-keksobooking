'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;
  var copyExample = document.querySelector('template').content;
  var cloneMapPin = copyExample.querySelector('.map__pin');
  var pastMapPin = document.querySelector('.map__pins');

  var initPinHandlers = function (pinElement, article) {
    pinElement.addEventListener('click', function () {
      window.article.createElement(article);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.articleElement.style.display = 'block';
      }
    });
  };

  window.pins = {
    createElements: function (articles) {
      var pinElements = [];
      for (var i = 0; i < articles.length; i++) {
        var pinElement = cloneMapPin.cloneNode(true);

        pinElement.style.left = articles[i].location.x - PIN_WIDTH / 2 + 'px';
        pinElement.style.top = articles[i].location.y - PIN_HEIGHT + 'px';
        pinElement.children[0].src = articles[i].author.avatar;

        pinElements[i] = pinElement;

        initPinHandlers(pinElement, articles[i]);

      }
      return pinElements;
    },

    renderElements: function (pinElements) {
      var fragmentPin = document.createDocumentFragment();

      for (var i = 0; i < pinElements.length; i++) {
        fragmentPin.appendChild(pinElements[i]);
      }
      pastMapPin.appendChild(fragmentPin);
    }
  };
})();
