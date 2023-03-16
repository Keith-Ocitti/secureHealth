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
    treatment: {
      type: String,
    },
    treatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", RecordSchema);
