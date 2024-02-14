import React from "react";
import TextAreaField from "./fields/textAreaField";
import { useState } from "react";
import axios from "axios";
import { refreshToken } from "../services/refresh";

const CommentForm = ({ postId, userId }) => {
  console.log(userId);
  const [comment, setComment] = useState({
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
    refreshToken();
    console.log(axios.defaults.headers);
    axios
      .post("http://127.0.0.1:8000/api/v1/comments/", {
        postId: postId,
        userId: userId,
        commentText: comment.commentText,
      })
      .catch((err) => console.log(err));
    document.location.reload();
  };

  return (
    <div className="m-2">
      <TextAreaField
        label="Комментарий"
        name="commentText"
        value={comment.commentText}
        onChange={handleChange}
        rows={2}
      />
      <button
        onClick={handleClick}
        type="button"
        className="btn m-2 btn-sm btn-outline-dark"
      >
        Опубликовать
      </button>
    </div>
  );
};

export default CommentForm;
