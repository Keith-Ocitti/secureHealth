const Staff = require("../models/Staff");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");

//function to handle staff registration
const register = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("Invalid Credentials");
  }
  const staff = await Staff.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ staff });
};

//function to handle staff login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }

  const staff = await Staff.findOne({ email: email });
  if (!staff) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordCorrect = await staff.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Please enter correct password");
  }
  const token = staff.createToken();
  res
    .status(StatusCodes.ACCEPTED)
    .json({ name: staff.firstName, email: staff.email, token });
};

module.exports = { register, login };
