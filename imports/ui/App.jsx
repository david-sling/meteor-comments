import React, { useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { CommentsCollection } from "/imports/api/CommentsCollection";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const comments = useTracker(() =>
    CommentsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  if (!user) return <LoginForm />;

  return (
    <div>
      <nav>
        <h1>Welcome {user.username}!</h1>
        <button onClick={logout}>LOGOUT</button>
      </nav>
      <div className="main">
        <CommentForm />
        <ul>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
};
