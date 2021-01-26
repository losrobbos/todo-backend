const { validationResult } = require('express-validator');

exports.validationErrorHadling = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    let errStr = errors.array().map(error => {
      return `${error.param}: ${error.msg}`
    })

    return next(errStr)
  }
  next();
};
