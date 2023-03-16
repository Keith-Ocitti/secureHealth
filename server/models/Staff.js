const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const StaffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    maxlength: [20, "First name cannot be more than 20 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  telephone: {
    type: String,
    required: [true, "Please provide telephone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
});

//function to encrypt password before saving to databse
StaffSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//function to compare password at login
StaffSchema.methods.comparePassword = async function (staffPassword) {
  const isMatch = await bcrypt.compare(staffPassword, this.password);
  return isMatch;
};

// function to generate a token for the staff
StaffSchema.methods.createToken = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.firstName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

module.exports = mongoose.model("Staff", StaffSchema);
