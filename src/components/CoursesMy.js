import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CoursesAll.css";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function CoursesMy(props) {
  const { user } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    handleMyCourses();
  }, []);

  function compareDates(a, b) {
    const aCreatedDate = new Date(a.createdAt);
    const bCreatedDate = new Date(b.createdAt);
    if (aCreatedDate < bCreatedDate) return 1;
    if (aCreatedDate > bCreatedDate) return -1;
    return 0;
  }

  const handleMyCourses = () => {
    let myFilteredCourses = props.courses.filter(
      (course) => user._id === course.author._id
    );
    setMyCourses(myFilteredCourses);
  };

  if (!myCourses) {
    return <h3>Loading ...</h3>;
  }
  return (
    <>
      {myCourses.length > 0 ? (
        <div class="container space-above">
          {myCourses.sort(compareDates).map((course) => {
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
                        <p class="money-bold">€{course.cost}</p>
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
      ) : (
        <div class="space-above-extra">
          <h5 className="less">No courses yet.</h5>
          <Link to="/courses/add">
            <button className="GoBack empty">Create a Course</button>
          </Link>
        </div>
      )}
    </>
  );
}
