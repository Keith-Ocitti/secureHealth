import React, { useState } from "react";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState();

  // function to handle form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevformData) => {
      return {
        ...prevformData,
        [name]: value,
      };
    });
  };

  // function to login
  const baseUrl = "http://localhost:5000/api/v1/login";
  const navigate = useNavigate();
  const login = () => {
    axios
      .post(baseUrl, { ...formData })
      .then((response) => {
        if (response.status === 202) {
          sessionStorage.setItem("token", response.data.token);
          navigate("/searchPatient");
        }
      })
      .catch((err) => {
        setLoggedIn("Invalid credentials");
        navigate("/");
      });
  };

  return (
    <>
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

        <p>Welcome! Please Login</p>

        <div className="loginContainer">
          <div className="inputHolder">
            <p>Staff Email</p>
            <input
              type="email"
              required
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>

          <div className="inputHolder">
            <p>Password</p>
            <input
              type="password"
              required
              onChange={handleChange}
              value={formData.password}
              name="password"
            />

            <button className="LoginBtn" onClick={login}>
              Login
            </button>
          </div>
          <p className="invalid">{loggedIn ? loggedIn : ""}</p>
          <p>
            Don't have an account yet?
            <button className="register">
              <Link to="/register">Register</Link>
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
