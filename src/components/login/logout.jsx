import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Logout = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState();

  const handleLogout = () => {
    api.data.setIsLogged("").then((data) => console.log(data));
  };
  console.log(isLogged);

  const handleClick = () => {
    handleLogout();
    navigate("/posts", { replace: true });
    document.location.reload();
  };
  return (
    <div className="m-4 p-4">
      <button className="btn btn-primary m-2" onClick={handleClick}>
        Хотите выйти?
      </button>
    </div>
  );
};

export default Logout;
