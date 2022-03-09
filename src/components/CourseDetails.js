import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";
import { AuthContext } from "../context/auth.context";
import "./CourseDetails.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function CourseDetails(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
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
    //const storedToken = getToken();
  };

  const deleteProject = () => {
    const storedToken = getToken();

    axios
      .delete(`${process.env.REACT_APP_API_URL}/courses/delete/${courseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.updateCourses();
        navigate("/courses/my-courses");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {showEditForm ? (
        <EditCourse
          course={course}
          topicsArray={props.topicsArray}
          updateCourses={props.updateCourses}
        />
      ) : (
        <div class="row space-above" className="CourseDetails">
          {course && (
            <div class="col-sm-4 row details-box">
              <div class="card">
                <div class="card-body" key={course._id}>
                  <h4 class="card-title h4-title-course">
                    {course.courseName}{" "}
                  </h4>
                  {course.author.organizationName && (
                    <>
                      <p class="card-text name-org">
                        {course.author.organizationName}
                      </p>
                    </>
                  )}
                  {course &&
                    course.topics.map((topic) => (
                      <>
                        <p key={topic._id} className="TopicDetails">
                          <Popup
                            contentStyle={{
                              width: "fit-content",
                              maxWidth: "25rem",
                              backgroundColor: "#cbdcfa",
                              padding: "1rem",
                              fontSize: "11pt",
                            }}
                            trigger={
                              <button className="TopicButton">
                                {topic.topicName}
                              </button>
                            }
                            position="bottom center"
                          >
                            {(close) => (
                              <div>
                                {topic.description}
                                <a className="close" onClick={close}>
                                  &times;
                                </a>
                              </div>
                            )}
                          </Popup>
                        </p>
                      </>
                    ))}
                  <p class="card-text left">{course.description}</p>
                  <p class="card-text left">
                    <b>Location:</b> {course.location}
                  </p>
                  <p class="card-text left">
                    <b>Duration:</b> {course.duration}
                  </p>
                  <p class="card-text left">
                    <b>Schedule:</b> {course.schedule}
                  </p>
                  {course.preRequisites && (
                    <>
                      <p class="card-text left">
                        <b>Pre-Requisites:</b> {course.preRequisites}
                      </p>
                    </>
                  )}
                  {course.cost === 0 ? (
                    <p class="card-text left">
                      <b>Price: </b> Free
                    </p>
                  ) : (
                    <p class="card-text left">
                      <b>Price: </b> € {course.cost}
                    </p>
                  )}
                  <p class="card-text">
                    <a href={course.link} target="_blank" className="ColorLink">
                      Take me to the course!
                    </a>
                  </p>
                  {isLoggedIn && user._id === course.author._id && (
                    <>
                      <Link to="/courses/my-courses">
                        <button className="GoBack">
                          « Go back to your courses
                        </button>
                      </Link>
                      <button onClick={handleEditForm} className="EditButton">
                        Update Course
                      </button>

                      <button className="DeleteButton" onClick={deleteProject}>
                        Delete Course
                      </button>
                    </>
                  )}
                  {isLoggedIn && user._id !== course.author._id && (
                    <>
                      <Link to="/courses/all">
                        <button className="GoBack">
                          « Go back to all courses
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <Link to="/courses/all">
              <button className="GoBack">« Go back to all courses</button>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
