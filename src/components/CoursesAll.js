import React from "react";

export default function CoursesAll(props) {
  return (
    <div className="AllCourses">
      {props.courses.map((course) => {
        return (
          <div className="course-card" key={course._id}>
            <div className="course-img">
              <img src={course.image} alt={course.courseName} />
            </div>
            <div className="course-details">
              <h3>{course.courseName}</h3>
              <p>{course.description}</p>
              <p>{course.topics}</p>
              <p>Location: {course.location}</p>
              <p>Duration: {course.duration}</p>
              <p>Schedule: {course.schedule}</p>
              <p>Career Services Offered? {course.careerServices}</p>
              <p>A Job at the End? {course.jobGuaranteed}</p>
              <p>Pre-Requisites? {course.preRequisites}</p>
              <p>Price: {course.cost}</p>
              <p>
                Click{" "}
                <a href={course.link} target="_blank">
                  here
                </a>{" "}
                if you want to know more.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
