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
    id: id,
    name: "",
    surname: "",
    sex: "Мужской",
    email: "",
    password: "",
    license: false,
  });
  const [errors, setErrors] = useState({});

  const handleLogin = (id) => {
    api.data.setIsLogged(id).then((data) => console.log(data));
  };
  console.log(isLogged);

  const validatorConfig = {
    email: {
      isRequired: { message: "Email обязателен для заполнения" },
      isEmail: { message: "Email введен некорректно" },
    },
    name: {
      isRequired: { message: "Поле обязательно для заполнения" },
    },
    surname: {
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
    // console.log(target);
    console.log(errors);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleClick = () => {
    console.log(isLogged);
    // axios
    //   .post("http://127.0.0.1:8000/api/v1/User/", {
    //     login: "login",
    //     email: "email@email.ru",
    //   })
    //   .then((data) => console.log(data));
    api.data.addUser(data).then(() => {
      navigate(`/profile/${data.id}`, { replace: true });
      handleLogin(data.id);
      document.location.reload();
    });
  };

  return (
    !isLogged && (
      <div className="m-4 p-4">
        <div className="shadow m-4 p-4">
          <div className="g-3">
            <h1>Register Form</h1>
            <TextField
              type="text"
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />

            <TextField
              type="text"
              label="Фамилия"
              name="surname"
              value={data.surname}
              onChange={handleChange}
              error={errors.surname}
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
              className="btn btn-primary mt-2 mb-2"
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
