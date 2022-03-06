import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="Navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>{" "}
        <li>
          <NavLink to="/courses/all">Courses</NavLink>
        </li>{" "}
        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/courses/add">Add a Course</NavLink>
            </li>{" "}
            <li>
              <NavLink to="/topics/add">Add a Topic</NavLink>
            </li>{" "}
            <li>
              <button onClick={logOutUser}>Logout</button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signup">Register</Link>
            </li>{" "}
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
