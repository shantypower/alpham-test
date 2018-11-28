'use strict';

(function () {
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var MAX_ROOMS_QUANTITY = 100;

  var adForm = document.querySelector('.ad-form');
  var inputTitle = adForm.querySelector('#title');
  var inputPrice = adForm.querySelector('#price');
  var selectHouseType = adForm.querySelector('#type');
  var selectCheckIn = adForm.querySelector('#timein');
  var selectCheckOut = adForm.querySelector('#timeout');
  var rooms = adForm.querySelector('select[name="rooms"]');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElement = adForm.querySelectorAll('.ad-form__element');
  var addressInput = adForm.querySelector('#address');
  var successPopup = document.querySelector('.success');
  var selectedRooms = Number(selectRooms.value);
  var selectedCapacity = Number(selectCapacity.value);
  var capacityOptions = selectCapacity.children;
  capacityOptions = Array.prototype.slice.call(capacityOptions, 0);
  var MinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 100000
  };

  var getFormDisabled = function () {
    adForm.classList.add('ad-form--disabled');
    adFormHeader.disabled = true;
    adFormElement.forEach(function (element) {
      element.disabled = true;
    });
  };

  var getFormEnabled = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.disabled = false;
    adFormElement.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var onSelectHouseTypeChange = function () {
    var minPrice = MinPrices[selectHouseType.value];
    inputPrice.setAttribute('min', minPrice);
    inputPrice.setAttribute('placeholder', minPrice);
  };

  var onInputChange = function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Необходимо ввести минимум 30 символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Максимально можно ввести 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }

    if (inputPrice.validity.rangeOverflow) {
      inputPrice.setCustomValidity('Значение цены не должно превышать 1000000');
    } else if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
    } else {
      inputPrice.setCustomValidity('');
    }
  };

  var setMatchCapacity = function () {
    var currentRoomsValue = +rooms.value;

    if (currentRoomsValue === MAX_ROOMS_QUANTITY) {
      capacityOptions.forEach(function (option) {
        option.disabled = true;
      });
      capacityOptions[capacityOptions.length - 1].disabled = false;
      capacityOptions[capacityOptions.length - 1].selected = true;
    } else {
      capacityOptions.forEach(function (option, i) {
        option.disabled = i >= currentRoomsValue;
      });
      capacityOptions[0].selected = true;
    }
  };

  var onSelectRoomsChange = function () {
    var errorMessage = '';
    setMatchCapacity();

    switch (selectedRooms) {
      case (1): {
        if (selectedCapacity > 1 || selectedCapacity === 0) {
          errorMessage = 'При выборе "1 комната" можно выбрать количество мест: для 1 гостя';
        }
        break;
      }
      case (2): {
        if (selectedCapacity > 2 || selectedCapacity === 0) {
          errorMessage = 'При выборе "2 комнаты" можно выбрать количество мест: для 1 гостя; для 2 гостей';
        }
        break;
      }
      case (3): {
        if (selectedCapacity > 3 || selectedCapacity === 0) {
          errorMessage = 'При выборе "3 комнаты" можно выбрать количество мест: для 1 гостя; для 2 гостей; для 3 гостей';
        }
        break;
      }
      case (100): {
        if (selectedCapacity > 0) {
          errorMessage = 'При выборе "100 комнат" можно выбрать количество мест: не для гостей';
        }
        break;
      }
    }
    selectCapacity.setCustomValidity(errorMessage);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');

    pins.forEach(function (element) {
      if (element !== window.map.mapPinMain) {
        window.map.mapPinsContainer.removeChild(element);
      }
    });
  };

  var onResetButtonClick = function () {
    var mapCard = document.querySelector('.map__card');
    removePins();
    if (mapCard) {
      window.map.closeCurrentPopup();
    }
    window.map.getPageDisabled();
    adForm.reset();
    window.map.mapPinMain.style.left = MAIN_PIN_START_X + 'px';
    window.map.mapPinMain.style.top = MAIN_PIN_START_Y + 'px';
    window.map.getPinAddressToForm();
    window.photoload.resetAvatar();
    window.photoload.resetPhotos();
  };

  var initiateValidation = function () {
    inputTitle.addEventListener('invalid', onInputChange);
    inputPrice.addEventListener('input', onInputChange);
    inputPrice.addEventListener('invalid', onInputChange);
    selectHouseType.addEventListener('change', onSelectHouseTypeChange);
    selectRooms.addEventListener('change', onSelectRoomsChange);
    selectCheckIn.addEventListener('change', function () {
      selectCheckOut.value = selectCheckIn.value;
    });
    selectCheckOut.addEventListener('change', function () {
      selectCheckIn.value = selectCheckOut.value;
    });
    resetButton.addEventListener('click', onResetButtonClick);
  };

  window.addEventListener('load', initiateValidation);

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      successPopup.classList.remove('hidden');
      onResetButtonClick();
      window.map.closeCurrentPopup();
    }, window.map.errorHandler);
  };

  adForm.addEventListener('submit', onSubmitClick);
  successPopup.addEventListener('click', function () {
    successPopup.classList.add('hidden');
  });

  window.form = {
    getFormEnabled: getFormEnabled,
    getFormDisabled: getFormDisabled,
    addressInput: addressInput
  };
})();
