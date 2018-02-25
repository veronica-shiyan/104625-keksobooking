'use strict';

(function () {
  var MAX_PINS_QUANTITY = 5;
  var PRICE_RANGE = {
    low: {min: 0, max: 9999},
    middle: {min: 10000, max: 49999},
    high: {min: 50000, max: Infinity}
  };

  var filtersForm = document.querySelector('.map__filters');
  var houseTypeSelect = filtersForm.querySelector('#housing-type');
  var housePriceSelect = filtersForm.querySelector('#housing-price');
  var houseRoomsSelect = filtersForm.querySelector('#housing-rooms');
  var houseGuestsSelect = filtersForm.querySelector('#housing-guests');
  var houseFeaturesFieldset = filtersForm.querySelector('#housing-features');
  var houseFeaturesInputs = houseFeaturesFieldset.querySelectorAll('input');

  var allArticlesClone = [];
  var checkedFeatures = [];

  var createNewPinsArray = function () {
    allArticlesClone = filterHouse(window.allArticles);
    window.map.updatePins(allArticlesClone.slice(0, MAX_PINS_QUANTITY));
  };

  function changeHandler() {
    window.debounce(createNewPinsArray);
  }

  function featuresChangeHandler() {
    checkedFeatures = [];
    for (var i = 0; i < houseFeaturesInputs.length; i++) {
      if (houseFeaturesInputs[i].checked === true) {
        checkedFeatures.push(houseFeaturesInputs[i].value);
      }
    }
    window.debounce(createNewPinsArray);
  }

  houseTypeSelect.addEventListener('change', changeHandler);
  housePriceSelect.addEventListener('change', changeHandler);
  houseRoomsSelect.addEventListener('change', changeHandler);
  houseGuestsSelect.addEventListener('change', changeHandler);
  houseFeaturesFieldset.addEventListener('change', featuresChangeHandler);


  var filterHouseType = function (element) {
    return houseTypeSelect.value === 'any' ? true : (element.offer.type === houseTypeSelect.value);
  };

  var filterHousePrice = function (element) {
    if (housePriceSelect.value === 'any') {
      return true;
    } else {
      return PRICE_RANGE[housePriceSelect.value].min <= element.offer.price && element.offer.price < PRICE_RANGE[housePriceSelect.value].max;
    }
  };

  var filterHouseRooms = function (element) {
    return houseRoomsSelect.value === 'any' ? true : ((element.offer.rooms + '') === houseRoomsSelect.value);
  };

  var filterHouseGuests = function (element) {
    return houseGuestsSelect.value === 'any' ? true : ((element.offer.guests + '') === houseGuestsSelect.value);
  };

  var filterHouseFeatures = function (element) {
    return checkedFeatures.every(function (feature) {
      return element.offer.features.indexOf(feature) !== -1;
    });
  };

  function filterHouse(articles) {
    articles = articles.filter(filterHouseType)
        .filter(filterHousePrice)
        .filter(filterHouseRooms)
        .filter(filterHouseGuests)
        .filter(filterHouseFeatures);
    return articles;
  }
})();