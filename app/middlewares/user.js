const jwt = require('jwt-simple');
const { checkSchema, validationResult } = require('express-validator');
const { errorsMessages } = require('../services/internals/constants');

async function validateSignUp(req, res, next) {
  await checkSchema({
    first_name: {
      notEmpty: true,
      errorMessage: errorsMessages.EMPTY
    },
    last_name: {
      notEmpty: true,
      errorMessage: errorsMessages.EMPTY
    },
    email: {
      notEmpty: {
        negated: false,
        errorMessage: errorsMessages.EMPTY
      },
      customSanitizer: {
        options: value => {
          const withDomain = value.split('@');
          if (withDomain[1] === undefined) {
            return errorsMessages.INVALID_EMAIL;
          } else if (withDomain[1] !== 'wolox.com') {
            return errorsMessages.INVALID_DOMAIN;
          }
          return value;
        }
      },
      isEmail: true
    },
    password: {
      isLength: {
        errorMessage: errorsMessages.PASSWORD_LONG,
        options: {
          min: 8
        }
      },
      isAlphanumeric: true,
      errorMessage: errorsMessages.PASSWORD_ALPHA
    }
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

async function validateSignIn(req, res, next) {
  await checkSchema({
    email: {
      notEmpty: {
        negated: false,
        errorMessage: errorsMessages.EMPTY
      },
      customSanitizer: {
        options: value => {
          const withDomain = value.split('@');
          if (withDomain[1] === undefined) {
            return errorsMessages.INVALID_EMAIL;
          } else if (withDomain[1] !== 'wolox.com') {
            return errorsMessages.INVALID_DOMAIN;
          }
          return value;
        }
      },
      isEmail: true
    },
    password: {
      isLength: {
        errorMessage: errorsMessages.PASSWORD_LONG,
        options: {
          min: 8
        }
      },
      isAlphanumeric: true,
      errorMessage: errorsMessages.PASSWORD_ALPHA
    }
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

function isStandardUser(req, res, next) {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY, false, 'HS256');
      if (decoded.role_id === 'standard' || decoded.role_id === 'administrator') {
        req.decoded = decoded;
        return next();
      }
      return res.status(400).json(errorsMessages.NOT_AUTH);
    }
    return res.status(400).json(errorsMessages.NOT_TOKEN);
  } catch (error) {
    if (error.message === 'Token expired') {
      return next();
    }
    return res.status(400).json({ error: error.message });
  }
}

function isAdminUser(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.decode(token, process.env.SECRET_KEY, false, 'HS256');
    if (decoded.role_id === 'administrator') {
      return next();
    }
    return res.status(400).json(errorsMessages.NOT_AUTH);
  }
  return res.status(400).json(errorsMessages.NOT_TOKEN);
}

module.exports = {
  validateSignUp,
  validateSignIn,
  isStandardUser,
  isAdminUser
};
