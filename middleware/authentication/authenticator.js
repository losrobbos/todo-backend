const User = require('../../models/User');

exports.auth = async (req, res, next) => {
    // req.cookies.auth => cookies are not available in aReact native app. So look in request HEADERS instead....
    const token = req.headers.auth

    if(!token) {
      return next("No token provided!!!")
    }
    // const token = req.cookies.auth;
    // verify the token (get the userid)
    // find the user with that id
    // const user = await User.findByToken(token);
    try {
      const user = User.verifyToken(token);
      req.user = user; // store detected user in request, so routes can use user information
      next();
    }
    catch(err) {
      next(err)
    }
};
