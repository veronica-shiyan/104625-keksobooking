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

  var allArticlesClone = [];
  var checkedFeatures = [];

  var createNewPinsArray = function () {
    allArticlesClone = filterHouse(window.allArticles);
    window.map.updatePins(allArticlesClone.slice(0, MAX_PINS_QUANTITY));
  };

  var changeHandler = function () {
    window.debounce(createNewPinsArray);
  };

  filtersForm.addEventListener('change', changeHandler);

  var filterHouseInputs = function (element, select, prop) {
    return select.value === 'any' ? true : (element.offer[prop] + '' === select.value);
  };

  var filterHouseType = function (element) {
    return filterHouseInputs(element, houseTypeSelect, 'type');
  };

  var filterHousePrice = function (element) {
    if (housePriceSelect.value === 'any') {
      return true;
    } else {
      return PRICE_RANGE[housePriceSelect.value].min <= element.offer.price && element.offer.price < PRICE_RANGE[housePriceSelect.value].max;
    }
  };

  var filterHouseRooms = function (element) {
    return filterHouseInputs(element, houseRoomsSelect, 'rooms');
  };

  var filterHouseGuests = function (element) {
    return filterHouseInputs(element, houseGuestsSelect, 'guests');
  };

  var filterHouseFeatures = function (element) {
    var houseFeaturesInputs = houseFeaturesFieldset.querySelectorAll('input:checked');
    checkedFeatures = [].map.call(houseFeaturesInputs, function (inputChecked) {
      return inputChecked.value;
    });
    return checkedFeatures.every(function (feature) {
      return element.offer.features.indexOf(feature) !== -1;
    });
  };

  var filterHouse = function (articles) {
    articles = articles.filter(filterHouseType)
        .filter(filterHousePrice)
        .filter(filterHouseRooms)
        .filter(filterHouseGuests)
        .filter(filterHouseFeatures);
    return articles;
  };
})();
