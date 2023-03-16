import React, { useState } from "react";
import "../../styles/searchPatient.css";
import axios from "axios";
import { useNavigate } from "react-router";

const SearchPatient = ({ dispatch }) => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [patientCode, setPatientCode] = useState("");
  const [message, setMessage] = useState();

  //function to handle patient code input
  const handleChange = (event) => {
    setPatientCode((prevData) => event.target.value);
  };

  //function to search patient
  const findPatient = () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`http://localhost:5000/api/v1/patient/${patientCode}`, config)
      .then((response) => {
        if (response) {
          dispatch({ type: "ready", payload: response.data });
          navigate("/patient");
        }
      })
      .catch((err) => {
        setMessage(`No patient found with code ${patientCode} or network`);
        console.log(err);
      });
  };

  // function to navigate to  add new Patient page
  const addPatient = () => {
    navigate("/addPateint");
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
      <p>Enter Patient Code to view details</p>
      <div className="inputHolder">
        <p>
          <b>Patient Code</b>
        </p>
        <input
          type="text"
          required
          value={patientCode}
          onChange={handleChange}
          name="patientCode"
        />
        <button className="searchBtn" onClick={findPatient}>
          Search
        </button>
      </div>
      <p className="invalidCode">{message ? message : ""}</p>
      <button className="addPatient" onClick={addPatient}>
        Add new Patient
      </button>
    </div>
  );
};

export default SearchPatient;
