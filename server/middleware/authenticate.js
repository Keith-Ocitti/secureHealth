const Staff = require("../models/Staff");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

// function to authenticate the staff user
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorized, access denied.");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized, access denied.");
  }
};

module.exports = auth;
