import React, { useEffect } from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/auth.context";

export default function EditCourse(props) {
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

  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

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
      // location,
      // duration,
      // preRequisites,
      // cost,
      // link,
    }; // add the ones that were commented: image, schedule, careerServices, jobGuaranteed

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
    <div className="EditCourse">
      <h4>To edit the course, change the form below:</h4>

      <form onSubmit={handleSubmit}>
        <label>
          Course Name:{" "}
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
          Description:{" "}
          <textarea
            type="text"
            required={true}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
      <button onClick={deleteProject}>Delete Course</button>
    </div>
  );
}
