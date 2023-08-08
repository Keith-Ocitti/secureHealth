const express = require("express");
const router = express.Router();
const { addTask, getTasks, deleteTask } = require("../controllers/task");
const { updatePassword } = require("../controllers/auth");

router.route("/addTask").post(addTask);
router.route("/getTasks/:email").get(getTasks);
router.route("/deleteTask").post(deleteTask);
router.route("/updateUser").post(updatePassword);

module.exports = router;
