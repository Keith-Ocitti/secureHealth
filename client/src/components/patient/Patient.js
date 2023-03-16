import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/patient.css";
import { useNavigate } from "react-router";

const Patient = ({ patient }) => {
  const [diagnosis, setDiagnosis] = useState([]);
  const data = { ...patient };

  // get patient age
  let yearOfBirth = Number(data.patient.dateOfBirth.split("/")[0]);
  let currentYear = new Date().getFullYear();
  const age = currentYear - yearOfBirth;

  // Get diagnosis
  useEffect(() => {
    if (data.diagnosisRecord) {
      setDiagnosis((prevData) =>
        data.diagnosisRecord.map((diagnosis) => {
          return (
            <div>
              <p>
                <b>Date: </b>
                {diagnosis.createdAt}
              </p>
              <p>
                <b>Diagnosis</b>
              </p>
              <p>{diagnosis.diagnosis}</p>
              <p>
                <b>Treatment</b>
              </p>
              <p>{diagnosis.treatment}</p>
              <hr />
            </div>
          );
        })
      );
    }
  }, []);

  // save record
  const [record, setRecord] = useState({
    patientCode: `${data.patient.uniqueCode}`,
    diagnosis: "",
    treatment: "",
  });

  //handle change function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecord((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  // save Record
  const saveRecord = () => {
    const baseUrl = "http://localhost:5000/api/v1/diagnosis";
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(baseUrl, { ...record }, config)
      .then((resp) => console.log("sucesss"))
      .catch((err) => console.log(err));
  };
  // handle the back btn
  const navigate = useNavigate();
  const back = () => {
    navigate("/searchPatient");
  };

  // handle logout
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="main-container">
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
      <hr />
      <div className="patient-container">
        <div className="bioData">
          <p>
            <b>Patient Name</b>
          </p>
          <p>{`${data.patient.firstName} ${data.patient.lastName}`}</p>
          <hr />
          <p>
            <b>Patient Code</b>
          </p>
          <p>{data.patient.uniqueCode}</p>
          <hr />
          <p>
            <b>Date of Birth</b>
          </p>
          <p>{data.patient.dateOfBirth}</p>
          <hr />
          <p>
            <b>Age</b>
          </p>
          <p>{age}</p>
          <hr />
          <p>
            <b>Next of Kin</b>
          </p>
          <p>{data.patient.nextOfKin}</p>
          <hr />
          <p>
            <b>Location</b>
          </p>
          <p>{data.patient.location}</p>
        </div>

        <div className="diagnosis">
          <div className="prevDiagnosis">
            {diagnosis ? diagnosis : "No previous records"}
          </div>
          <hr />
          <div className="currentDiagnosis">
            <p>
              <b>Add new Diagnosis and Treatment here</b>
            </p>
            <p>
              <b>Diagnosis</b>
            </p>
            <textarea
              value={record.diagnosis}
              onChange={handleChange}
              name="diagnosis"
            />
            <p>
              <b>Treatment</b>
            </p>
            <textarea
              value={record.treatment}
              onChange={handleChange}
              name="treatment"
            />
          </div>
          <button className="saveBtn" onClick={saveRecord}>
            Save
          </button>
          <button className="backBtn" onClick={back}>
            back
          </button>
          <button className="logoutBtn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Patient;
