import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="Navbar">
      <NavLink to="/">Home</NavLink>{" "}
      <NavLink to="/courses/all">Courses</NavLink>{" "}
      {isLoggedIn && (
        <>
          <NavLink to="/courses/add">Add a Course</NavLink>{" "}
          <NavLink to="/topics/add">Add a Topic</NavLink>{" "}
          <button onClick={logOutUser}>Logout</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Register</button>
          </Link>{" "}
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </div>
  );
}
