"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Schedules({ patient }) {
  console.log(patient);
  const [newSchedule, setNewSchedule] = useState({
    date: "",
    visitTime: "",
  });
  let apiUrl;

  // function to set reminder
  const setReminder = () => {
    const baseUrl = `${apiUrl}/kimra_api/set_daily_call_reminder
    `;
    let send_time = newSchedule.visitTime;
    let phone = patient.telephone;
    let name = patient.firstName;
    let data = {
      send_time: send_time,
      phone_number: phone,
      name: name,
    };
    axios
      .post(baseUrl, data)
      .then((res) => {
        console.log(res), console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const [schedule, setSchedule] = useState([]);
  console.log(schedule);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSchedule((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  let email = sessionStorage.getItem("email");

  const getSchedules = () => {
    const token = sessionStorage.getItem("token");
    // console.log(email);
    const baseURL = `http://localhost:5000/api/v1/getTasks/${email}`;
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    console.log(baseURL);
    axios
      .get(baseURL, config)
      .then((res) => {
        console.log(res);
        setSchedule((prevData) => res.data.finalTasks);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSchedules();
  }, []);
  // const tasks = [];

  // delete task

  const displayAppointments = (taskObj) => {
    return taskObj.map((task) => {
      // console.log(task);
      return (
        <div key={Math.random() * 139}>
          <div className="task-header">
            <div className="task">{task.patient}</div>
            <div className="date">{task.date}</div>
            <div className="end">{task.visitTime}</div>
          </div>
          <hr />
        </div>
      );
    });
  };

  // console.log(doctorId);
  const scheduleAppointment = () => {
    let patient = document.getElementById("patient-name").value;
    console.log(newSchedule);
    console.log(patient);
    const token = sessionStorage.getItem("token");
    const baseURL = "http://localhost:5000/api/v1/addTask";
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseURL, { ...newSchedule, email: email, patient: patient }, config)
      .then((res) => {
        console.log(res);
        console.log("success");
        getSchedules();
        setReminder();
        alert("task added successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="schedules">
        <div className="task-header special-header">
          <div className="task">Patient</div>
          <div className="date">Date</div>
          <div className="start">Visit Time</div>
        </div>
        <hr />
        {schedule.length > 0
          ? displayAppointments(schedule)
          : "No Appointments"}
      </div>
      <div className="add-schedule">
        <div className="add-task-div">
          <h3>Schedule future appointment</h3>
          <div className="task-box">
            <label>Patient Name</label>
            <input
              type="text"
              defaultValue={
                patient ? `${patient.firstName} ${patient.lastName}` : ""
              }
              readOnly={true}
              id="patient-name"
            />
          </div>
          <div className="task-box">
            <label>Appointment Date</label>
            <input
              type="date"
              onChange={handleChange}
              value={newSchedule.date}
              name="date"
            />
          </div>
          <div className="task-box">
            <label>Appointment Time</label>
            <input
              type="time"
              onChange={handleChange}
              value={newSchedule.visitTime}
              name="visitTime"
            />
          </div>
          <button onClick={scheduleAppointment}>Schedule</button>
        </div>
      </div>
    </div>
  );
}
