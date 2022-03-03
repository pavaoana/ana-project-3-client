import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="HomePageTitle">
        <h1>Lorem Ipsum</h1>
      </div>
      <div>
        <h4>
          If you're looking for a new career, choose a course{" "}
          <Link to={"/courses/all"}>here</Link>.
        </h4>
        <h4>
          If you're an Organization, <Link to={"/signup"}> register here</Link>{" "}
          or <Link to={"/login"}>login</Link> to publish your courses.
        </h4>
      </div>
    </div>
  );
}
