const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "use valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password must be at least 6 ch"],
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.getToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.key, {
    expiresIn: process.env.exp,
  });
};

const userModel = mongoose.model("userPanel", userSchema);

module.exports = userModel;
