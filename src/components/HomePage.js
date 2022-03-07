import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="HomePageTitle">
        <h1>
          New Career <span className="TitleSpan">Now</span>
        </h1>
      </div>
      <div className="row-mother">
        <div class="row">
          <div class="column">
            <div class="card">
              <h3>
                <span className="Highlight">Looking for a new career?</span>
              </h3>
              <p>
                Choose a course <Link to={"/courses/all"}>here</Link>.
              </p>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <h3>
                Are you an <span className="Highlight">Organization</span>?
              </h3>
              <p>
                <Link to={"/signup"}> Register</Link> to publish your courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
