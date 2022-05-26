const successfulMesages = {
  CREATED: 'created Successfully',
  UPDATED: 'updated Successfully',
  FOUNDED: 'Founded'
};

const errorsMessages = {
  FAIL: 'Server Fail',
  EMPTY: 'Cannot be empty',
  INVALID_EMAIL: 'Invalid format',
  INVALID_DOMAIN: 'Invalid Domain',
  PASSWORD_LONG: 'Should be at least 8 chars long',
  PASSWORD_ALPHA: 'Should be Alphanumeric',
  EMAIL_DUPLICATE: 'Already in use',
  WRONG_PARAMS: 'Wrong email or password',
  NOT_CREATED: 'Cannot be created',
  NOT_TOKEN: 'Token was not supplied',
  NOT_AUTH: 'Unauthorized resources'
};

module.exports = {
  successfulMesages,
  errorsMessages
};
