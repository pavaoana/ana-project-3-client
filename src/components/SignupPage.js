import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleOrgName = (e) => setOrganizationName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const orgDetails = { organizationName, email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, orgDetails)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const message = error.response.data.errorMessage;
        console.log("Error creating a new Organization", message);
        setMessage(message);
      });
  };

  return (
    <div className="SignupPage">
      <h4>If you represent an Organization, you can register below:</h4>
      {message && <p className="error">{message}</p>}
      <form onSubmit={handleSignupSubmit}>
        <label>
          Name of Your Organization:{" "}
          <input
            type="text"
            required="true"
            placeholder="e.g.: Google LLC"
            name="organizationName"
            value={organizationName}
            onChange={handleOrgName}
          />
        </label>{" "}
        <br />
        <label>
          Email:{" "}
          <input
            type="email"
            required="true"
            placeholder="e.g.: google@google.com"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <br />
        <label>
          Password:{" "}
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
        <button type="submit">Register!</button>
      </form>
      <p>
        If you already have account, <Link to={"/login"}>login here</Link>.
      </p>
    </div>
  );
}
