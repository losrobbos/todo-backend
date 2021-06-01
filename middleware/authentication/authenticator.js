const User = require('../../models/User');

exports.auth = async (req, res, next) => {
    // req.cookies.auth // => COOKIES are not available in a native app, buddy!
    const token = req.headers.auth

    if(!token) {
      return next("No token provided!!!")
    }
    try {
      const user = User.verifyToken(token);
      req.user = user; // store detected user in request, so routes can use user information
      next();
    }
    catch(err) {
      next(err)
    }
};
