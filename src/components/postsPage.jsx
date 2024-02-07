import React from "react";
import api from "../api";
import PostCard from "./postCard";
import { useEffect } from "react";
import { useState } from "react";
import Posts from "./posts";

const PostsPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let isMounted = true;
    api.data.fetchAllPosts().then((data) => {
      if (isMounted) setPosts(data);
    });
    return () => {
      isMounted = false;
    };
  }, [posts]);

  useEffect(() => {
    let isMounted = true;
    api.data.fetchAllUsers().then((data) => {
      if (isMounted) setUsers(data);
    });
    return () => {
      isMounted = false;
    };
  }, [users]);

  return users && posts ? (
    <>
      <h1 className="m-4 p-2">Posts</h1>
      {users.map((user) => {
        return (
          <div key={user.id} className="card m-4 p-2">
            <h3>{user.name + " " + user.surname}</h3>
            {posts.map((post) => {
              if (post.userId === user.id) {
                return <PostCard key={post.id} postId={post.id} />;
              }
            })}
          </div>
        );
      })}
    </>
  ) : (
    "Loading"
  );
};

export default PostsPage;
