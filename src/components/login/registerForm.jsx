import React from "react";
import TextField from "../fields/textField";
import RadioField from "../fields/radioField";
import { useState } from "react";
import CheckBoxField from "../fields/checkBoxField";
import api from "../../api/index";
import { validator } from "../../utils/validator";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const RegisterForm = ({ id }) => {
  const history = useHistory();
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
    console.log(data);
    api.data.addUser(data).then(() => {
      history.replace("/login");
    });
  };

  return (
    <form>
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
    </form>
  );
};

export default RegisterForm;
