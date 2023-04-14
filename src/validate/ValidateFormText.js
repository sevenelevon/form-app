export const validateStringField = (fieldName, fieldValue, errors) => {
  if (!fieldValue) {
    errors[fieldName] = "Пожалуйста, заполните поле.";
  } else if (!/^[а-яА-ЯёЁa-zA-Z\s«»"«»]*$/.test(fieldValue)) { 
    errors[fieldName] = "Поле не может содержать цифры.";
  }
};

export const validateNumberField = (fieldName, fieldValue, errors, num) => {
  if (!fieldValue) {
    errors[fieldName] = "Заполните поле.";
  } else if (!/^\d+$/.test(fieldValue)) {
    errors[fieldName] = "Введите цифры.";
  } else if (fieldValue.length < num) {
    errors[fieldName] = "Не менее 10 символов";
  }
};

export const validateFileField = (fieldName, fieldValue, errors) => {
  if (!fieldValue) {
    errors[fieldName] = "Пожалуйста, загрузите файл.";
  }
};

export const validateLinkField = (fieldName, fieldValue, errors) => {
  if (!fieldValue) {
    errors[fieldName] = "Пожалуйста, заполните поле.";
  } else if (!/^https:\/\//.test(fieldValue)) { 
    errors[fieldName] = "Введите корректный URL.";
  }
};