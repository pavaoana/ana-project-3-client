import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context";
import "./CourseCreate.css";

export default function CourseCreate(props) {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  // const [topics, setTopics] = useState([]);
  // const [image, setImage] = useState(); // ???
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [schedule, setSchedule] = useState();
  const [preRequisites, setPreRequisites] = useState("");
  const [cost, setCost] = useState(0);
  const [link, setLink] = useState("");

  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

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
      .post(`${process.env.REACT_APP_API_URL}/courses/add`, courseDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.updateCourses();
        navigate("/courses/all");
      })
      .catch((e) =>
        console.log("An error occured while creating a new course.", e)
      );
  };

  return (
    <div className="CreateCourse">
      <h3>Fill the form below to publish the details of a new course:</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Course Name: <br />
          <input
            type="text"
            required={true}
            placeholder="Data Science Bootcamp"
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
        <label>
          Location: <br />
          <input
            type="text"
            required={true}
            placeholder="Lisbon"
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
            placeholder="6 months"
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
            placeholder="Part-Time"
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
            placeholder="None"
            name="preRequisites"
            value={preRequisites}
            onChange={(e) => setPreRequisites(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cost (Euros): <br />
          <input
            type="number"
            min={0}
            required={true}
            placeholder="Free"
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
            placeholder="http://www.google.com/courses/data-analytics"
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
