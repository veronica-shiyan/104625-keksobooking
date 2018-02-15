'use strict';

(function () {
  var form = document.querySelector('.notice__form');

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
    if (!capacityValues.includes(capacity.value)) {
      capacity.value = capacityValues[0];
    }
    capacityOption.forEach(function (option) {
      option.disabled = !capacityValues.includes(option.value);
    });
  };

  roomNumber.addEventListener('change', disableCapacity);
  disableCapacity();
})();
