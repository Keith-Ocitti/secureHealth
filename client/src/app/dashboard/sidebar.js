import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBriefcaseClock,
  faCalendarAlt,
  faCircleH,
  faClipboardList,
  faGear,
  faPlusCircle,
  faRocket,
  faSignal,
  faUser,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function SideBar({ dispatch }) {
  const router = useRouter();
  const logout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div className="side-bar">
      <div className="title">
        <FontAwesomeIcon icon={faPlusCircle} className="title-icon" />
        <h2>Secure Health</h2>
      </div>
      {/* <button onClick={() => dispatch({ type: "overview" })} name="overview">
        <FontAwesomeIcon
          icon={faBars}
          className="icon"
          style={{ color: "orange" }}
        />
        Overview
      </button> */}
      <button onClick={() => dispatch({ type: "patient" })} name="patient">
        <FontAwesomeIcon
          icon={faUser}
          className="icon"
          style={{ color: "purple" }}
        />
        Patient
      </button>

      <button onClick={() => dispatch({ type: "pastVisit" })}>
        <FontAwesomeIcon
          icon={faClipboardList}
          className="icon"
          style={{ color: "orange" }}
        />
        <p>Past Visits</p>
      </button>
      <button onClick={() => dispatch({ type: "diagnosis" })}>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="icon"
          style={{ color: "green" }}
        />
        <p>Add Diagnosis</p>
      </button>
      <button onClick={() => dispatch({ type: "schedules" })}>
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="icon"
          style={{ color: "orange" }}
        />
        <p>Schedules</p>
      </button>
      <button onClick={logout}>
        <FontAwesomeIcon
          className="icon"
          icon={faUserClock}
          style={{ color: "orangered" }}
        />
        <p>Logout</p>
      </button>
    </div>
  );
}
