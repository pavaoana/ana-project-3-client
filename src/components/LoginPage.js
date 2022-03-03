import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

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
        navigate("/courses/create");
      })
      .catch((error) => {
        const message = error.response.data.errorMessage;
        console.log("An error occured while trying to login:", message);
        setMessage(message);
      });
  };

  return (
    <div className="LoginPage">
      <h4>Fill the form below to login:</h4>

      {message && <p className="error">{message}</p>}

      <form onSubmit={handleLoginSubmit}>
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
        <button type="submit">Login</button>
      </form>

      <p>
        If you don't have an account yet,{" "}
        <Link to={"/signup"}>register here</Link>.
      </p>
    </div>
  );
}
