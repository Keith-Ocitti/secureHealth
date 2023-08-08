"use client";
import { useState } from "react";
import axios from "axios";
export default function Diagnosis() {
  const [recordData, setRecordData] = useState({
    diagnosis: "",
    medicine: "",
    examinations: "",
  });
  // function to handleChange
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecordData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const patientCode = sessionStorage.getItem("patientCode");
  const hospital = sessionStorage.getItem("hospital");
  const name = sessionStorage.getItem("name");
  const lastName = sessionStorage.getItem("lastName");

  // function to save Record
  const saveRecord = () => {
    // uniqueCode = document.getElementById("uniqueCode").value;
    const baseUrl = "http://localhost:5000/api/v1/diagnosis";
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        baseUrl,
        {
          ...recordData,
          patientCode: patientCode,
          hospital: hospital,
          doctor: `${name} ${lastName}`,
        },
        config
      )
      .then((resp) => {
        console.log("sucesss");
        alert("Diagnosis record successfully added");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-record-container">
      <div className="create-details">
        <div className="patient-doctor-div">
          <div className="create-input">
            <label>Patien Code</label>
            <input type="text" defaultValue={patientCode} />
          </div>
          <div className="create-input doct-div">
            <label>Doctor</label>
            <input type="text" defaultValue={`Dr.${name} ${lastName}`} />
          </div>
        </div>
        <div className="create-input">
          <label>Examinations</label>
          <textarea
            onChange={handleChange}
            value={recordData.examinations}
            name="examinations"
          ></textarea>
        </div>
        <div className="create-input">
          <label>Diagnosis</label>
          <textarea
            onChange={handleChange}
            value={recordData.diagnosis}
            name="diagnosis"
          ></textarea>
        </div>
        <div className="create-input">
          <label>Medicine</label>
          <textarea
            onChange={handleChange}
            value={recordData.medicine}
            name="medicine"
            className="med-text"
          ></textarea>
        </div>

        <div className="create-input">
          <label>Hospital</label>
          <input type="text" defaultValue={hospital} />
        </div>
        <button className="create-diag-btn" onClick={saveRecord}>
          Save Record
        </button>
      </div>
    </div>
  );
}
