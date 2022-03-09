import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";
import { AuthContext } from "../context/auth.context";
import "./CourseDetails.css";

export default function CourseDetails(props) {
  const { isLoggedIn, user } = useContext(AuthContext);

  console.log("user:", user);

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
        console.log("thisCourse", thisCourse);
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
        props.updateCourses();
        navigate("/courses/all");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {showEditForm ? (
        <EditCourse course={course} topicsArray={props.topicsArray} />
      ) : (
        <div className="CourseDetails">
          {course && (
            <>
              <h3>{course.courseName}</h3>
              {course.author.organizationName && (
                <>
                  <p>{course.author.organizationName}</p>
                </>
              )}
              <p>{course.description}</p>
              {course &&
                course.topics.map((topic) => (
                  <li className="TopicCard inCourse" key={topic._id}>
                    <Link to={`/topics/${topic._id}`}>{topic.topicName} </Link>
                  </li>
                ))}
              <p>Location: {course.location}</p>
              <p>Duration: {course.duration}</p>
              <p>Schedule: {course.schedule}</p>
              {course.preRequisites && (
                <>
                  <p>Pre-Requisites: {course.preRequisites}</p>
                </>
              )}
              {course.cost === 0 ? (
                <p>Price: Free</p>
              ) : (
                <p>Price: €{course.cost}</p>
              )}
              <p>
                Click{" "}
                <a href={course.link} target="_blank">
                  here
                </a>{" "}
                if you want to know more.
              </p>{" "}
            </>
          )}
          <br />
          {user && (
            <>
              {isLoggedIn && (
                <>
                  <button onClick={handleEditForm} className="EditButton">
                    Update Course
                  </button>{" "}
                  <button className="DeleteButton" onClick={deleteProject}>
                    Delete Course
                  </button>
                </>
              )}
            </>
          )}
          <br />
          <Link to="/courses/all">
            <button className="GoBack">Go back to all courses</button>
          </Link>
        </div>
      )}
    </>
  );
}
