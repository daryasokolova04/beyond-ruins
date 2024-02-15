import React from "react";
import TextField from "../fields/textField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { refreshToken } from "../../services/refresh";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState();
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = null;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        {
          username: data.login,
          password: data.password,
        },
        { credentials: "include" }
      );

      console.log(axios.defaults.headers);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("access", response.data.access);
      refreshToken();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;

      const user = await axios.get(
        "http://127.0.0.1:8000/api/v1/User/profile/"
      );

      id = user.data;
      localStorage.setItem("id", id);
    } catch (error) {
      console.log(error.response.data);
    }

    if (id) {
      navigate(`/profile/${localStorage.getItem("id")}`, { replace: true });
      document.location.reload();
      refreshToken();
    } else {
      console.log("user not found");
    }
  };

  return (
    !isLogged && (
      <div className="m-4 p-4">
        <section className="shadow m-4 p-4">
          <form className="g-3" onSubmit={handleSubmit}>
            <h1>Войти</h1>
            <TextField
              type="text"
              label="Логин"
              name="login"
              onChange={handleChange}
              value={data.login}
            />

            <TextField
              type="password"
              label="Пароль"
              name="password"
              onChange={handleChange}
              value={data.password}
            />

            <div className="col-12">
              <button className="btn m-2 btn-sm btn-outline-dark">
                Sign in
              </button>
            </div>
          </form>
        </section>
      </div>
    )
  );
};

export default LoginForm;
