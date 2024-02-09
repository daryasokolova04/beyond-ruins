import React, { useContext, useState, createContext } from "react";
import NavBar from "./components/navBar";
import { Route, Navigate, Routes } from "react-router-dom";
import Home from "./components/home";
import StartForm from "./components/login/startForm";
import SuccessPage from "./components/successPage";
import Posts from "./components/posts";
import EditPost from "./components/editPost";
import LoginForm from "./components/login/loginForm";
import RegisterForm from "./components/login/registerForm";
import Logout from "./components/login/logout";
import api from "./api/fake.api/users.api";
import UserPage from "./components/userPage";
import User from "./components/user";

// export const UserContext = createContext();

function App() {
  //   const setIsLogged = async (param) => {
  //     const data = await api.setIsLogged(param);
  //     return data;
  //   };

  //   const logged = useState({
  //     isLogged: api.getIsLogged,
  //     setIsLogged: setIsLogged,
  //   });

  //   console.log(setIsLogged(true));
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile/:userId?" element={<User />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home/:id?/:action?" element={<Home />} />
        <Route path="/edit/:postId?" element={<EditPost />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/posts/:postId?" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
