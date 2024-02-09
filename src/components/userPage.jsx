import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/fake.api/users.api";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "./postCard";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    console.log(userId);
    api.getUserById(userId).then((data) => {
      setUser(data);
    }, []);
    api.fetchAllPosts().then((data) => setPosts(data));
  }, []);

  //   const userId = isLogged;

  useEffect(() => {
    let isMounted = true;
    api.getIsLogged().then((data) => setIsLogged(data));
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

  return posts && user ? (
    <div className="m-4 p-4">
      <div className="m-4">
        <h1>Мои посты</h1>
        <h5>{user.name + " " + user.surname}</h5>

        {posts.map((post) => {
          if (post.userId === userId) {
            console.log(post);
            return (
              <div key={post.id} className="card">
                <PostCard postId={post.id} />
              </div>
            );
          }
        })}
        <button onClick={handleClick} className="btn btn-primary mt-2 mb-2 m-2">
          Создать пост
        </button>
        <button
          onClick={handleComeBack}
          className="btn btn-primary mt-2 mb-2 m-2"
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
