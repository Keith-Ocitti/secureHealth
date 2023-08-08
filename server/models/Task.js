const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: [true, "Please provide task"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Please provide task"],
  },
  visitTime: {
    type: String,
    required: [true, "Please provide visit time"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unqiue: [true, "email already exists"],
    trim: true,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
