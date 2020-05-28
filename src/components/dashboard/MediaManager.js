import React from "react";
import { useOktaAuth } from "@okta/okta-react";

import TopicNav from "../kanban/TopicNav";
import TopicBucket2 from "../kanban2/TopicBucket2";
import CreateTopic from "../kanban2/CreateTopic.js";

const MediaManager = ({ user }) => {
  return (
    <div>
      <TopicNav />
      <CreateTopic />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <TopicBucket2 />
      </div>
    </div>
  );
};

export default MediaManager;
