import React from "react";
import UserPage from "./userPage";
import { useParams } from "react-router-dom";

const User = () => {
  const userId = useParams().userId;
  return userId && <UserPage userId={userId} />;
};

export default User;
