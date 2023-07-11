import Image from "next/image";
import Hospital from "../images/hospital.jpg";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleUser,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  return (
    <div>
      <div className="login-container">
        <div className="img-container">
          <Image src={Hospital} className="img" alt="img" />
        </div>
        <div className="input-holder">
          <div className="div1">
            <i class="bi bi-person-circle login-icon"></i>
          </div>
          <div className="div2">
            <label>Doctor's ID</label>
            <input type="text" placeholder="Doctor's ID" />
            <br />
            <label>Password</label>
            <input type="password" placeholder="password" />
            <br />
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
