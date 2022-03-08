import React from "react";
import { Link } from "react-router-dom";
import "./CoursesAll.css";

export default function CoursesAll(props) {
  function compareDates(a, b) {
    const aCreatedDate = new Date(a.createdAt);
    const bCreatedDate = new Date(b.createdAt);
    if (aCreatedDate < bCreatedDate) return 1;
    if (aCreatedDate > bCreatedDate) return -1;
    return 0;
  }

  return (
    <>
      <div class="row space-above">
        {props.courses.sort(compareDates).map((course) => {
          return (
            <div class="col-sm-4 row">
              <div class="card">
                <div class="card-body" key={course._id}>
                  <h4 class="card-title h4-title-course">
                    {course.courseName}
                  </h4>
                  <p class="card-text name-org">
                    NAME OF ORGANIZATION GOES HERE
                  </p>
                  {course.cost === 0 ? (
                    <p class="money-bold">Free!</p>
                  ) : (
                    <p class="money-bold">€{course.cost}</p>
                  )}
                  <Link to={`/courses/${course._id}`} class="card-link">
                    See Details
                  </Link>{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
