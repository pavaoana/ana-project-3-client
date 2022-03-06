import React, { useEffect } from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/auth.context";
import "./CourseCreate.css";

export default function EditCourse(props) {
  const [courseName, setCourseName] = useState(props.course.courseName);
  const [description, setDescription] = useState(props.course.description);
  // const [topics, setTopics] = useState([]);
  // const [image, setImage] = useState(); // ???
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [schedule, setSchedule] = useState();
  const [preRequisites, setPreRequisites] = useState("");
  const [cost, setCost] = useState(0);
  const [link, setLink] = useState("");

  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  const [successMsg, setSuccessMsg] = useState(null);

  // useEffect(() => {
  //   const storedToken = getToken();
  //   axios
  //     .put(`${process.env.REACT_APP_API_URL}/courses/edit/${courseId}`, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => {
  //       const thisCourse = response.data;
  //       setCourseName(thisCourse.courseName);
  //       setDescription(thisCourse.description);
  //       //add all other necessary fields
  //     })
  //     .catch((e) => console.log("An error occured while editing a course.", e));
  // }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseDetails = {
      courseName,
      description,
      // topics,
      // image,
      location,
      duration,
      schedule,
      preRequisites,
      cost,
      link,
    };

    const storedToken = getToken();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/courses/edit/${courseId}`,
        courseDetails,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        //props.updateCourses();
        console.log("response.data", response.data);
        setSuccessMsg(response.data.successMessage);
        navigate(`/courses/${courseId}`);
      });
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
      {successMsg ? (
        <h3>{successMsg}</h3>
      ) : (
        <div className="EditCourse">
          <h3>To update the selected course, change the form below:</h3>

          <form onSubmit={handleSubmit}>
            <label>
              Course Name: <br />
              <input
                type="text"
                required={true}
                name="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description: <br />
              <textarea
                type="text"
                required={true}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Location: <br />
              <input
                type="text"
                required={true}
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <br />
            <label>
              Duration: <br />
              <input
                type="text"
                required={true}
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
            <br />
            <label>
              Schedule: <br />
              <input
                type="text"
                required={true}
                name="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </label>
            <br />
            <label>
              Pre-Requisites: <br />
              <input
                type="text"
                name="preRequisites"
                value={preRequisites}
                onChange={(e) => setPreRequisites(e.target.value)}
              />
            </label>
            <br />
            <label>
              Cost: <br />
              <input
                type="number"
                required={true}
                name="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </label>
            <br />
            <label>
              Link: <br />
              <input
                type="link"
                required={true}
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Update Course</button>
          </form>
          <button className="deleteButton" onClick={deleteProject}>
            Delete Course
          </button>
        </div>
      )}
    </>
  );
}
