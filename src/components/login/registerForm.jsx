import React, { useContext } from "react";
import TextField from "../fields/textField";
import RadioField from "../fields/radioField";
import { useState } from "react";
import CheckBoxField from "../fields/checkBoxField";
import api from "../../api/index";
import { validator } from "../../utils/validator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import { v4 as uuidv4 } from "uuid";

const RegisterForm = () => {
  const id = uuidv4();
  const [isLogged, setIsLogged] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState({
    login: "",
    sex: "Мужской",
    email: "email@email.com",
    password: "",
    license: true,
  });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: {
      isRequired: { message: "Email обязателен для заполнения" },
      isEmail: { message: "Email введен некорректно" },
    },
    login: {
      isRequired: { message: "Поле обязательно для заполнения" },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы 1 заглавную букву",
      },
      isDigitSymbol: {
        message: "Пароль должен содержать хотя бы 1 число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
      },
    },
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    console.log(errors);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleClick = () => {
    console.log(isLogged);
    console.log(data);

    try {
      axios
        .post("http://127.0.0.1:8000/api/v1/auth/users/", {
          username: data.login,
          password: data.password,
          email: data.email,
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }

    navigate(`/login`, { replace: true });
    document.location.reload();
  };

  return (
    !isLogged && (
      <div className="m-4 p-4">
        <div className="shadow m-4 p-4">
          <div className="g-3">
            <h1>Register Form</h1>
            <TextField
              type="text"
              label="Логин"
              name="login"
              value={data.login}
              onChange={handleChange}
              error={errors.login}
            />

            <RadioField
              options={[
                { name: "male", value: "Мужской" },
                { name: "female", value: "Женский" },
              ]}
              name="sex"
              label="Пол"
              value={data.sex}
              onChange={handleChange}
            />

            <TextField
              type="text"
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />

            <TextField
              type="password"
              label="Пароль"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />

            <CheckBoxField
              onChange={handleChange}
              value={data.license}
              name="license"
              error={errors.license}
            >
              Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>

            <button
              onClick={handleClick}
              type="submit"
              className="btn m-2 btn-outline-dark btn-sm"
              disabled={!isValid}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RegisterForm;
