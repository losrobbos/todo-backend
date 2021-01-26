/** CONNECT TO LOWDB */
const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user._id
    console.log({userId})
    const user = await User.findById(userId);
    if (!user)
      throw new Error(`No user with id: ${req.params.id || req.user._id}`);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body
  
  let user = await User.findOne({ email })

  if(!user) {
    let error = new Error("User with given email not found!")
    error.status = 400
    return next(error)
  }

  let pwMatch = user.comparePasswords(password)

  if(!pwMatch) {
    let error = new Error("Password does not match!")
    error.status = 400
    return next(error)
  }

  
  //before we send the response back we need to create a token
  const token = user.generateToken();
  res.send({ user, token });
}

exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.hashPassword()
    const userSignedUp = await user.save();

    //before we send the response back we need to create a token
    const token = user.generateToken();
    res.send({ user: userSignedUp, token });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!user)
      throw new Error(`No user with id: ${req.params.id}`);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(
      req.params.id
    );
    if (!user)
      throw new Error(`No user with id: ${req.params.id}`);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.getOrdersByUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const orders = await Order.find({ userId: id });
    if (!orders)
      throw new Error(`User ${id} has no orders yet`);
    res.send(orders);
  } catch (error) {
    next(error);
  }
};
