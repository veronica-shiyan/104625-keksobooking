'use strict';

(function () {
  var MAP_COORDINATES = {
    width: {
      min: 300,
      max: 900
    },
    height: {
      min: 150,
      max: 500
    }
  };
  var MAP_SIZE = {
    width: 1200,
    height: 750
  };
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER = 22;
  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  var myNoticeForm = notice.querySelector('.notice__form');
  var formParts = notice.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');
  var ARTICLE_QUANTITY = 8;
  var articles = window.data(ARTICLE_QUANTITY);
  var pinElements = window.pins.createElements(articles);

  window.util.makeDisabledFormField(formParts, true);

  var mainPinPosition = window.mainPinCoords.calculateLocation();
  window.mainPinCoords.writeLocation(mainPinPosition.x, mainPinPosition.y);

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var activateForm = function () {
    myNoticeForm.classList.remove('notice__form--disabled');
  };

  mainPin.addEventListener('mouseup', function () {
    activateMap();
    activateForm();
    window.util.makeDisabledFormField(formParts, false);
    window.pins.renderElements(pinElements);
    mainPinPosition = window.mainPinCoords.calculateLocation();
    window.mainPinCoords.writeLocation(mainPinPosition.x, mainPinPosition.y);
  });

  var border = {
    top: {
      height: '150px',
      bottom: '600'
    },
    bottom: {
      height: '250px',
      bottom: '0'
    }
  };

  var createBorder = function (borderData) {
    var element = document.createElement('div');
    element.classList.add('border');
    element.style.position = 'absolute';
    element.style.bottom = borderData.bottom;
    element.style.width = '100%';
    element.style.height = borderData.height;
    element.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';

    return element;
  };
  var topBorder = createBorder(border.top);
  var bottomBorder = createBorder(border.bottom);
  var beforeMapChild = map.querySelector('.map__pins');

  var describeBorderBehavior = function () {
    if (window.mainPinLocation.top <= MAP_COORDINATES.height.min) {
      mainPin.style.top = MAP_COORDINATES.height.min + 'px';
      map.insertBefore(topBorder, beforeMapChild);
    } else if (window.mainPinLocation.top >= MAP_COORDINATES.height.max - MAIN_PIN_HEIGHT / 2 - MAIN_PIN_POINTER) {
      mainPin.style.top = MAP_COORDINATES.height.max - MAIN_PIN_HEIGHT / 2 - MAIN_PIN_POINTER + 'px';
      map.appendChild(bottomBorder);
    } else if (window.mainPinLocation.left <= MAIN_PIN_WIDTH / 2) {
      mainPin.style.left = MAIN_PIN_WIDTH / 2 + 'px';
    } else if (window.mainPinLocation.left >= MAP_SIZE.width - MAIN_PIN_WIDTH / 2) {
      mainPin.style.left = MAP_SIZE.width - MAIN_PIN_WIDTH / 2 + 'px';
    } else if (MAP_COORDINATES.height.min < mainPin.style.top < MAP_COORDINATES.height.max - MAIN_PIN_HEIGHT / 2 - MAIN_PIN_POINTER) {
      if (map.firstElementChild.className === 'border') {
        map.removeChild(topBorder);
      }
      if (map.lastElementChild.className === 'border') {
        map.removeChild(bottomBorder);
      }
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      window.mainPinLocation = {
        left: mainPin.offsetLeft - shift.x,
        top: mainPin.offsetTop - shift.y
      };

      describeBorderBehavior();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPinPosition = window.mainPinCoords.calculateLocation();
  window.mainPinCoords.writeLocation(mainPinPosition.x, mainPinPosition.y);


  var removeDisplayedArticle = function () {
    var displayedArticle = map.querySelector('.map__card');
    if (displayedArticle) {
      map.removeChild(displayedArticle);
    }
  };

  var closePopupHandler = function (articleElement) {
    var closeElement = articleElement.querySelector('.popup__close');
    closeElement.addEventListener('mouseup', function () {
      removeDisplayedArticle();
    });
  };

  var pinOpenHandler = function (pinElement, article) {
    pinElement.addEventListener('mouseup', function () {
      removeDisplayedArticle();
      var articleElement = window.article.createElement(article);
      closePopupHandler(articleElement);
      window.article.renderElement(articleElement);
    });
  };

  var pinOpenHandlers = function () {
    for (var i = 0; i < pinElements.length; i++) {
      pinOpenHandler(pinElements[i], articles[i]);
    }
  };

  pinOpenHandlers();
})();
