const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const contactSchema = new mongoose.Schema({
    userId:{
      type:ObjectId,
      ref:"userPanel"
  },
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
  phone: {
    type: String,
    required: true,
    minlength: [10, "phone no. must be at least 10 ch"],
  },
});

const contactModel = mongoose.model("contacts", contactSchema);

module.exports = contactModel;
