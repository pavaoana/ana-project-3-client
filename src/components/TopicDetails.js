import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TopicDetails(props) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { topicId } = useParams();

  const { topicsArray } = props;
  console.log("topicsArray", topicsArray);

  useEffect(() => {
    if (topicsArray) {
      let topicDetails = topicsArray.find(
        (specificTopic) => specificTopic._id === topicId
      );
      setSelectedTopic(topicDetails);
    }
    console.log("topicDetails", selectedTopic);
  }, []);

  if (!topicsArray) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="single-topic-card">
      {selectedTopic && (
        <>
          <p>{selectedTopic.topicName}</p>
          <p>topic description</p>
        </>
      )}
    </div>
  );
}
