import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context";

export default function CourseCreate(props) {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  // const [topics, setTopics] = useState([]);
  // const [image, setImage] = useState(); // ???
  // const [location, setLocation] = useState("");
  // const [duration, setDuration] = useState("");
  // const [schedule, setSchedule] = useState(); // ??
  // const [careerServices, setCareerServices] = useState(); // ??
  // const [jobGuaranteed, setJobGuaranteed] = useState(); // ??
  // const [preRequisites, setPreRequisites] = useState("");
  // const [cost, setCost] = useState(0);
  // const [link, setLink] = useState("");

  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseDetails = {
      courseName,
      description,
      // topics,
      // location,
      // duration,
      // preRequisites,
      // cost,
      // link,
    }; // add the ones that were commented: image, schedule, careerServices, jobGuaranteed

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
          Course Name:{" "}
          <input
            type="text"
            required={true}
            placeholder="e.g.: Data Science Bootcamp"
            name="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:{" "}
          <textarea
            type="text"
            required={true}
            placeholder="e.g.: Our Data Science course will transform you into a Data Scientist in a matter of weeks. You will analyse data to make decisions, implement Machine Learning models and build a practical data application."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
