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
  hospital: {
    type: String,
    required: [true, "Please provide hospital in context"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  phone: {
    type: String,
    required: [true, "Please enter phone"],
    minlength: 10,
    unique: [true, "phone already exist"],
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
