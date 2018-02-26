'use strict';

(function () {
  var copyExample = document.querySelector('template').content;

  window.errorHandler = function (errorMessage) {
    var element = document.createElement('div');
    var textElement = 'Данные потерялись в пути... \n Попробуйте еще раз немного позже. \n';
    element.style = 'z-index: 100; text-align: center; color: black; background-color: rgba(0, 0, 255, 0.8);';
    element.style.position = 'fixed';
    element.style.width = '550px';
    element.style.paddingTop = '20px';
    element.style.paddingBottom = '20px';
    element.style.top = '40%';
    element.style.left = 'calc(50% - 275px)';
    element.style.fontSize = '30px';
    element.textContent = textElement + errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
    var popupClose = copyExample.querySelector('.popup__close');
    var closeElement = popupClose.cloneNode(true);
    closeElement.style.position = 'absolute';
    closeElement.style.top = '0';
    closeElement.style.right = '0';
    element.insertAdjacentElement('afterbegin', closeElement);

    var closeElementEscPressHandler = function (evt) {
      if (evt.keyCode === window.util.keycode.esc) {
        closeMessage();
      }
    };
    var closeMessage = function () {
      element.style.display = 'none';
      document.removeEventListener('keydown', closeElementEscPressHandler);
    };

    document.addEventListener('keydown', closeElementEscPressHandler);

    closeElement.addEventListener('click', function () {
      closeMessage();
    });

    closeElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.keycode.enter) {
        closeMessage();
      }
    });
  };
})();
