import React from "react";
import TopicCard2 from "./TopicCard2";
import initialData from "./initialData";
import { DragDropContext } from "react-beautiful-dnd";

class TopicBucket2 extends React.Component {
  state = initialData;

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.topicOrder.map((topicId) => {
          const topic = this.state.topics[topicId];
          const tweets = topic.tweets.map((tweet) => (tweet = { tweet }));
          return <TopicCard2 key={topic.id} topic={topic} tweets={tweets} />;
        })}
      </DragDropContext>
    );
  }
}
export default TopicBucket2;
