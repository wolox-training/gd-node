const { checkSchema, validationResult } = require('express-validator');
const { errorsMessages } = require('../services/internals/constants');

async function validateQualifyWeet(req, res, next) {
  await checkSchema({
    score: {
      notEmpty: true,
      errorMessage: errorsMessages.EMPTY,
      isIn: {
        options: [[1, -1]],
        errorMessage: errorsMessages.INVALID_SCORE
      }
    }
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

module.exports = {
  validateQualifyWeet
};
