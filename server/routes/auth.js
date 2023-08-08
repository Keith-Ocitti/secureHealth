const express = require("express");
const router = express.Router();
const { register, login, getDoctor } = require("../controllers/auth");
const { addTask, getTasks } = require("../controllers/task");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/getDoctor").post(getDoctor);
// router.route("/updateUser").post(updatePassword);
// router.route("/addTask").post(addTask);
// router.route("/getTasks").get(getTasks);

module.exports = router;
