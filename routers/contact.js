const express = require("express");
const {
  sentContactData,
  getContactData,
  deleteContactData,
  updateContactData,
} = require("../controller/contact");
const {protect} = require("../controller/user")

const contactRoute = express.Router();

contactRoute.post("/post",protect, sentContactData);
contactRoute.patch("/update/:id",protect, updateContactData);
contactRoute.get("/get",protect, getContactData);
contactRoute.delete("/delete/:id",protect, deleteContactData);

module.exports = contactRoute;
