const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const Task = require("../models/Task");

const addTask = async (req, res) => {
  const { patient, date, visitTime, email } = req.body;
  let newTask = await Task.create({
    patient: patient,
    date: date,
    visitTime: visitTime,
    email: email,
  });

  res.send({ newTask });
};

const getTasks = async (req, res) => {
  let { email } = req.params;
  // console.log(email);
  let currentDate = new Date().toLocaleDateString();
  currentDate = currentDate.split("/").reverse().join("-");

  let tasks = await Task.find({});
  let finalTasks = tasks.filter(
    (task) =>
      task.email === email &&
      new Date(task.date).getTime() >= new Date(currentDate).getTime()
  );
  // console.log(tasks);
  // console.log(finalTasks);
  res.send({ finalTasks });
};

const deleteTask = async (req, res) => {
  const { id } = req.body;
  let deletedTask = await Task.deleteOne({ _id: id });
  res.send({ deletedTask });
};

module.exports = { addTask, getTasks, deleteTask };
