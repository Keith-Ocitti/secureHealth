"use client";

import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Patient({ dispatch, patient }) {
  const [otpCode, setOtpCode] = useState(false);
  const [display, setDisplay] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    telephone: "",
    nextOfKin: "",
    location: "",
  });
  const [patientCode, setPatientCode] = useState("");
  const [fetchedPatient, setFetchedPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    telephone: "",
    nextOfKin: "",
    location: "",
  });
  const [message, setMessage] = useState();
  useEffect(() => {
    setFetchedPatient(patient.patient);
  }, []);

  // get patient age
  let age;
  let uniqueCode;
  if (fetchedPatient) {
    let yearOfBirth = Number(fetchedPatient.dateOfBirth.split("/")[0]);
    let currentYear = new Date().getFullYear();
    age = currentYear - yearOfBirth;
  }

  // handle patient-data div
  const handleDisplay = () => {
    setDisplay((prevData) => !prevData);
  };

  // function to handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPatient((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  //function to handle patient code input
  const handlePatientCode = (event) => {
    setPatientCode((prevData) => event.target.value);
  };

  //function to search patient
  const findPatient = () => {
    console.log("clicked");
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`http://localhost:5000/api/v1/patient/${patientCode}`, config)
      .then((response) => {
        // console.log(response.data.patient.uniqueCode);
        console.log(response);
        setFetchedPatient(response.data.patient);
        sessionStorage.setItem("patientCode", response.data.patient.uniqueCode);
        if (response) {
          dispatch({ type: "ready", payload: response.data });
        }
      })
      .catch((err) => {
        setMessage(`No patient found with code ${patientCode} or network`);
        // console.log(message);
        // document.getElementById("msg").textContent = message;
        console.log(err);
      });
  };

  // function to add new patient
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
        setFetchedPatient(response.data.patient);
        sessionStorage.setItem("patientCode", response.data.patient.uniqueCode);
        alert("Pateint created successfully");
        handleDisplay();
        console.log(response.data);

        console.log("success");
        // navigate("/patient");
      })
      .catch((err) => {
        setMessage("Check your network connection");
        console.log(err);
      });
  };

  // function to initiate OTP Code
  const sendOTP = () => {
    let baseUrl =
      "https://6d37-41-75-171-164.ngrok-free.app/secure_health/send_otp_code";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      phone_number: "0773431724",
    };

    const jsonData = JSON.stringify(data);

    axios
      .post(baseUrl, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let code = res.data.code;
        // setOtpCode((prevData) => code);
        sessionStorage.setItem("code", code);
      })
      .catch((err) => console.log(err));
  };
  // console.log(otpCode);

  const confirmOTP = () => {
    let enteredValue = document.getElementById("otpCode-input").value;
    console.log(enteredValue);
    // let code = sessionStorage.getItem("code");
    let code = "55555";
    if (code === enteredValue) {
      setOtpCode(true);
    }
  };
  // confirmOTP();
  const back = () => {};
  return (
    <>
      {/* <h2 className="pat-head">Patient</h2> */}
      <div className="container">
        <div className="patient-data">
          <h4>Welcome back! Please search for new patient</h4>
          <h5>Patient ID</h5>
          <div className="search-box search-patient">
            <input
              type="text"
              placeholder="search patient"
              value={patientCode}
              name="patientCode"
              onChange={handlePatientCode}
            />
            <button className="search-btn" onClick={findPatient}>
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: "rgb(0, 120, 215)" }}
              />
            </button>
          </div>
          <button className="add-btn" onClick={handleDisplay}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ marginRight: "3px", fontSize: "15px" }}
            />
            Add New Patient
          </button>
          <div className="result-div">
            <div className="patient-detail">
              <p>Name:</p>
              <p className="patient-name">
                {fetchedPatient
                  ? `${
                      fetchedPatient.firstName + " " + fetchedPatient.lastName
                    } `
                  : ""}
              </p>
              <p>Code:</p>
              <button className="patient-code">
                {fetchedPatient ? `${fetchedPatient.uniqueCode}` : ""}
              </button>
            </div>
            <p className="patient-tele">
              {fetchedPatient ? `${fetchedPatient.telephone}` : ""}
            </p>
            <br />
            <button className="OTP-btn" onClick={sendOTP}>
              Send OTP
            </button>
          </div>
          <div className="confirmation-div">
            <input placeholder="Enter OTP code here" id="otpCode-input" />
            <br />
            <button className="confirm-btn" onClick={confirmOTP}>
              Confirm
            </button>
          </div>
        </div>
        {display ? (
          <div className="add-patient-div">
            <h4>Please enter Patient information</h4>
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
              <p>Telephone</p>
              <input
                type="text"
                placeholder="07xxxxxxxx"
                required
                value={newPatient.telephone}
                onChange={handleChange}
                name="telephone"
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
              <button className="submitBtn" onClick={handleDisplay}>
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="patient-data">
            {otpCode ? (
              <div className="view-patient-data">
                <h4>Name</h4>
                <input
                  readOnly={true}
                  value={`${fetchedPatient.firstName} ${fetchedPatient.lastName}`}
                />
                <h4>Patient Code</h4>
                <input
                  id="uniqueCode"
                  readOnly={true}
                  value={`${fetchedPatient.uniqueCode}`}
                />
                <h4>Date of Birth</h4>
                <input
                  readOnly={true}
                  value={`${fetchedPatient.dateOfBirth}`}
                />
                <h4>Age</h4>
                <input readOnly={true} value={age} />
                <h4>Location</h4>
                <input readOnly={true} value={`${fetchedPatient.location}`} />
                <h4>Telephone</h4>
                <input readOnly={true} value={`${fetchedPatient.telephone}`} />
                <h4>Next of Kin</h4>
                <input readOnly={true} value={`${fetchedPatient.nextOfKin}`} />
                <br />
              </div>
            ) : (
              <h3>Patient Data will be displayed here</h3>
            )}
          </div>
        )}
      </div>
    </>
  );
}
