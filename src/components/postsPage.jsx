import React from "react";
import PostCard from "./postCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CommentForm from "./commentForm";
import backgroundImage from "../images/background.av1.avif";
import { refreshToken } from "../services/refresh";

const PostsPage = () => {
  const loggedUser = +localStorage.getItem("id");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      try {
        axios
          .get("http://127.0.0.1:8000/api/v1/Posts/")
          .then((data) => setPosts(data.data));

        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    try {
      axios
        .get("http://127.0.0.1:8000/api/v1/User/")
        .then((data) => setUsers(data.data));
      console.log(users);
    } catch (error) {
      console.log(error.response.data);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return users ? (
    <div className="m-4 p-4">
      <div className="shadow m-4 p-4">
        <div
          className="main-page"
          style={{
            backgroundImage: `url(${backgroundImage}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: 500,
            width: 700,
            margin: "auto",
          }}
        >
          <div className="title justify-content-center">
            <h1 className="pt-4">Beyond Ruins</h1>
          </div>
        </div>
        <div>
          <h1 className="text-center">Посты</h1>

          {users.map((user) => {
            return (
              user.id !== loggedUser &&
              posts.find((post) => post.userId === user.id) && (
                <div key={user.id} className="m-4 p-2 card">
                  <span className="post-author">
                    <i className="bi bi-suitcase-lg">{" " + user.username}</i>
                  </span>
                  {posts.map(
                    (post) =>
                      post.userId === user.id && (
                        <div key={post.id}>
                          <PostCard postId={post.id} />
                          {localStorage.getItem("id") && (
                            <CommentForm postId={post.id} userId={loggedUser} />
                          )}
                        </div>
                      )
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    "Loading"
  );
};

export default PostsPage;
