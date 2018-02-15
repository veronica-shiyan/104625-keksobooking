'use strict';

(function () {
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
