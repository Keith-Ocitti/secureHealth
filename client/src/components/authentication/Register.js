import React, { useState } from "react";
import "../../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
  });

  const navigate = useNavigate();

  // function to handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  // function to handle registration
  const register = () => {
    const baseURL = "http://localhost:5000/api/v1/register";
    axios
      .post(baseURL, { ...formData })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
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
      <p>Welcome! Please Register</p>

      <div className="input-holder">
        <p>First Name</p>
        <input
          type="text"
          required
          value={formData.firstName}
          onChange={handleChange}
          name="firstName"
        />
      </div>
      <div className="input-holder">
        <p>Last Name</p>
        <input
          type="text"
          required
          value={formData.lastName}
          onChange={handleChange}
          name="lastName"
        />
      </div>
      <div className="input-holder">
        <p>Email</p>
        <input
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          name="email"
        />
      </div>
      <div className="input-holder">
        <p>Telephone</p>
        <input
          type="text"
          placeholder="+2567000000000"
          required
          value={formData.telephone}
          onChange={handleChange}
          name="telephone"
        />
      </div>
      <div className="input-holder">
        <p>Password</p>
        <input
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
      </div>
      <button className="signup-btn" onClick={register}>
        Register
      </button>
      <p>
        Already have an account?
        <button className="login-btn">
          <Link to="/">Login</Link>
        </button>
      </p>
    </div>
  );
};

export default Register;
