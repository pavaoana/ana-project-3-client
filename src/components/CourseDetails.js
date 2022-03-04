import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function CourseDetails(props) {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  const getCourse = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
      .then((response) => {
        const thisCourse = response.data;
        setCourse(thisCourse);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className="CourseDetails">
      {course && (
        <>
          <h3>{course.courseName}</h3>
          <p>{course.description}</p>
        </>
      )}

      {/* <TopicCreate 
          updateCourseWithTopic={getCourseDetails}
         courseId={courseId}
       /> */}

      <div className="course-card">
        {/* <div className="course-img">
              <img src={course.image} alt={course.courseName} />
            </div> */}
        <div className="course-details">
          {/* {course &&
                course.topics.map((topic) => (
                  <li className="TopicCard inCourse" key={topic._id}>
                    <h4>{topic.title}</h4>
                    <p>{topic.description}</p>
                  </li>
                ))}
              <p>
                Click{" "}
                <a href={course.link} target="_blank">
                  here
                </a>{" "}
                if you want to know more.
              </p> */}
        </div>
      </div>

      <Link to={`/courses/edit/${courseId}`}>
        <button>Edit Course</button>
      </Link>
      <Link to="/courses/all">
        <button>Go back to all courses</button>
      </Link>
    </div>
  );
}
