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
      <div class="container space-above">
        {props.courses.sort(compareDates).map((course) => {
          return (
            <div class="row">
              <div class="col-sm">
                <div class="card">
                  <div class="card-body other-color-cards" key={course._id}>
                    <h4 class="card-title h4-title-course">
                      {course.courseName}
                    </h4>
                    <p class="card-text name-org">
                      {course.author.organizationName}
                    </p>
                    {course.cost === 0 ? (
                      <h6 class="money-bold">Free</h6>
                    ) : (
                      <h6>€{course.cost}</h6>
                    )}
                    <Link to={`/courses/${course._id}`} class="card-link">
                      See Details
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
