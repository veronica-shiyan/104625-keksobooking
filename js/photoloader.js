'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_STYLE = {
    width: 60,
    height: 80,
    border: '2px solid transparent'
  };

  var form = document.querySelector('.notice__form');
  var avatarInput = form.querySelector('#avatar');
  var avatarImage = form.querySelector('.notice__preview img');
  var photoContainer = form.querySelector('.form__photo-container');
  var photoInput = form.querySelector('#images');
  var avatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var photoDropZone = photoContainer.querySelector('.drop-zone');

  var targetDropElement = null;

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
    photoImage.style.border = PHOTO_STYLE.border;
    photoContainer.appendChild(photoImage);
    readFiles(photoFiles, photoImage);
  }

  photoInput.addEventListener('change', function () {
    Array.from(photoInput.files).forEach(function (photoFiles) {
      photoLoadHandler(photoFiles);
    });
    var photoImages = photoContainer.querySelectorAll('img');
    [].forEach.call(photoImages, function (photoImage) {
      photoImage.addEventListener('dragstart', dragstartHandler);
      photoImage.addEventListener('dragover', dragoverHandler);
      photoImage.addEventListener('dragenter', dragenterHandler);
      photoImage.addEventListener('dragleave', dragleaveHandler);
      photoImage.addEventListener('drop', dropHandler);
      photoImage.addEventListener('dragend', dragendHandler);
    });
  });

  function dragoverLoadHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  avatarDropZone.addEventListener('dragover', dragoverLoadHandler);
  photoDropZone.addEventListener('dragover', dragoverLoadHandler);

  avatarDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    avatarInput.files = evt.dataTransfer.files;
  });

  photoDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    photoInput.files = evt.dataTransfer.files;
  });

  function dragstartHandler(evt) {
    evt.target.style.opacity = '0.4';
  }

  function dragoverHandler(evt) {
    targetDropElement = evt.target;
    if (evt.preventDefault) {
      evt.preventDefault();
    }
    evt.dataTransfer.dropEffect = 'move';
    return false;
  }

  function dragenterHandler(evt) {
    evt.target.style.border = '2px dashed black';
  }

  function dragleaveHandler(evt) {
    targetDropElement = null;
    evt.target.style.border = PHOTO_STYLE.border;
  }

  function dropHandler(evt) {
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }
    return false;
  }

  function dragendHandler(evt) {
    var url = '';
    if (targetDropElement && evt.target !== targetDropElement) {
      url = evt.target.src;
      evt.target.src = targetDropElement.src;
      targetDropElement.src = url;
    }

    evt.target.style.opacity = '1';
    [].forEach.call(photoContainer.querySelectorAll('img'), function (photoElement) {
      photoElement.style.border = PHOTO_STYLE.border;
    });
  }
})();
