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
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mx-auto order-0">
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
                  <div class="ml-auto">
                    <li class="nav-item">
                      <button
                        className="LogoutBtn"
                        class="nav-link nav-right"
                        onClick={logOutUser}
                      >
                        Logout
                      </button>
                    </li>
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <>
                  {" "}
                  <div className="align-right">
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
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
