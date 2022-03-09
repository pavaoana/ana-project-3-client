import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <nav class="navbar navbar-expand fixed-top ">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            NCN
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/courses/all" class="nav-link">
                  Courses
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  {" "}
                  <li class="nav-item">
                    <Link to="/courses/my-courses" class="nav-link nav-right">
                      My Courses
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/courses/add" class="nav-link nav-right">
                      Add a Course
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/topics/add" class="nav-link nav-right">
                      Add a Topic
                    </Link>
                  </li>
                  <li class="nav-item">
                    <button
                      className="LogoutBtn"
                      class="nav-link nav-right"
                      onClick={logOutUser}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  {" "}
                  <li class="nav-item">
                    <Link to="/signup" class="nav-link nav-right">
                      Register
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/login" class="nav-link nav-right">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
