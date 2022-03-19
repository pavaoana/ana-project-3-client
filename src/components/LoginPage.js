import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

import "./CourseCreate.css";
import "./Login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const orgDetails = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, orgDetails)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/courses/add");
      })
      .catch((error) => {
        const errMessage = error.response.data.message;
        console.log("An error occured while trying to login:", message);
        setMessage(errMessage);
      });
  };

  return (
    <div className="LoginPage">
      <h5>Fill the form below to login:</h5>

      {message && (
        <div className="error-div">
          <p className="error">{message}</p>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="padding-form">
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
        <button type="submit">Login</button>
      </form>

      <p>
        If you don't have an account yet,{" "}
        <Link class="orange-link" to={"/signup"}>
          register here
        </Link>
        .
      </p>
    </div>
  );
}
