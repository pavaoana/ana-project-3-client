import React from "react";

export default function TopicsAll(props) {
  return (
    <div className="AllTopics">
      {props.topics.map((topic) => {
        return (
          <div className="topic-card" key={topic._id}>
            <div className="topic-details">
              <h4>{topic.topicName}</h4>
              <p>{topic.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
