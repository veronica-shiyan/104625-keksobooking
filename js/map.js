'use strict';

// Создаем массивы данных
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
var ARTICLE_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// Функция расчета случайного числа в заданом диапазоне
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Функция создания массива объектов (функция генерации случайных данных)
var createArticleData = function (quantity) {
  var articles = [];
  for (var i = 0; i < quantity; i++) {
    var articleLocationX = randomInteger(300, 900);
    var articleLocationY = randomInteger(150, 500);

    articles[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: ARTICLE_TITLES[Math.floor(Math.random() * ARTICLE_TITLES.length)].en,
        address: articleLocationX + ', ' + articleLocationY,
        price: randomInteger(1000, 1000000),
        type: ARTICLE_TYPES[Math.floor(Math.random() * ARTICLE_TYPES.length)],
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 100),
        checkin: ARTICLE_CHECKIN_TIMES[Math.floor(Math.random() * ARTICLE_CHECKIN_TIMES.length)],
        checkout: ARTICLE_CHECKOUT_TIMES[Math.floor(Math.random() * ARTICLE_CHECKOUT_TIMES.length)],
        features: ARTICLE_FEATURES.filter(function () {
          return randomInteger(0, 1);
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

// Активируем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

//
var cloneMapPin = document.querySelector('template').content;
cloneMapPin = cloneMapPin.querySelector('.map__pin');
var pastMapPin = document.querySelector('.map__pins');

var cloneArticle = document.querySelector('template').content;
cloneArticle = cloneArticle.querySelector('.map__card');
var pastArticle = document.querySelector('.map__filters-container');

// Функция создания DOM-элемента на основе JS-объекта
var createPinElements = function (articles) {
  var pinElements = [];
  for (var i = 0; i < articles.length; i++) {
    var pinElement = cloneMapPin.cloneNode(true);

    pinElement.style.left = articles[i].location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = articles[i].location.y - PIN_HEIGHT + 'px';
    pinElement.children[0].src = articles[i].author.avatar;

    pinElements[i] = pinElement;
  }
  return pinElements;
};

var createArticleElement = function (article) {
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
  for (var i = 0; i < 3; i++) {
    var photoElement = photoList.querySelector('li').cloneNode(true);
    photoList.appendChild(photoElement);

    photoElement.querySelector('img').style.width = '50px';
    photoElement.querySelector('img').style.height = '50px';
    photoElement.querySelector('img').src = article.offer.photos[i];
  }

  articleElement.querySelector('.popup__avatar').src = article.author.avatar;

  return articleElement;
};

// функцию заполнения блока DOM-элементами на основе массива JS-объектов
var renderArticle = function (articleElement) {
  var fragmentArticle = document.createDocumentFragment();
  fragmentArticle.appendChild(articleElement);

  map.insertBefore(fragmentArticle, pastArticle);
};

var renderPin = function (pinElements) {
  var fragmentPin = document.createDocumentFragment();

  for (var i = 0; i < pinElements.length; i++) {
    fragmentPin.appendChild(pinElements[i]);
  }
  pastMapPin.appendChild(fragmentPin);
};

// Вызовы функций
var articles = createArticleData(ARTICLE_QUANTITY);
var articleElement = createArticleElement(articles[0]);
renderArticle(articleElement);

var pinElements = createPinElements(articles);
renderPin(pinElements);
