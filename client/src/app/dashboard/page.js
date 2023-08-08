"use client";
import "./style.css";
import SideBar from "./sidebar";
import MainPage from "./mainpage";
import { useState, useReducer } from "react";

export default function Dashboard() {
  const reducer = (state, action) => {
    // console.log("clicked!");
    if (action.type === "overview") {
      return {
        overviewTab: true,
        patientTab: false,
        statisticTab: false,
        DiagnosisTab: false,
        schedulesTab: false,
        pastVisitsTab: false,
      };
    } else if (action.type === "patient") {
      return {
        overviewTab: false,
        patientTab: true,
        statisticTab: false,
        DiagnosisTab: false,
        schedulesTab: false,
        pastVisitsTab: false,
      };
    } else if (action.type === "statistic") {
      return {
        overviewTab: false,
        patientTab: false,
        statisticTab: true,
        DiagnosisTab: false,
        schedulesTab: false,
        pastVisitsTab: false,
      };
    } else if (action.type === "diagnosis") {
      return {
        overviewTab: false,
        patientTab: false,
        statisticTab: false,
        DiagnosisTab: true,
        schedulesTab: false,
        pastVisitsTab: false,
      };
    } else if (action.type === "schedules") {
      return {
        overviewTab: false,
        patientTab: false,
        statisticTab: false,
        DiagnosisTab: false,
        schedulesTab: true,
        pastVisitsTab: false,
      };
    } else if (action.type === "pastVisit") {
      return {
        overviewTab: false,
        patientTab: false,
        statisticTab: false,
        DiagnosisTab: false,
        schedulesTab: false,
        pastVisitsTab: true,
      };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    overviewTab: false,
    patientTab: true,
    DiagnosisTab: false,
    schedulesTab: false,
    astVisitsTab: false,
  });
  // console.log(state);
  return (
    <div className="main-container">
      <SideBar state={state} dispatch={dispatch} />
      <MainPage state={state} />
    </div>
  );
}
