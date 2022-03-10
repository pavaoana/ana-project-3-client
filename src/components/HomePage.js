import React from "react";
import { Link } from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <div class="description">
        <div className="HomePageTitle">
          <h1>
            New Career <span className="TitleSpan">Now</span>
          </h1>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <div class="card border-orange more-padding">
            <div class="card-body">
              <h4 class="card-title">
                Looking for a <b>new career</b>?
              </h4>
              <p class="card-text">
                Choose a course{" "}
                <Link class="orange-link" to={"/courses/all"}>
                  here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card border-orange more-padding">
            <div class="card-body">
              <h4 class="card-title">
                Are you an <b>Organization</b>?
              </h4>
              <p class="card-text">
                <Link class="orange-link" to={"/signup"}>
                  {" "}
                  Register
                </Link>{" "}
                to publish your courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
