const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'User'],
      default: 'User'
    },
  },
  { 
    id: false,
    
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password // hide password field from all outputs 
      } 
    },
    
    timestamps: true 
  }
);


UserSchema.methods.hashPassword = function () {
  const user = this
  if(user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 10)
  }
}

UserSchema.methods.comparePasswords = function(pwPlain) {
  const user = this
  return bcrypt.compareSync(pwPlain, user.password)
}

UserSchema.methods.generateToken = function () {
  const user = this;
  const payload = { _id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '5h'});

  return token;
};

UserSchema.statics.verifyToken = function (token) {
  return jwt.verify(token, JWT_SECRET);
}

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return;
  }

  return User.findById(payload._id);
};

module.exports = mongoose.model('User', UserSchema);
