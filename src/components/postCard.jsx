import React, { useEffect, useState, useContext } from "react";
import api from "../api/fake.api/users.api";
import { useNavigate } from "react-router-dom";
import CommentForm from "./commentForm";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const PostCard = ({ postId }) => {
  const [isLogged, setIsLogged] = useState();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [categories, setCategories] = useState();
  const [comments, setComments] = useState();
  const [newComments, setNewComments] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    api.getPostById(postId).then((data) => {
      setPost(data);
    });
    console.log(post);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    api.getIsLogged().then((data) => setIsLogged(data));
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    api.fetchAllCategories().then((data) => {
      setCategories(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    api.fetchAllUsers().then((data) => {
      setUsers(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    api.getCommentsByPostId(postId).then((data) => {
      setComments(data);
    });
    // axios
    //   .get(`http://127.0.0.1:8000/api/v1/Posts/${"1"}/comments/`)
    //   .then((data) => console.log(data.data))
    //   .catch((err) => console.log(err));
    // console.log(comments);
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = () => {
    navigate(`/home/${postId}/edit`);
  };

  const getCategoryBadge = (item) => {
    return (
      <span className={"badge bg-" + item.color} key={item.id}>
        {item.name}
      </span>
    );
  };

  //   const setUserName = (userId) => {
  //     api.getUserById(userId).then((data) => {
  //       setUser(data);
  //     });
  //     return user;
  //   };

  const getComments = (comment) => {
    const user = users.find((user) => user.id === comment.userId);
    return (
      <div key={comment.commentId} className="m-2">
        <p>{user.name + " " + user.surname}</p>
        <p>{comment.commentText}</p>
        {isLogged && comment.userId === isLogged && (
          <button
            type="button"
            onClick={() => handleCommentDelete(comment.commentId)}
            className="btn btn-danger m-2"
          >
            Удалить
          </button>
        )}
      </div>
    );
  };

  const handlePostDelete = (id) => {
    api.deletePost(id);
    document.location.reload();
  };

  const handleCommentDelete = (id) => {
    api.deleteComment(id);
    document.location.reload();
  };

  return post && categories && comments ? (
    <div className="mb-2">
      <div className="">
        {categories.map((category) => {
          if (category.id === post.categoryId) {
            return getCategoryBadge(category);
          }
        })}
      </div>
      <div className="">
        <h2 className="">{post.title}</h2>
        <p className="">{post.text}</p>

        {isLogged && post.userId === isLogged && (
          <>
            <button onClick={handleEdit} className="btn btn-success m-2">
              Редактировать пост
            </button>
            <button
              type="button"
              onClick={() => handlePostDelete(post.id)}
              className="btn btn-danger m-2"
            >
              Удалить
            </button>
          </>
        )}
        {comments && (
          <>
            <p>Комментарии</p> {comments.map((comment) => getComments(comment))}
          </>
        )}
      </div>
      {/* <CommentForm commentId={uuidv4()} postId={post.id} userId="1" /> */}
    </div>
  ) : (
    ""
  );
};

export default PostCard;
