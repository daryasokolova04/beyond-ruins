import React from "react";
import TextAreaField from "./fields/textAreaField";
import { useState } from "react";
import api from "../api/fake.api/users.api";
import axios from "axios";

const CommentForm = ({ commentId, postId, userId }) => {
  const [comment, setComment] = useState({
    commentId: commentId,
    postId: postId,
    userId: userId,
    commentText: "",
  });

  const handleChange = (target) => {
    setComment((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    console.log(comment);
    document.location.reload();
    axios.post("http://127.0.0.1:8000/api/v1/Comments/");
    api.addComment(comment);
  };

  return (
    <div className="m-2">
      <TextAreaField
        label="Комментарий"
        name="commentText"
        value={comment.commentText}
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        type="button"
        className="btn btn-primary mt-2 mb-2"
      >
        Опубликовать
      </button>
    </div>
  );
};

export default CommentForm;
