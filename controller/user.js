const jwtToken = require("../jwtToken");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports.registerData = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;
  const data = await userModel.create({
    email,
    name,
    password,
    confirmPassword,
  });
  res.status(200).json({
    message: "sent data to db",
    data,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({
      message: "email and password are required fields",
    });
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(200).json({
      message: "user not found",
    });
  }
  if (password !== user.password) {
    return res.status(200).json({
      message: "password mismatch",
    });
  }
  jwtToken(200, user, res);
  // res.status(200).json({
  //   message: "successfully logged in",
  // });
};
exports.protect = async (req, res, next) => {
  const { faw_cookies } = req.cookies;
  if (!faw_cookies) {
    return res.status(200).json({
      msg: "need to login first",
    });
  }
  const decodeToken = await jwt.verify(faw_cookies, process.env.key);
  if (!decodeToken.id) {
    return res.status(200).json({
      msg: "not valid user",
    });
  }
  const user = await userModel.findById(decodeToken.id);
  if (!user) {
    return res.status(200).json({
      msg: "user not found",
    });
  }
  req.user = user;
  next();
};
exports.getUser = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    msg: "user not found",
    users,
  });
};

exports.logout = (req, res) => {
  res
    .status(200)
    .cookie("faw_cookies", null, { expires: new Date(Date.now()) })
    .json({
      msg: "logged out!!! come back soon!!! we will miss you!!!",
    });
};
