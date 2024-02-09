import React, { useContext } from "react";
import api from "../api";
import PostCard from "./postCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import CommentForm from "./commentForm";
import backgroundImage from "../images/background.av1.avif";

const PostsPage = () => {
  const [isLogged, setIsLogged] = useState();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [articles, setArticles] = useState({});
  useEffect(() => {
    let isMounted = true;

    // axios
    //   .get("http://127.0.0.1:8000/api/v1/Article/1/")
    //   .then((data) => setArticles(data.data));

    api.data.fetchAllPosts().then((data) => {
      if (isMounted) setPosts(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    api.data.fetchAllUsers().then((data) => {
      if (isMounted) setUsers(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    api.data.getIsLogged().then((data) => setIsLogged(data));
    return () => {
      isMounted = false;
    };
  }, []);

  const getComments = (comment) => {
    const user = users.find((user) => user.id === comment.userId);
    return (
      <div key={comment.commentId} className="m-2">
        <p>{user.name + " " + user.surname}</p>s<p>{comment.commentText}</p>
      </div>
    );
  };

  console.log(articles);
  return users && posts ? (
    <div className="m-4 p-4">
      <div className="shadow m-4 p-4">
        {/* <div
          style={{
            backgroundImage: `url(${backgroundImage}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: 700,
            width: 700,
            margin: "auto",
          }}
        >
          <div className="title justify-content-center">
            <h1>Beyoud Ruins</h1>
          </div>
        </div> */}
        <div>
          <h1 className="m-4 text-center">Posts</h1>
          {users.map((user) => {
            return (
              posts.find((post) => post.userId === user.id) &&
              user.id !== isLogged && (
                <div key={user.id} className="m-4 p-2 card">
                  <h6>{user.name + " " + user.surname}</h6>
                  {posts.map((post) => {
                    if (post.userId === user.id) {
                      return (
                        post && (
                          <>
                            <div key={post.id}>
                              <PostCard postId={post.id} />
                              {isLogged && (
                                <CommentForm
                                  commentId={uuidv4()}
                                  postId={post.id}
                                  userId={isLogged}
                                />
                              )}
                            </div>
                            <br />
                          </>
                        )
                      );
                    }
                  })}
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
