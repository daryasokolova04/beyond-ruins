import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import AddPost from "./addPost";
import PostsPage from "./postsPage";
import EditPost from "./editPost";

const Home = () => {
  const params = useParams();
  const action = params.action;
  const isLogged = localStorage.getItem("refresh");
  const id = +localStorage.getItem("id") || null;
  const postId = params.id;

  if (action === "edit" && isLogged) {
    return <EditPost id={postId} />;
  } else if (action === "addPost" && isLogged) {
    return <AddPost userId={id} />;
  } else if (action === "posts") return <PostsPage />;
  else if (id && isLogged) return <UserPage userId={id} />;
  return null;
};

export default Home;
