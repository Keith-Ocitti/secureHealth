import React, { useState } from "react";
import "../../styles/addNewPatient.css";
import axios from "axios";
import { useNavigate } from "react-router";

const AddNewPatient = ({ dispatch }) => {
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nextOfKin: "",
    location: "",
  });

  const [message, setMessage] = useState();
  const navigate = useNavigate();

  // function to handle form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPatient((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // function to add patient
  const addNewPatient = () => {
    const baseUrl = "http://localhost:5000/api/v1/patient";
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseUrl, { ...newPatient }, config)
      .then((response) => {
        dispatch({ type: "ready", payload: response.data });
        // console.log(response.data);
        navigate("/patient");
      })
      .catch((err) => {
        setMessage("Check your network connection");
        console.log(err);
      });
  };

  // function to go back to search patients page
  const back = () => {
    navigate("/searchPatient");
  };

  return (
    <div className="container">
      <button className="secureHealthBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 -6 18 22"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        Secure Health
      </button>
      <p>Please enter Patient information</p>
      <div className="inputHolder">
        <p>First Name</p>
        <input
          type="text"
          required
          value={newPatient.firstName}
          onChange={handleChange}
          name="firstName"
        />
      </div>
      <div className="inputHolder">
        <p>Last name</p>
        <input
          type="text"
          required
          value={newPatient.lastName}
          onChange={handleChange}
          name="lastName"
        />
      </div>
      <div className="inputHolder">
        <p>Date of Birth</p>
        <input
          type="text"
          placeholder="yyyy/mm/dd"
          required
          value={newPatient.dateOfBirth}
          onChange={handleChange}
          name="dateOfBirth"
        />
      </div>
      <div className="inputHolder">
        <p>Next of Kin</p>
        <input
          type="text"
          required
          value={newPatient.nextOfKin}
          onChange={handleChange}
          name="nextOfKin"
        />
      </div>
      <div className="inputHolder">
        <p>Location</p>
        <input
          type="text"
          required
          value={newPatient.location}
          onChange={handleChange}
          name="location"
        />
      </div>
      <p className="failedMsg">{message ? message : ""}</p>
      <div className="btnHolder">
        <button className="submitBtn" onClick={addNewPatient}>
          Submit
        </button>
        <button className="submitBtn" onClick={back}>
          Back
        </button>
      </div>
    </div>
  );
};

export default AddNewPatient;
