"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./style.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendDiv, setSendDiv] = useState(true);
  const [phoneDiv, setPhoneDiv] = useState(false);
  const [otpDiv, setOtpDiv] = useState(false);
  const [resetDiv, setResetDiv] = useState(false);
  const router = useRouter();

  // find doctor
  const findDoctor = () => {
    console.log("clicked");
    let email = document.getElementById("email").value;
    let baseUrl = "http://localhost:5000/api/v1/getDoctor";
    axios
      .post(baseUrl, { email: email })
      .then((res) => {
        console.log(res);
        console.log(res.data.phone);
        setPhoneNumber(res.data.phone);
        setPhoneDiv(true);
        setSendDiv(false);
      })
      .catch((err) => {
        console.log(err);
        alert(`No user found or check your internet connection`);
      });
  };
  // send OTP Code
  const sendOtp = () => {
    setPhoneDiv(false);
    setOtpDiv(true);
  };

  // confirm OTP
  const confrimOTP = () => {
    let userCode = document.getElementById("otp-code").value;
    if (userCode == 55555) {
      setOtpDiv(false);
      setResetDiv(true);
    }
  };

  // reset password
  const resetPass = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let baseUrl = "http://localhost:5000/api/v1/updateUser";
    axios
      .post(baseUrl, { email: email, password: password })
      .then((res) => {
        console.log(res);
        router.push("/");
      })
      .catch((res) => console.log(res));
    // console.log(doctorId, password);
  };

  return (
    <div className="reset-container">
      {sendDiv ? (
        <div className="send-code-div">
          <label>Enter email</label>
          <input type="email" id="email" className="input" />
          <button onClick={findDoctor} className="btn">
            Send
          </button>
        </div>
      ) : (
        ""
      )}
      {phoneDiv ? (
        <div className="phone">
          <label>Phone</label>
          <input type="text" className="input" defaultValue={phoneNumber} />
          <button onClick={sendOtp} className="btn">
            Send OTP
          </button>
        </div>
      ) : (
        ""
      )}
      {otpDiv ? (
        <div className="otp-div">
          <label>Enter OTP code sent to your phone</label>
          <input type="text" className="input" id="otp-code" />
          <button onClick={confrimOTP} className="btn">
            Confirm OTP
          </button>
        </div>
      ) : (
        ""
      )}
      {resetDiv ? (
        <div className="reset-details">
          <label>Enter email</label>
          <input type="email" className="input" id="email" />
          <label>Enter new password</label>
          <input type="password" className="input" id="password" />
          <button onClick={resetPass} className="btn reset-btn">
            Reset password
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
