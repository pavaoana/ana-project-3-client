import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// for the MVP we're not using the topics details functionality, since we're using the reactjs-popup npm package to display each topic description

export default function TopicDetails(props) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { topicId } = useParams();

  const { topicsArray } = props;

  useEffect(() => {
    if (topicsArray) {
      let topicDetails = topicsArray.find(
        (specificTopic) => specificTopic._id === topicId
      );
      setSelectedTopic(topicDetails);
    }
  }, []);

  if (!topicsArray) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="single-topic-card">
      {selectedTopic && (
        <>
          <p>{selectedTopic.topicName}</p>
          <p>{selectedTopic.description}</p>
        </>
      )}
    </div>
  );
}
