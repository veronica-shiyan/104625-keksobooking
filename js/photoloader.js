'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_STYLE = {
    width: 60,
    height: 80
  };

  var form = document.querySelector('.notice__form');
  var avatarInput = form.querySelector('#avatar');
  var avatarImage = form.querySelector('.notice__preview img');
  var photoContainer = form.querySelector('.form__photo-container');
  var photoInput = form.querySelector('#images');
  var avatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var photoDropZone = photoContainer.querySelector('.drop-zone');

  var readFiles = function (file, previewImage) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  function avatarLoadHandler(avatarFile) {
    readFiles(avatarFile, avatarImage);
  }

  avatarInput.addEventListener('change', function () {
    var avatarFile = avatarInput.files[0];
    avatarLoadHandler(avatarFile);
  });

  function photoLoadHandler(photo) {
    var photoFiles = photo;
    var photoImage = document.createElement('img');
    photoImage.style.width = PHOTO_STYLE.width + 'px';
    photoImage.style.height = PHOTO_STYLE.height + 'px';
    photoContainer.appendChild(photoImage);
    readFiles(photoFiles, photoImage);
  }

  photoInput.addEventListener('change', function () {
    Array.from(photoInput.files).forEach(function (photoFiles) {
      photoLoadHandler(photoFiles);
    });
  });

  function dragover(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  avatarDropZone.addEventListener('dragover', dragover);
  photoDropZone.addEventListener('dragover', dragover);

  avatarDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    avatarInput.files = evt.dataTransfer.files;
  });

  photoDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    photoInput.files = evt.dataTransfer.files;
  });
})();
