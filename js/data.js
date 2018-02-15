'use strict';

(function () {
  var ARTICLE_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ARTICLE_TYPES = [
    {
      en: 'flat',
      rus: 'Квартира'
    },
    {
      en: 'house',
      rus: 'Дом'
    },
    {
      en: 'bungalo',
      rus: 'Бунгало'
    }
  ];
  var ARTICLE_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var ARTICLE_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var ARTICLE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ARTICLE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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

  window.data = function (quantity) {
    var articles = [];
    for (var i = 0; i < quantity; i++) {
      var articleLocationX = window.util.calculateRandomInteger(MAP_COORDINATES.width.min, MAP_COORDINATES.width.max);
      var articleLocationY = window.util.calculateRandomInteger(MAP_COORDINATES.height.min, MAP_COORDINATES.height.max);

      articles[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.util.getRandomElement(ARTICLE_TITLES),
          address: articleLocationX + ', ' + articleLocationY,
          price: window.util.calculateRandomInteger(1000, 1000000),
          type: window.util.getRandomElement(ARTICLE_TYPES),
          rooms: window.util.calculateRandomInteger(1, 5),
          guests: window.util.calculateRandomInteger(1, 100),
          checkin: window.util.getRandomElement(ARTICLE_CHECKIN_TIMES),
          checkout: window.util.getRandomElement(ARTICLE_CHECKOUT_TIMES),
          features: ARTICLE_FEATURES.filter(function () {
            return window.util.calculateRandomInteger(0, 1);
          }),
          description: '',
          photos: ARTICLE_PHOTOS
        },
        location: {
          x: articleLocationX,
          y: articleLocationY
        }
      };
    }
    return articles;
  };
})();
