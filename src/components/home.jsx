import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import AddPost from "./addPost";
import { v4 as uuidv4 } from "uuid";
import PostsPage from "./postsPage";
import EditPost from "./editPost";

const Home = () => {
  const params = useParams();
  const id = params.id;
  const action = params.action;

  if (action === "edit") {
    return <EditPost id={id} />;
  } else if (action === "addPost") {
    return <AddPost userId={id} postId={uuidv4()} />;
  } else if (action === "posts") return <PostsPage />;
  else if (id) return <UserPage userId={id} />;
  return null;
};

export default Home;
