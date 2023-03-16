const express = require("express");
const router = express.Router();

const {
  getPatient,
  createPatient,
  createRecord,
} = require("../controllers/patient");

router.route("/patient/:id").get(getPatient);
router.route("/patient").post(createPatient);
router.route("/diagnosis").post(createRecord);

module.exports = router;
