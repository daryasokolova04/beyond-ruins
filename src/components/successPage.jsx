import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="m-4 p-4">
      <h3>Вы успешно зарегистрированы!</h3>
      <buttton className="btn btn-primary mt-2 mb-2" onClick={handleClick}>
        Войти
      </buttton>
    </div>
  );
};

export default SuccessPage;
