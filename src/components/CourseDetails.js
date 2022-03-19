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
        <EditCourse
          course={course}
          topicsArray={props.topicsArray}
          updateCourses={props.updateCourses}
        />
      ) : (
        <div class="container space-above" className="CourseDetails">
          {course && (
            <div class="row detail-row">
              <div class="col-sm different-size col-detail">
                <div class="card detail-card">
                  <div
                    class="card-body other-color-cardz this-background"
                    key={course._id}
                  >
                    <h4 class=" h4-title-det">{course.courseName}</h4>
                    {course.author.organizationName && (
                      <>
                        <p class="name">{course.author.organizationName}</p>
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
                                backgroundColor: "#126E82",
                                color: "white",
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
                                <div className="topic-description">
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

                    <h2 class="left normal-text">{course.description}</h2>
                    <h2 class=" left normal-text">
                      <b>Location:</b> {course.location}
                    </h2>
                    <h2 class="left normal-text">
                      <b>Duration:</b> {course.duration}
                    </h2>
                    <h2 class=" left normal-text">
                      <b>Schedule:</b> {course.schedule}
                    </h2>
                    {course.preRequisites && (
                      <>
                        <h2 class=" left normal-text">
                          <b>Pre-Requisites:</b> {course.preRequisites}
                        </h2>
                      </>
                    )}
                    {course.cost === 0 ? (
                      <h2 class=" left normal-text">
                        <b>Price: </b> Free
                      </h2>
                    ) : (
                      <h2 class=" left normal-text">
                        <b>Price: </b> € {course.cost}
                      </h2>
                    )}
                    <p class="card-text">
                      <a
                        href={course.link}
                        target="_blank"
                        className="ColorLink"
                      >
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

                        <button
                          className="DeleteButton"
                          onClick={deleteProject}
                        >
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
