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
  var MAP_BORDERS = [
    {
      height: '150px',
      bottom: '600'
    }, {
      height: '250px',
      bottom: '0'
    }
  ];
  var MAIN_PIN = {
    width: 65,
    height: 65,
    pointer: 22
  };
  var MAX_PINS_QUANTITY = 5;

  var map = document.querySelector('.map');
  var pinsList = map.querySelector('.map__pins');
  var notice = document.querySelector('.notice');
  var myNoticeForm = notice.querySelector('.notice__form');
  var formParts = notice.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');

  var mainPinPosition = null;
  var startCoords = window.mainPinCoords.calculateLocation();

  window.allArticles = [];
  window.allPinElements = [];

  window.article.renderElement(window.articleElement);
  window.articleElement.style.display = 'none';

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
  var activatePage = function () {
    if (!isActivated) {
      activateMap();
      activateForm();
      window.util.makeDisabledFormField(formParts, false);
      window.backend.load(loadHandler, window.errorHandler);
      window.map.updateLocations();
      isActivated = true;
    }
  };

  mainPin.addEventListener('mouseup', activatePage);
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keycode.enter) {
      activatePage();
    }
  });

  var removePins = function () {
    if (!window.allPinElements.length) {
      return;
    }
    for (var i = 0; i < window.allPinElements.length; i++) {
      pinsList.removeChild(window.allPinElements[i]);
    }
    window.allPinElements = [];
  };

  var describeBorderBehavior = function () {
    if (window.mainPinLocation.top <= MAP_COORDINATES.height.min - (MAIN_PIN.height / 2 + MAIN_PIN.pointer)) {
      mainPin.style.top = MAP_COORDINATES.height.min - (MAIN_PIN.height / 2 + MAIN_PIN.pointer) + 'px';
      borderElements[0].style.display = 'block';
    } else {
      borderElements[0].style.display = 'none';
    }

    if (window.mainPinLocation.top >= MAP_COORDINATES.height.max - MAIN_PIN.height / 2 - MAIN_PIN.pointer) {
      mainPin.style.top = MAP_COORDINATES.height.max - MAIN_PIN.height / 2 - MAIN_PIN.pointer + 'px';
      borderElements[1].style.display = 'block';
    } else {
      borderElements[1].style.display = 'none';
    }

    if (window.mainPinLocation.left <= MAIN_PIN.width / 2) {
      mainPin.style.left = MAIN_PIN.width / 2 + 'px';
    }

    if (window.mainPinLocation.left >= MAP_SIZE.width - MAIN_PIN.width / 2) {
      mainPin.style.left = MAP_SIZE.width - MAIN_PIN.width / 2 + 'px';
    }
  };

  var inactivateBorder = function () {
    for (var i = 0; i < borderElements.length; i++) {
      if (borderElements[i].style.display === 'block') {
        borderElements[i].style.display = 'none';
      }
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shift = {
      x: evt.pageX - window.mainPinLocation.left - window.pageXOffset - MAIN_PIN.width / 2 + window.util.getCoords(map).left,
      y: evt.pageY - window.mainPinLocation.top - window.pageYOffset - MAIN_PIN.height / 2 + window.util.getCoords(map).top
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      mainPin.style.left = (moveEvt.clientX - shift.x) + 'px';
      mainPin.style.top = (moveEvt.clientY - shift.y) + 'px';

      window.mainPinLocation = {
        left: moveEvt.clientX - shift.x,
        top: moveEvt.clientY - shift.y
      };

      describeBorderBehavior();
      window.map.updateLocations();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var loadHandler = function (articles) {
    window.allArticles = articles;
    window.map.updatePins(window.allArticles.slice(0, MAX_PINS_QUANTITY));
  };

  window.map = {
    updateLocations: updateLocations,
    updatePins: function (articles) {
      removePins();
      window.allPinElements = window.pins.createElements(articles);
      window.pins.renderElements(window.allPinElements);
    },
    inactivatePage: function () {
      myNoticeForm.reset();
      inactivateBorder();
      window.photoloader.deleteAvatarImage();
      window.photoloader.deletePhotoImage();
      map.classList.add('map--faded');
      myNoticeForm.classList.add('notice__form--disabled');
      window.util.makeDisabledFormField(formParts, true);
      mainPin.style.left = startCoords.x + 'px';
      mainPin.style.top = startCoords.y + 'px';
      window.mainPinCoords.writeLocation(startCoords.x, startCoords.y);
      removePins();
      isActivated = false;
    }
  };
})();
