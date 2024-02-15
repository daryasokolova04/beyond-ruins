import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "./postCard";
import axios from "axios";
import { refreshToken } from "../services/refresh";

const UserPage = ({ userId }) => {
  refreshToken();
  console.log(userId);
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    refreshToken();
    try {
      axios
        .get(`http://127.0.0.1:8000/api/v1/User/${userId}/`)
        .then((data) => setUser(data.data));
    } catch (error) {
      console.log(error.response.data);
    }
  }, []);

  console.log(user);
  console.log(axios.defaults);

  useEffect(() => {
    refreshToken();
    let isMounted = true;
    axios
      .get(`http://127.0.0.1:8000/api/v1/User/${userId}/post/`)
      .then((data) => setPosts(data.data || null))
      .catch((error) => error.response.data);
    return () => {
      isMounted = false;
    };
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/${user.id}/addPost`, { replace: true });
  };

  const handleComeBack = () => {
    navigate(`/home/${user.id}/posts`, { replace: true });
  };

  return user ? (
    <div className="m-4 p-4">
      <div className="shadow m-4 p-4">
        <h1 className="title">Мои публикации</h1>
        <h5>{user.username}</h5>

        {posts &&
          Object.keys(posts).map((postId) => (
            <div key={postId} className="card">
              <PostCard postId={postId} key={postId} />
            </div>
          ))}

        <button
          onClick={handleClick}
          className="btn btn-sm btn-outline-dark m-2"
        >
          Создать пост
        </button>

        <button
          onClick={handleComeBack}
          className="btn btn-sm btn-outline-dark m-2"
        >
          Ко всем постам
        </button>
      </div>
    </div>
  ) : (
    "loading..."
  );
};

export default UserPage;
