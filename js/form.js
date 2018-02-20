'use strict';

(function () {
  var TYPES_AND_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var ROOMS_AND_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var form = document.querySelector('.notice__form');
  var offerTypeInput = form.querySelector('#type');
  var offerPriceInput = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var resetButton = form.querySelector('.form__reset');
  /* var avatarInput = form.querySelector('#avatar');
  var offerImage = form.querySelector('.notice__preview img');
  var photoContainer = form.querySelector('.form__photo-container');
  var photoInput = form.querySelector('#images');

 var avatarFileHandler = function () {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      offerImage.file = file;

      var reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (evt) {
          aImg.src = evt.target.result;
        };
      })(offerImage);
      reader.readAsDataURL(file);
    }
  };
  avatarInput.addEventListener('change', avatarFileHandler, false);

  var photoFileHandler = function () {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var offerPhotoImage = document.createElement('img');
      offerPhotoImage.style.width = '60px';
      offerPhotoImage.style.height = 'auto';
      offerPhotoImage.file = file;
      photoContainer.appendChild(offerPhotoImage);

      var reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (evt) {
          aImg.src = evt.target.result;
        };
      })(offerPhotoImage);
      reader.readAsDataURL(file);
    }
  };

  photoInput.addEventListener('change', photoFileHandler, false);*/

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

  var setMinPrice = function (evt) {
    offerPriceInput.min = evt ? TYPES_AND_PRICES[evt.currentTarget.value] : TYPES_AND_PRICES.flat;
  };
  offerTypeInput.addEventListener('change', setMinPrice);
  setMinPrice();

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

  resetButton.addEventListener('click', function (evt) {
    window.inactivatePage();
    evt.preventDefault();
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), window.inactivatePage, window.errorHandler);
    evt.preventDefault();
  });
})();
