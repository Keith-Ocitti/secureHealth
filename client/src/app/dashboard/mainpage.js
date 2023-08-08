"use client";
import {
  faBell,
  faMessage,
  faPhoneVolume,
  faSearch,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Overview from "./overview";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Patient from "./patient";
import { useReducer, useState } from "react";
import Statistics from "./statistic";
import Schedules from "./schedules";
import PastVisits from "./pastVisits";
import Diagnosis from "./diagnosis";
import { useRouter } from "next/navigation";

export default function MainPage({ state }) {
  const router = useRouter();
  const loggedIn = sessionStorage.getItem("loggedIn");
  if (!loggedIn) {
    router.push("/");
  }
  const reducer = (patient, action) => {
    if (action.type === "ready") {
      return { ...action.payload };
    }
  };

  const [patient, dispatch] = useReducer(reducer, {});
  // console.log(state);
  const {
    overviewTab,
    patientTab,
    statisticTab,
    DiagnosisTab,
    schedulesTab,
    pastVisitsTab,
  } = state;
  // console.log(overviewTab, patientTab);

  const renderElement = () => {
    if (overviewTab) {
      return <Overview />;
    }
    if (patientTab) {
      return <Patient patient={patient} dispatch={dispatch} />;
    }
    if (statisticTab) {
      return <Statistics />;
    }
    if (DiagnosisTab) {
      return <Diagnosis />;
    }
    if (schedulesTab) {
      return <Schedules patient={patient.patient} />;
    }
    if (pastVisitsTab) {
      return <PastVisits diagnosis={patient.diagnosisRecord} />;
    }
  };
  let name = sessionStorage.getItem("name");
  return (
    <div className="main-page-container">
      <div className="header">
        <h2>{`Hello, Dr. ${name}`}</h2>

        <h3>{new Date().toDateString()}</h3>
      </div>
      {renderElement()}
    </div>
  );
}
