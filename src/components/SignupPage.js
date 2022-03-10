import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

import "./CourseCreate.css";
import "./Login.css";

export default function SignupPage() {
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOrgName = (e) => setOrganizationName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const orgDetails = { organizationName, email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, orgDetails)
      .then((response) => {
        navigate("/login");
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/courses/add");
      })
      .catch((error) => {
        const errMessage = error.response.data.message;
        console.log("Error creating a new Organization", message);
        setMessage(errMessage);
      });
  };

  return (
    <div className="SignupPage">
      <h5>If you represent an Organization, you can register below:</h5>

      {message && (
        <div className="error-div-signup">
          <p className="error">{message}</p>
        </div>
      )}

      <form onSubmit={handleSignupSubmit}>
        <label>
          Name of Your Organization:
          <br />
          <input
            type="text"
            required="true"
            placeholder="Google LLC"
            name="organizationName"
            value={organizationName}
            onChange={handleOrgName}
          />
        </label>{" "}
        <br />
        <label>
          Email:
          <br />
          <input
            type="email"
            required="true"
            placeholder="google@google.com"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            required="true"
            name="password"
            placeholder="********"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        If you already have account,{" "}
        <Link class="orange-link" to={"/login"}>
          login here
        </Link>
        .
      </p>
    </div>
  );
}
