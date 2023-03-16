import React from "react";
import { useReducer } from "react";
import "../styles/App.css";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import AddNewPatient from "./patient/AddNewPatient";
import Patient from "./patient/Patient";
import SearchPatient from "./patient/SearchPatient";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const reducer = (patient, action) => {
    if (action.type === "ready") {
      return { ...action.payload };
    }
  };
  const [patient, dispatch] = useReducer(reducer, {});
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/searchPatient"
            element={<SearchPatient dispatch={dispatch} />}
          />
          <Route path="/patient" element={<Patient patient={patient} />} />
          <Route
            path="/addPateint"
            element={<AddNewPatient dispatch={dispatch} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
