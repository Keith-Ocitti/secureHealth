const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter second name"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Please enter date of birth"],
  },
  nextOfKin: {
    type: String,
    required: [true, "Please provide next of Kin"],
  },
  uniqueCode: {
    type: String,
    required: [true, "Please enter unique key"],
    minlength: 6,
    unique: true,
  },
  location: {
    type: String,
    required: [true, "Please enter location"],
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
