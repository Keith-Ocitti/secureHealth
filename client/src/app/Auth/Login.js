"use client";
import Image from "next/image";
import Hospital from "../images/hospital.jpg";
import "./style.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [display, setDisplay] = useState(true);
  const [loggedIn, setLoggedIn] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    hospital: "",
    password: "",
    phone: "",
  });
  const handleDisplay = () => {
    setDisplay((prevData) => !prevData);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  // function to login
  const login = () => {
    const baseUrl = "http://localhost:5000/api/v1/login";
    console.log({ ...loginData });
    axios
      .post(baseUrl, { ...loginData })
      .then((response) => {
        console.log(response.data.hospital);
        // setLoggedIn(true);
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("name", response.data.name);
        sessionStorage.setItem("lastName", response.data.secondName);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("firstName", response.data.name);
        sessionStorage.setItem("hospital", response.data.hospital);
        // console.log(response.data.email);
        router.push("/dashboard");
        // console.log(response.data);
      })
      .catch((err) => {
        setLoggedIn("Invalid credentials");
        router.push("/");
      });
  };
  // function to signup
  const register = () => {
    console.log("clicked!");
    const baseURL = "http://localhost:5000/api/v1/register";
    axios
      .post(baseURL, { ...signUpData })
      .then((res) => {
        console.log("sucesss");
        alert(`User sucessfully created with id ${res.data.staff.doctorId}`);
        // router.push("/");
        setDisplay(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="login-container">
        <div className="img-container">
          <Image src={Hospital} className="img" alt="img" />
        </div>
        <div className="input-holder">
          {display ? (
            <div className="login">
              <div className="div1">
                <i className="bi bi-person-circle login-icon"></i>
              </div>
              <div className="div2">
                <h5 className="loggedErrorMsg">{loggedIn ? loggedIn : ""}</h5>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="login-input"
                  required
                  value={loginData.doctorId}
                  onChange={handleLoginChange}
                  name="email"
                />
                <br />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  className="login-input"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                  name="password"
                />
                <br />
                {loggedIn ? (
                  <p id="forgot-pass" onClick={() => router.push("/reset")}>
                    Forgot password? Reset
                  </p>
                ) : (
                  ""
                )}
                <button className="login-btn" onClick={login}>
                  Login
                </button>
              </div>
              <p className="signup-link">
                Don't have an account yet?{" "}
                <span onClick={handleDisplay}>Signup</span>
              </p>
            </div>
          ) : (
            <div className="signup">
              <div className="signup-container">
                <label>First Name</label>
                <input
                  type="text"
                  className="signup-input"
                  required
                  value={signUpData.firstName}
                  onChange={handleSignUpChange}
                  name="firstName"
                />
                <label>Last Name</label>
                <input
                  type="text"
                  className="signup-input"
                  required
                  value={signUpData.lastName}
                  onChange={handleSignUpChange}
                  name="lastName"
                />
                <label>Email</label>
                <input
                  type="text"
                  className="signup-input"
                  required
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  name="email"
                />
                <label>Hospital</label>
                <input
                  type="text"
                  className="signup-input"
                  required
                  value={signUpData.hospital}
                  onChange={handleSignUpChange}
                  name="hospital"
                />
                <label>Phone</label>
                <input
                  type="text"
                  className="signup-input"
                  required
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
                  name="phone"
                />
                <label>Password</label>
                <input
                  type="password"
                  className="signup-input"
                  required
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  name="password"
                />
                <button className="signup-btn" onClick={register}>
                  Signup
                </button>
                <p className="signup-link">
                  Already have an account?{" "}
                  <span onClick={handleDisplay}>Login</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
