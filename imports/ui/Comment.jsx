import React, { useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";

export const Comment = ({ comment }) => {
  const thisUser = useTracker(() =>
    Meteor.users.findOne({ _id: comment.userId })
  );
  console.log({ thisUser });
  return (
    <li>
      <p>
        <span>@{thisUser.username}:</span> {comment.text}
      </p>
    </li>
  );
};
