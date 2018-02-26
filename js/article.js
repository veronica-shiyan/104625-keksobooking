'use strict';

(function () {
  var map = document.querySelector('.map');
  var copyExample = document.querySelector('template').content;
  var cloneArticle = copyExample.querySelector('.map__card');
  var pastArticle = document.querySelector('.map__filters-container');
  window.articleElement = cloneArticle.cloneNode(true);
  var closeElement = window.articleElement.querySelector('.popup__close');

  var closePopup = function () {
    window.articleElement.style.display = 'none';
  };

  closeElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keycode.enter) {
      closePopup();
    }
  });

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.keycode.esc) {
      closePopup();
    }
  };

  closeElement.addEventListener('click', closePopup);
  document.addEventListener('keydown', popupEscPressHandler);

  window.article = {
    createElement: function (articles) {

      window.articleElement.querySelector('h3').textContent = articles.offer.title;
      window.articleElement.querySelector('h3 + p').textContent = articles.offer.address;
      window.articleElement.querySelector('.popup__price').textContent = articles.offer.price + ' ' + '\u20BD/ночь';
      window.articleElement.querySelector('h4').textContent = articles.offer.type.rus;
      window.articleElement.querySelector('h4 + p').textContent = articles.offer.rooms + ' комнаты для ' + articles.offer.guests + ' гостей';
      window.articleElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + articles.offer.checkin + ', выезд до ' + articles.offer.checkout;

      var features = window.articleElement.querySelector('.popup__features');
      while (features.lastChild) {
        features.removeChild(features.lastChild);
      }

      for (i = 0; i < articles.offer.features.length; i++) {
        var featuresElement = document.createElement('li');
        featuresElement.className = 'feature feature--' + articles.offer.features[i];
        features.appendChild(featuresElement);
      }

      window.articleElement.querySelector('.popup__features + p').textContent = articles.offer.description;

      var photoList = window.articleElement.querySelector('.popup__pictures');
      while (photoList.lastElementChild) {
        photoList.removeChild(photoList.lastElementChild);
      }

      for (var i = 0; i < articles.offer.photos.length; i++) {
        var photoElement = document.createElement('img');
        var photoContainer = document.createElement('li');
        photoContainer.appendChild(photoElement);

        photoElement.style.width = '50px';
        photoElement.style.height = '50px';
        photoElement.src = articles.offer.photos[i];

        photoList.appendChild(photoContainer);
      }

      window.articleElement.querySelector('.popup__avatar').src = articles.author.avatar;
      window.articleElement.style.display = 'block';
      return window.articleElement;
    },
    renderElement: function () {
      map.insertBefore(window.articleElement, pastArticle);
    }
  };
})();

