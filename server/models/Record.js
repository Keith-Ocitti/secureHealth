const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema(
  {
    patientCode: {
      type: String,
      minlength: 6,
    },
    diagnosis: {
      type: String,
    },
    medicine: {
      type: String,
    },
    hospital: {
      type: String,
    },
    date: {
      type: String,
    },
    doctor: {
      type: String,
    },
    examinations: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", RecordSchema);
