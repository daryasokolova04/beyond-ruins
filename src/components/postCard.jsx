import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { refreshToken } from "../services/refresh";

const PostCard = ({ postId }) => {
  const isLogged = +localStorage.getItem("id");
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [category, setCategory] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`http://127.0.0.1:8000/api/v1/Posts/${postId}/`)
      .then((data) => setPost(data.data))
      .catch((err) => console.log(err));
    console.log(post);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`http://127.0.0.1:8000/api/v1/Posts/${postId}/category/`)
      .then((data) => setCategory(data.data))
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`http://127.0.0.1:8000/api/v1/Posts/${postId}/comments/`)
      .then((data) => setComments(data.data || null))
      .catch((err) => console.log(err));
    return () => {
      console.log(comments);
      isMounted = false;
    };
  }, []);

  const handleEdit = () => {
    console.log(postId);
    navigate(`/home/${postId}/edit`);
  };

  const getCategoryBadge = (item) => {
    return (
      <span
        className={"badge"}
        style={{ backgroundColor: "#555a24" }}
        key={post.id}
      >
        {item.name}
      </span>
    );
  };

  const getComments = () => {
    return Object.keys(comments).map((key) => (
      <div key={`${comments[key].creationTime}_${comments[key].commentText}`}>
        <p style={{ fontStyle: "italic" }}>
          {comments[key].username}: {comments[key].commentText}
        </p>
        {comments[key].userId === isLogged && (
          <button
            type="button"
            onClick={() => handleCommentDelete(Number(key))}
            className="btn m-2 btn-sm btn-outline-danger"
          >
            Удалить
          </button>
        )}
      </div>
    ));
  };

  const handlePostDelete = (id) => {
    refreshToken();
    console.log(axios.defaults.headers);
    axios
      .delete(`http://127.0.0.1:8000/api/v1/Posts/${id}/`)
      .then((response) => {
        document.location.reload();
        console.log(response.data);
      })
      .catch((err) => console.log(err.response));
  };

  const handleCommentDelete = (id) => {
    refreshToken();
    console.log(axios.defaults.headers);
    axios
      .delete(`http://127.0.0.1:8000/api/v1/comments/${id}/`)
      .then((response) => {
        document.location.reload();
        console.log(response.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  return post && category ? (
    <div className="p-4">
      <div>{getCategoryBadge(category)}</div>
      <div>
        <h2 className="card-title">{post.title}</h2>
        <p className="card-text">{post.text}</p>

        {post.userId === isLogged && (
          <div className="group-button">
            <div className="d-grid d-md-flex justify-content-md-end">
              <button
                onClick={handleEdit}
                className="btn btn-outline-dark m-2 btn-sm"
              >
                Редактировать пост
              </button>
              <button
                type="button"
                onClick={() => handlePostDelete(post.id)}
                className="btn m-2 btn-sm btn-outline-danger"
              >
                Удалить
              </button>
            </div>
          </div>
        )}
        {comments && (
          <div className="card-footer">
            <p>Комментарии</p> {getComments()}
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PostCard;
