
const showError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}


const messageError = (inputElement, messageError) => {
  if (inputElement.type.toString() === 'url') {
    switch (inputElement.validity.typeMismatch) {
      case true: messageError = 'Введите адрес сайта.';
        break;
      case false: messageError = '';
        break;
    }
  }
  if (inputElement.validity.valueMissing) {
    messageError = 'Вы пропустили это поле.'
  } else {
    messageError = inputElement.validationMessage;
  }
  return messageError;
}


const checkInputValidaty = (formElement, inputElement, rest) => {
  let errorWarning = '';
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, messageError(inputElement, errorWarning), rest);
  } else {
    hideError(formElement, inputElement, rest);
  }
}


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const inactiveButtonClass = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}


const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  inactiveButtonClass(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidaty(formElement, inputElement, rest);
      inactiveButtonClass(inputList, submitButton);
    });
  });
};


const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

export { enableValidation }