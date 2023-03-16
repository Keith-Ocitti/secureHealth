const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const Patient = require("../models/Patient");
const Record = require("../models/Record");
const Staff = require("../models/Staff");

// function to create new patient
const createPatient = async (req, res) => {
  if (!req.body === "") {
    throw new BadRequestError("Please enter details");
  }
  const { firstName, lastName, dateOfBirth, nextOfKin, location } = req.body;
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const uniqueCodeArray = [];
  for (let i = 0; i < 3; i++) {
    const letterIndex = Math.floor(Math.random() * 27);
    uniqueCodeArray.push(letters[letterIndex]);
  }
  for (let i = 0; i < 3; i++) {
    const numberIndex = Math.floor(Math.random() * 10);
    uniqueCodeArray.push(numbers[numberIndex]);
  }
  let uniqueCode = uniqueCodeArray.toString();
  uniqueCode = uniqueCode.replaceAll(",", "");

  const patient = await Patient.create({
    firstName,
    lastName,
    dateOfBirth,
    nextOfKin,
    uniqueCode,
    location,
  });

  res.status(StatusCodes.CREATED).json({ patient });
};

// function to create patient diagnosis record
const createRecord = async (req, res) => {
  const { patientCode, diagnosis, treatment } = req.body;
  const { userId } = req.user;
  if (!req.body === "" || !req.params === "") {
    throw new BadRequestError("Invalid entry");
  }
  const newDiagnosis = await Record.create({
    patientCode: patientCode,
    diagnosis: diagnosis,
    treatment: treatment,
    treatedBy: userId,
  });

  res.status(StatusCodes.CREATED).json({ newDiagnosis });
};

//function to get details of a specific patient
const getPatient = async (req, res) => {
  const { id: uniqueCode } = req.params;
  const patient = await Patient.findOne({ uniqueCode: uniqueCode });
  if (!patient) {
    throw new BadRequestError(
      `There is no patient with patientCode ${uniqueCode}`
    );
  }

  const diagnosisRecord = await Record.find({ patientCode: uniqueCode });
  if (!diagnosisRecord) {
    diagnosisRecord = [];
  }
  res.status(StatusCodes.OK).json({ patient, diagnosisRecord });
};

module.exports = { getPatient, createPatient, createRecord };
