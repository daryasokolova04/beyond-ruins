import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import api from "../api/fake.api/users.api";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "./postCard";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    api.getUserById(userId).then(
      (data) => {
        setUser(data);
      },
      [user]
    );
    api.fetchAllPosts().then((data) => setPosts(data));
  }, [posts]);

  //   console.log(user);
  const history = useHistory();

  const handleClick = () => {
    history.replace(`/home/${user.id}/addPost`);
  };

  const handleComeBack = () => {
    history.replace(`/home/${user.id}/posts`);
  };

  return posts && user ? (
    <div className="m-4">
      <h1>Мои посты</h1>
      <h5>{user.name + " " + user.surname}</h5>

      {posts.map((post) => {
        if (post.userId === userId) {
          console.log(post);
          return (
            <div key={post.id}>
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
  ) : (
    "loading..."
  );
};

export default UserPage;
