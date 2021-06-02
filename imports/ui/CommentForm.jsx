import React, { useState } from "react";
import { CommentsCollection } from "/imports/api/CommentsCollection";
import { useTracker } from "meteor/react-meteor-data";

export const CommentForm = () => {
  const [text, setText] = useState("");
  const user = useTracker(() => Meteor.user());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    CommentsCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: user._id,
    });

    setText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter comment here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Comment</button>
    </form>
  );
};
