const express = require("express");
const { registerData, login, logout, getUser } = require("../controller/user");

const userRoute = express.Router();

userRoute.post("/signup", registerData);
userRoute.post("/login",login)
userRoute.get("/logout",logout)
userRoute.get("/getcontact",getUser)

module.exports = userRoute;
