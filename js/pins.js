'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var copyExample = document.querySelector('template').content;
  var cloneMapPin = copyExample.querySelector('.map__pin');
  var pastMapPin = document.querySelector('.map__pins');

  var initPinHandlers = function (pinElement, article) {
    pinElement.addEventListener('click', function () {
      window.article.createElement(article);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.keycode.enter) {
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

    renderElements: function (data) {
      var fragmentPin = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        fragmentPin.appendChild(data[i]);
      }
      pastMapPin.appendChild(fragmentPin);
    }
  };
})();
