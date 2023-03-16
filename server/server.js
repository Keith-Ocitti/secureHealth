require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./db/connect");
const authRoutes = require("./routes/auth");
const patientRoute = require("./routes/patient");
const authenticateUser = require("./middleware/authenticate");
const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorHandler");

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", authenticateUser, patientRoute);
app.use(errorMiddleware);
app.use(notFoundMiddleware);

//function to start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
