import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SuccessPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.replace("/login");
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
