import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context";
import "./CourseCreate.css";

export default function TopicCreate(props) {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  // const [message, setMessage] = useState(undefined);

  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const topicDetails = {
      topicName,
      description,
    };

    const storedToken = getToken();

    axios
      .post(`${process.env.REACT_APP_API_URL}/topics/add`, topicDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTopicName("");
        setDescription("");
        navigate("/courses/add");
        //props.updateCourseWithTopic();
      })
      .catch((e) =>
        console.log("An error occured while creating a new topic.", e)
      );
  };

  return (
    <div className="CreateTopic">
      <h5>Create a new topic below:</h5>

      <form onSubmit={handleSubmit}>
        <label>
          Topic Name: <br />
          <input
            type="text"
            required={true}
            placeholder="HTML"
            name="topicName"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description: <br />
          <textarea
            type="text"
            required={true}
            placeholder="HTML (Hypertext Markup Language) allows us to..."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create a Topic</button>
      </form>
    </div>
  );
}
