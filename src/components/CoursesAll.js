import React from "react";
import { Link } from "react-router-dom";

export default function CoursesAll(props) {
  function compareDates(a, b) {
    const aCreatedDate = new Date(a.createdAt);
    const bCreatedDate = new Date(b.createdAt);
    if (aCreatedDate < bCreatedDate) return 1;
    if (aCreatedDate > bCreatedDate) return -1;
    return 0;
  }

  return (
    <div className="AllCourses">
      {props.courses.sort(compareDates).map((course) => {
        return (
          <div className="course-card" key={course._id}>
            {/* <div className="course-img">
              <img src={course.image} alt={course.courseName} />
            </div> */}
            <div className="course-details">
              <h3>{course.courseName}</h3>
              <p>{course.author}</p>
              {course.cost === 0 ? <p>Free</p> : <p>€{course.cost}</p>}
              <Link to={`/courses/${course._id}`}>
                <h3>See Details</h3>
              </Link>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
