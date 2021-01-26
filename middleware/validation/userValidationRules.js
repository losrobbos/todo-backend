const e = require('express');
const { body } = require('express-validator');

exports.userValidationRules = () => {
  return [
    body('email')
      .isEmail()
      // .custom((value, { req }) => {
      //   let ending = value.split('@')[1].split('.')[1];
      //   if (ending !== 'com')
      //     throw new Error(
      //       'You need a xxxxx@xxxx.com email to sign up'
      //     );

      //   return true;
      // })
      .normalizeEmail()
      .trim()
      .withMessage('Your email looks funky.'),
    body('password')
      .notEmpty()
      .trim()
      .isLength({ min: 3 })
      .withMessage(
        'Your password needs to be at least 3 chars long.'
      ),
    // .matches(
    //   /`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    // )
    // .withMessage('Your password is not valid.'),
  ];
};
