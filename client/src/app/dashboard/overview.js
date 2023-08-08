"use client";
import {
  faBriefcaseClock,
  faCalendarDays,
  faStar,
  faStarHalfStroke,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avi from "../images/avi.jpg";
import Image from "next/image";
import Chart from "chart.js";
import { useEffect, useState } from "react";
import ClockComp from "./clock";

export default function Overview() {
  const [patientData, setPatientData] = useState([]);
  let token = sessionStorage.getItem("token");
  let firstName = sessionStorage.getItem("name");
  let lastName = sessionStorage.getItem("lastName");
  let position = sessionStorage.getItem("position");
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: [86],
            label: "Patients",
            borderColor: "orangered",
            backgroundColor: "rgb(252, 229, 185,0.1)",
          },
          {
            data: [70, 90, 44, 60, 83, 90, 100],
            label: "Pending",
            borderColor: "rgb(60,186,159)",
            backgroundColor: "rgb(60,186,159,0.1)",
          },
          {
            data: [10, 21, 60, 44, 17, 21, 17],
            label: "Appointments",
            borderColor: "rgb(255,165,0)",
            backgroundColor: "rgb(255,165,0,0.1)",
          },
        ],
      },
    });
  }, []);

  // fetching patient data
  // fetch()

  // console.log({ token: token });

  return (
    <main>
      <h2>Overview</h2>
      <br />
      <div className="overview-container">
        <div className="first-div">
          <div className="card-div">
            <div className="card">
              <div className="card-header">
                <h4>Patients</h4>
              </div>
              <div className="card-body">
                <button>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ color: "orangered" }}
                    className="card-icon"
                  />
                  <p>Total Patients</p>
                </button>
                <h1>123</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4>Pending</h4>
              </div>
              <div className="card-body">
                <button>
                  <FontAwesomeIcon
                    icon={faBriefcaseClock}
                    style={{ color: "green" }}
                    className="card-icon"
                  />
                  <p>Pending Activities</p>
                </button>
                <h1>23</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4>Appointments</h4>
              </div>
              <div className="card-body">
                <button>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: "orange" }}
                    className="card-icon"
                  />
                  <p>Total Appointments</p>
                </button>
                <h1>06</h1>
              </div>
            </div>
          </div>
          <div className="graph-div">
            <canvas id="myChart"></canvas>
          </div>
        </div>
        <div className="second-div">
          <div className="clock-div">
            <ClockComp />
          </div>
          <div className="profile-card">
            <div className="top-div">
              <p>My Profile</p>
            </div>
            <div className="middle-div">
              <Image
                src={avi}
                className="avatar"
                alt={<FontAwesomeIcon icon={faUser} />}
              />
            </div>
            <div className="bottom-div">
              <h3>{`${firstName + " " + lastName}`}</h3>
              <p>{`${position}`}</p>
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              <FontAwesomeIcon icon={faStarHalfStroke} className="star-icon" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
