import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TopicDetails(props) {
  console.log("props", props);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { topicId } = useParams();
  console.log("topicId");
  // let topicDetails;
  // const { topics } = props;
  // console.log("topics + topicId", topics, topicId);
  // if (topics) {
  //   topicDetails = topics.find(
  //     (selectedTopic) => selectedTopic._id === topicId
  //   );
  // }
  // console.log("selectedTopic:", selectedTopic);

  const getTopic = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/topics/${topicId}`)
      .then((response) => {
        console.log("response.data", response.data);
        const thisTopic = response.data;
        setSelectedTopic(thisTopic);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTopic();
  }, []);

  return (
    <div className="single-topic-card" key={props.selectedTopic._id}>
      {selectedTopic && (
        <>
          <p>{props.selectedTopic.topicName}</p>
          <p>{props.selectedTopic.description}</p>
        </>
      )}
    </div>
  );
}
