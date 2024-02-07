import React, { useEffect, useState } from "react";
import api from "../api/fake.api/users.api";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const PostCard = ({ postId }) => {
  const history = useHistory();
  const [post, setPost] = useState();
  const [categories, setCategories] = useState();
  const [comments, setComments] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    let isMounted = true;
    api.getPostById(postId).then((data) => {
      setPost(data);
    });
    return () => {
      isMounted = false;
    };
  }, [post]);

  useEffect(() => {
    let isMounted = true;
    api.fetchAllCategories().then((data) => {
      setCategories(data);
    });
    return () => {
      isMounted = false;
    };
  }, [categories]);

  useEffect(() => {
    let isMounted = true;
    api.getCommentsByPostId(postId).then((data) => {
      setComments(data);
    });
    return () => {
      isMounted = false;
    };
  }, [comments]);

  //   console.log(comments, postId);
  const handleEdit = () => {
    history.push(`/home/${postId}/edit`);
  };

  const getCategoryBadge = (item) => {
    return (
      <span className={"badge bg-" + item.color} key={item.id}>
        {item.name}
      </span>
    );
  };

  const setUserName = (userId) => {
    api.getUserById(userId).then((data) => {
      setUser(data);
    });
    return user;
  };

  const getComments = (comment) => {
    setUserName(comment.userId);
    return user ? (
      <div key={comment.commentId} className="card-footer m-2 p-2">
        <p>{user.name + " " + user.surname}</p>
        <p>{comment.commentText}</p>
      </div>
    ) : (
      "loading"
    );
  };

  const handleClick = () => {
    api.deletePost(postId);
  };

  return post && categories && comments ? (
    <div className="card mb-2">
      <div className="card-header">
        {categories.map((category) => {
          if (category.id === post.categoryId) {
            return getCategoryBadge(category);
          }
        })}
      </div>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.text}</p>
        {comments && comments.map((comment) => getComments(comment))}

        <button onClick={handleEdit} className="btn btn-success m-2">
          Редактировать пост
        </button>

        <button
          type="button"
          onClick={handleClick}
          className="btn btn-danger m-2"
        >
          Удалить
        </button>
      </div>
    </div>
  ) : (
    "loading..."
  );
};

export default PostCard;
