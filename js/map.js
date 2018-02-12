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

var map = document.querySelector('.map');

// Функция расчета случайного числа в заданом диапазоне
function calculateRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Функция создания массива объектов (функция генерации случайных данных)
var createArticleData = function (quantity) {
  var articles = [];
  for (var i = 0; i < quantity; i++) {
    var articleLocationX = calculateRandomInteger(MAP_COORDINATES.width.min, MAP_COORDINATES.width.max);
    var articleLocationY = calculateRandomInteger(MAP_COORDINATES.height.min, MAP_COORDINATES.height.max);

    articles[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: ARTICLE_TITLES[Math.floor(Math.random() * ARTICLE_TITLES.length)].en,
        address: articleLocationX + ', ' + articleLocationY,
        price: calculateRandomInteger(1000, 1000000),
        type: ARTICLE_TYPES[Math.floor(Math.random() * ARTICLE_TYPES.length)],
        rooms: calculateRandomInteger(1, 5),
        guests: calculateRandomInteger(1, 100),
        checkin: ARTICLE_CHECKIN_TIMES[Math.floor(Math.random() * ARTICLE_CHECKIN_TIMES.length)],
        checkout: ARTICLE_CHECKOUT_TIMES[Math.floor(Math.random() * ARTICLE_CHECKOUT_TIMES.length)],
        features: ARTICLE_FEATURES.filter(function () {
          return calculateRandomInteger(0, 1);
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

//
var copyExample = document.querySelector('template').content;
var cloneMapPin = copyExample.querySelector('.map__pin');
var pastMapPin = document.querySelector('.map__pins');

var cloneArticle = copyExample.querySelector('.map__card');
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
  for (var i = 0; i < article.offer.photos.length; i++) {
    var photoElement = photoList.querySelector('li').cloneNode(true);
    photoList.appendChild(photoElement);

    photoElement.querySelector('img').style.width = '50px';
    photoElement.querySelector('img').style.height = '50px';
    photoElement.querySelector('img').src = article.offer.photos[i];
  }

  articleElement.querySelector('.popup__avatar').src = article.author.avatar;

  return articleElement;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
var renderArticle = function (articleElement) {
  map.insertBefore(articleElement, pastArticle);
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
var pinElements = createPinElements(articles);

// Активация страницы

var notice = document.querySelector('.notice');
var myNoticeForm = notice.querySelector('.notice__form');
var formParts = notice.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');

var makeDisabledFormField = function (flag) {
  for (var i = 0; i < formParts.length; i++) {
    if (flag) {
      formParts[i].setAttribute('disabled', 'disabled');
    } else {
      formParts[i].removeAttribute('disabled');
    }
  }
};

makeDisabledFormField(true);

var activateMap = function () {
  map.classList.remove('map--faded');
};

var activateForm = function () {
  myNoticeForm.classList.remove('notice__form--disabled');
};

mainPin.addEventListener('mouseup', function () {
  activateMap();
  activateForm();
  makeDisabledFormField(false);
  renderPin(pinElements);
  mainPinPosition = calculateMainPinPosition();
  writeMainPinLocation(mainPinPosition.x, mainPinPosition.y);
});

// Координаты центральной метки
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_POINTER = 22;
var addressField = notice.querySelector('#address');

var getCoords = function (element) {
  var box = element.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

var mapLocation = getCoords(map);

var mainPinLocation = getCoords(mainPin);
var calculateMainPinPosition = function () {
  var mainPinLocationX = Math.floor(mainPinLocation.left + MAIN_PIN_WIDTH / 2 - mapLocation.left);
  var mainPinLocationY = Math.floor(mainPinLocation.top + MAIN_PIN_HEIGHT / 2 - mapLocation.top);
  if (!map.classList.contains('map--faded')) {
    mainPinLocationY = Math.floor(mainPinLocation.top + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER - mapLocation.top);
  }

  return {
    x: mainPinLocationX,
    y: mainPinLocationY
  };
};
var mainPinPosition = calculateMainPinPosition();

var writeMainPinLocation = function (mainPinLocationX, mainPinLocationY) {
  addressField.value = mainPinLocationX + ', ' + mainPinLocationY;
};
writeMainPinLocation(mainPinPosition.x, mainPinPosition.y);

// Похожие объявления
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
    var articleElement = createArticleElement(article);
    closePopupHandler(articleElement);
    renderArticle(articleElement);
  });
};

var pinOpenHandlers = function () {
  for (var i = 0; i < pinElements.length; i++) {
    pinOpenHandler(pinElements[i], articles[i]);
  }
};

pinOpenHandlers();

// Валидация формы
var form = document.querySelector('.notice__form');

// Синхронизация въезда/выезда

var synchronizeSelectData = function () {
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  timeInInput.addEventListener('change', function () {
    timeOutInput.selectedIndex = timeInInput.selectedIndex;
  });
  timeOutInput.addEventListener('change', function () {
    timeInInput.selectedIndex = timeOutInput.selectedIndex;
  });
};
synchronizeSelectData();

// Ограничение минимальной цены по типу жилья
var offerTypeInput = form.querySelector('#type');
var offerPriceInput = form.querySelector('#price');

var TYPES_AND_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var setMinPrice = function (evt) {
  offerPriceInput.min = evt ? TYPES_AND_PRICES[evt.currentTarget.value] : TYPES_AND_PRICES.flat;
};
offerTypeInput.addEventListener('change', setMinPrice);
setMinPrice();


// Синхронизация количества комнат с к-вом гостей
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

var ROOMS_AND_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var disableCapacity = function () {
  var capacityOption = capacity.querySelectorAll('option');
  var capacityValues = ROOMS_AND_CAPACITY[roomNumber.value];
  capacity.value = capacityValues[0];
  capacityOption.forEach(function (option) {
    option.disabled = !capacityValues.includes(option.value);
  });
};

roomNumber.addEventListener('change', disableCapacity);
disableCapacity();
