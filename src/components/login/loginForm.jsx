import React, { useEffect, useContext } from "react";
import TextField from "../fields/textField";
import api from "../../api/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const LoginForm = () => {
  //   const isLogged = useContext(UserContext);

  const [isLogged, setIsLogged] = useState();
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    api.data.getIsLogged().then((data) => setIsLogged(data));
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = (id) => {
    api.data.setIsLogged(id).then((data) => console.log(data));
  };
  console.log(isLogged);

  useEffect(() => {
    let isMounted = true;
    api.data.fetchAllUsers().then((data) => setUsers(data));
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    console.log(data);
  };

  const handleSubmit = async (e) => {
    setSuccess(true);
    e.preventDefault();
    console.log(users);
    console.log(data);

    const registeredUser = users.find((user) => {
      return user.email === data.email && user.password === data.password;
    });
    if (registeredUser) {
      navigate(`/profile/${registeredUser.id}`, { replace: true });
      handleLogin(registeredUser.id);
      document.location.reload();
    } else {
      console.log("user not found");
    }
  };

  return (
    !isLogged && (
      <div className="m-4 p-4">
        <section className="shadow m-4 p-4">
          <form className="g-3" onSubmit={handleSubmit}>
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
                // onClick={handleClick}
                // type="submit"
                className="btn btn-primary mt-2 mb-2"
              >
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
