import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/auth.context";
import "./CourseCreate.css";

export default function CourseCreate(props) {
  const [courseName, setCourseName] = useState(props.course.courseName);
  const [description, setDescription] = useState(props.course.description);
  const [selectedTopics, setSelectedTopics] = useState([props.course.topics]);
  const [location, setLocation] = useState(props.course.location);
  const [duration, setDuration] = useState(props.course.duration);
  const [schedule, setSchedule] = useState(props.course.schedule);
  const [preRequisites, setPreRequisites] = useState(
    props.course.preRequisites
  );
  const [cost, setCost] = useState(props.course.cost);
  const [link, setLink] = useState(props.course.link);
  const { courseId } = useParams();
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const orderTopics = function order(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const handleChange = (event) => {
    // updating an object instead of a Map
    setSelectedTopics({
      ...selectedTopics,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseDetails = {
      courseName,
      description,
      selectedTopics,
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
        setSuccessMsg(response.data.successMessage);
        props.updateCourses();
        navigate(`/courses/my-courses`);
        window.scrollTo(0, 0);
      })
      .catch((e) =>
        console.log("An error occured while editing the course.", e)
      );
  };

  return (
    <div className="CreateCourse">
      <h5>Publish the details of a new course below:</h5>

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
            placeholder="Our Data Science course will transform you into a Data Scientist in a matter of weeks. You will analyse data to make decisions, implement Machine Learning models and build a practical data application."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>Topics:</label> <br />
        <div className="TopicsChecklistDiv">
          {props.topicsArray
            .map((topic) => (
              <label className="TopicsChecklist" key={topic._id}>
                {topic.topicName}

                <input
                  type="checkbox"
                  name={topic._id}
                  value={selectedTopics[topic._id]}
                  onChange={handleChange}
                />
              </label>
            ))
            .sort(orderTopics)}
        </div>
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
            name="curation"
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
          Price (in Euros): <br />
          <input
            type="number"
            min={0}
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
        <button type="submit">Publish Your Course</button>
      </form>
    </div>
  );
}
