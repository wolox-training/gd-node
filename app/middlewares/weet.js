const { checkSchema, validationResult } = require('express-validator');
const { errorsMessages } = require('../services/internals/constants');


async function validateQualificationWeet(req, res, next) {
  console.log(req.body, '111');
  await checkSchema({
    score: {
      notEmpty: true,
      errorMessage: errorsMessages.EMPTY,
      isIn: {
        options: (['1', '1']),
        errorMessage: 'Value must be 1 or -1'
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
  validateQualificationWeet
};
