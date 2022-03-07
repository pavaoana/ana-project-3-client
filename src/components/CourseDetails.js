import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";
import { AuthContext } from "../context/auth.context";

export default function CourseDetails(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  const { courseId } = useParams();
  let courseDetails;
  const { courses } = props;
  if (courses) {
    courseDetails = courses.find((course) => course._id === courseId);
  }

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

  const handleEditForm = () => {
    setShowEditForm(true);
  };

  const deleteProject = () => {
    const storedToken = getToken();

    axios
      .delete(`${process.env.REACT_APP_API_URL}/courses/delete/${courseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/courses/all");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {showEditForm ? (
        <EditCourse course={course} />
      ) : (
        <div className="CourseDetails">
          {course && (
            <>
              {/* <div className="course-img">
              <img src={course.image} alt={course.courseName} />
            </div> */}
              <h3>{course.courseName}</h3>
              {course.author && (
                <>
                  <p>{course.author}</p>
                </>
              )}
              <p>{course.description}</p>
              {course &&
                course.topics.map((topic) => (
                  <li className="TopicCard inCourse" key={course.topics._id}>
                    <p>{course.topics.topicName}</p>
                  </li>
                ))}
              <p>{course.location}</p>
              <p>{course.duration}</p>
              <p>{course.schedule}</p>
              {course.preRequisites && (
                <>
                  <p>{course.preRequisites}</p>
                </>
              )}
              {course.cost === 0 ? <p>Free</p> : <p>€{course.cost}</p>}
              <p>
                Click{" "}
                <a href={course.link} target="_blank">
                  here
                </a>{" "}
                if you want to know more.
              </p>{" "}
            </>
          )}

          {/* <TopicCreate 
          updateCourseWithTopic={getCourseDetails}
         courseId={courseId}
       /> */}

          {user && (
            <>
              {isLoggedIn && (
                <>
                  <button onClick={handleEditForm}>Edit Course</button>{" "}
                  <button className="deleteButton" onClick={deleteProject}>
                    Delete Course
                  </button>
                </>
              )}
            </>
          )}
          <Link to="/courses/all">
            <button>Go back to all courses</button>
          </Link>
        </div>
      )}
    </>
  );
}
