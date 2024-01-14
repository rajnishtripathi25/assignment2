const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      'password must contain at least 1 letter and 1 number'
    );
  }
  return value;
};

function validatePhoneNumber(phoneNumber, customPattern) {
  const defaultPattern = /^(?:\+?971|00971|0)?[567][0-9]\d{7}$/;

  const pattern = customPattern || defaultPattern;

  return pattern.test(phoneNumber);
}

module.exports = {
  objectId,
  password,
  validatePhoneNumber,
};
