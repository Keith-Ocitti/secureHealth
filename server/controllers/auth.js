const Staff = require("../models/Staff");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const bcrypt = require("bcryptjs");

//function to handle staff registration
const register = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("Invalid Credentials");
  }
  const { firstName, lastName, hospital, email, password, phone } = req.body;
  // console.log(doctorId);

  const staff = await Staff.create({
    firstName,
    lastName,
    hospital,
    email,
    password,
    phone,
  });
  res.status(StatusCodes.CREATED).json({ staff });
};

//function to handle staff login
const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(doctorId, password);
  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }

  const staff = await Staff.findOne({ email: email });
  if (!staff) {
    throw new BadRequestError("Invalid credentials");
  }
  // console.log(staff);

  const isPasswordCorrect = await staff.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Please enter correct password");
  }
  // console.log("correct");
  const token = staff.createToken();
  res.status(StatusCodes.ACCEPTED).json({
    name: staff.firstName,
    secondName: staff.lastName,
    hospital: staff.hospital,
    email: staff.email,

    token,
  });
};
const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  let newPassword = await bcrypt.hash(password, salt);
  let doctor = await Staff.findOneAndUpdate(
    { email: email },
    { password: newPassword }
  );
  res.send({ doctor });
};
const getDoctor = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please enter doctor Id");
  }

  const staff = await Staff.findOne({ email: email });
  if (!staff) {
    throw new BadRequestError("Invalid credentials");
  }

  // const token = staff.createToken();
  res.status(StatusCodes.ACCEPTED).json({
    email: staff.email,
    phone: staff.phone,
  });
};
module.exports = { register, login, updatePassword, getDoctor };
