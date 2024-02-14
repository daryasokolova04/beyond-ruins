import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import inMemoryJWT from "../../services/inMemoryJWT";
import axios from "axios";
import { abortRefeshToken } from "../../services/refresh";

const Logout = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState();

  const handleLogout = () => {
    api.data.setIsLogged("").then((data) => console.log(data));
  };
  console.log(isLogged);

  const handleClick = () => {
    let refreshToken = localStorage.getItem("refresh");
    axios
      .post("http://127.0.0.1:8000/api/v1/token/blacklist/", {
        refresh: refreshToken,
      })
      .then(() => inMemoryJWT.deleteToken)
      .catch((error) => console.log(error));
    localStorage.removeItem("refresh");
    localStorage.removeItem("id");
    localStorage.removeItem("access");
    abortRefeshToken();

    handleLogout();
    navigate("/posts", { replace: true });
    document.location.reload();
  };
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <button className="btn m-2 btn-sm btn-outline-dark" onClick={handleClick}>
        Хотите выйти?
      </button>
    </div>
  );
};

export default Logout;
