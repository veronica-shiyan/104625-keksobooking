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
  var MAP_BORDERS = [{
    height: '150px',
    bottom: '600'
  }, {
    height: '250px',
    bottom: '0'
  }];
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
  var mainPinPosition = null;

  window.util.makeDisabledFormField(formParts, true);

  var updateLocations = function () {
    mainPinPosition = window.mainPinCoords.calculateLocation();
    window.mainPinCoords.writeLocation(mainPinPosition.x, mainPinPosition.y);
  };
  updateLocations();

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var activateForm = function () {
    myNoticeForm.classList.remove('notice__form--disabled');
  };

  var initBorders = function (bordersData) {
    var beforeMapChild = map.querySelector('.map__pins');

    return bordersData.map(function (borderData) {
      var element = document.createElement('div');
      element.classList.add('border');
      element.style.position = 'absolute';
      element.style.bottom = borderData.bottom;
      element.style.width = '100%';
      element.style.height = borderData.height;
      element.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
      element.style.display = 'none';
      map.insertBefore(element, beforeMapChild);

      return element;
    });
  };
  var borderElements = initBorders(MAP_BORDERS);

  var isActivated = false;
  mainPin.addEventListener('mouseup', function () {
    if (!isActivated) {
      activateMap();
      activateForm();
      window.util.makeDisabledFormField(formParts, false);
      window.pins.renderElements(pinElements);
      updateLocations();
      isActivated = true;
    }
  });


  var describeBorderBehavior = function () {
    if (window.mainPinLocation.top <= MAP_COORDINATES.height.min - (MAIN_PIN_HEIGHT / 2 + MAIN_PIN_POINTER)) {
      mainPin.style.top = MAP_COORDINATES.height.min - (MAIN_PIN_HEIGHT / 2 + MAIN_PIN_POINTER) + 'px';
      borderElements[0].style.display = 'block';
    } else {
      borderElements[0].style.display = 'none';
    }

    if (window.mainPinLocation.top >= MAP_COORDINATES.height.max - MAIN_PIN_HEIGHT / 2 - MAIN_PIN_POINTER) {
      mainPin.style.top = MAP_COORDINATES.height.max - MAIN_PIN_HEIGHT / 2 - MAIN_PIN_POINTER + 'px';
      borderElements[1].style.display = 'block';
    } else {
      borderElements[1].style.display = 'none';
    }

    if (window.mainPinLocation.left <= MAIN_PIN_WIDTH / 2) {
      mainPin.style.left = MAIN_PIN_WIDTH / 2 + 'px';
    }

    if (window.mainPinLocation.left >= MAP_SIZE.width - MAIN_PIN_WIDTH / 2) {
      mainPin.style.left = MAP_SIZE.width - MAIN_PIN_WIDTH / 2 + 'px';
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shift = {
      x: evt.pageX - window.mainPinLocation.left - window.pageXOffset - MAIN_PIN_WIDTH / 2 + window.util.getCoords(map).left,
      y: evt.pageY - window.mainPinLocation.top - window.pageYOffset - MAIN_PIN_HEIGHT / 2 + window.util.getCoords(map).top
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      mainPin.style.left = (moveEvt.clientX - shift.x) + 'px';
      mainPin.style.top = (moveEvt.clientY - shift.y) + 'px';

      window.mainPinLocation = {
        left: moveEvt.clientX - shift.x,
        top: moveEvt.clientY - shift.y
      };

      describeBorderBehavior();
      updateLocations();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


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
