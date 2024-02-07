import React, { useEffect } from "react";
import TextField from "../fields/textField";
import api from "../../api/index";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const [users, setUsers] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    api.data.fetchAllUsers().then((data) => setUsers(data));
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    console.log(data);
  };

  const handleClick = () => {
    console.log(users);
    console.log(data);
    const registeredUser = users.find((user) => {
      return user.email === data.email && user.password === data.password;
    });
    if (registeredUser) {
      history.replace(`/home/${registeredUser.id}`);
    } else {
      console.log("user not found");
    }
  };

  return (
    <>
      <div>
        <h1>Login Form</h1>
        <TextField
          type="text"
          label="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />

        <TextField
          type="password"
          label="Пароль"
          name="password"
          onChange={handleChange}
          value={data.password}
        />

        <div className="col-12">
          <button
            onClick={handleClick}
            type="submit"
            className="btn btn-primary mt-2 mb-2"
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
