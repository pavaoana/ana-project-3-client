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

      <div className="Container">
        <div className="Choose">
          <p>
            <span className="Highlight">Looking for a new career?</span> Choose
            a course <Link to={"/courses/all"}>here</Link>.
          </p>
        </div>
        <div className="Organization">
          <p>
            If you're an <span className="Highlight">Organization</span>,{" "}
            <Link to={"/signup"}> register</Link> or{" "}
            <Link to={"/login"}>login</Link> to publish your courses.
          </p>
        </div>
      </div>
    </div>
  );
}
