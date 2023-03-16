const CustomAPIError = require("../errors/CustomAPIError");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  console.log(err);
  res.status(500).json(err);
};

module.exports = errorHandler;
