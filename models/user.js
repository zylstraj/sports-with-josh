'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // authored: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Blog'
  //   }
  // ],
  // bookmarked: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref:'Blog'
  //   }
  // ],
  // following: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref:'User',
  //     unique: true
  //   },
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref:'keywords',
  //     unique: true
  //   }
  // ],
  // followedBy: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User'
  //   }
  // ],
  // newContent: [
  //   {
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref: 'Blog',
  //     unique: true
  //   }
  // ],
  // permissions: {
  //   type: String,
  //   default: 'User'
  // }
});
userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ _id: this._id}, process.env.SECRET ||'sportyspice');
};

module.exports = mongoose.model('User', userSchema);
