'use strict';

(function () {
  var map = document.querySelector('.map');
  var copyExample = document.querySelector('template').content;
  var cloneArticle = copyExample.querySelector('.map__card');
  var pastArticle = document.querySelector('.map__filters-container');

  window.article = {
    createElement: function (article) {
      var articleElement = cloneArticle.cloneNode(true);

      articleElement.querySelector('h3').textContent = article.offer.title;
      articleElement.querySelector('h3 + p').textContent = article.offer.address;
      articleElement.querySelector('.popup__price').textContent = article.offer.price + ' ' + '\u20BD/ночь';
      articleElement.querySelector('h4').textContent = article.offer.type.rus;
      articleElement.querySelector('h4 + p').textContent = article.offer.rooms + ' комнаты для ' + article.offer.guests + ' гостей';
      articleElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + article.offer.checkin + ', выезд до ' + article.offer.checkout;

      var features = articleElement.querySelector('.popup__features');
      while (features.lastChild) {
        features.removeChild(features.lastChild);
      }

      for (i = 0; i < article.offer.features.length; i++) {
        var featuresElement = document.createElement('li');
        featuresElement.className = 'feature feature--' + article.offer.features[i];
        features.appendChild(featuresElement);
      }

      articleElement.querySelector('.popup__features + p').textContent = article.offer.description;

      var photoList = articleElement.querySelector('.popup__pictures');
      for (var i = 0; i < article.offer.photos.length; i++) {
        var photoElement = photoList.querySelector('li').cloneNode(true);
        photoList.appendChild(photoElement);

        photoElement.querySelector('img').style.width = '50px';
        photoElement.querySelector('img').style.height = '50px';
        photoElement.querySelector('img').src = article.offer.photos[i];
      }

      articleElement.querySelector('.popup__avatar').src = article.author.avatar;

      return articleElement;
    },
    renderElement: function (articleElement) {
      map.insertBefore(articleElement, pastArticle);
    }
  };
})();
