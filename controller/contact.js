const contactModel = require("../models/contact");

exports.sentContactData = async (req, res) => {
  const { email, name, phone } = req.body;
  const data = await contactModel.create({
    email,
    name,
    phone,
    userId:req.user._id,
  });
  res.status(200).json({
    message: "sent data to db",
    data,
  });
};

exports.getContactData = async (req, res) => {
  const data = await contactModel.find({userId:req.user._id});
  res.status(200).json({
    message: "received data from db",
    data,
  });
};

exports.updateContactData = async (req, res) => {
  const { name, email, phone } = req.body;
  const id = req.params.id;
  const updateContactdata = await contactModel.findByIdAndUpdate(
    id,
    {
      name: name,
      phone: phone,
      email: email,
    },
    { new: true }
  );
  if (!updateContactdata) {
    return res.status(200).json({
      msg: "updating area should not be empty",
    });
  }
  res.status(200).json({
    msg: "contact data updated successfully",
    updateContactdata,
  });
};

exports.deleteContactData = async (req, res) => {
  const delete_data = await contactModel.findByIdAndDelete(req.params.id);
  if (!delete_data) {
    res.status(200).json({
      msg: "error deleting contact data!!!!",
    });
  }
  res.status(200).json({
    msg: "details deletes!!!!",
  });
};
