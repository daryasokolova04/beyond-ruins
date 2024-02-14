import React, { useEffect, useState } from "react";
import api from "../api/fake.api/users.api";
import TextField from "./fields/textField";
import TextAreaField from "./fields/textAreaField";
import { useNavigate } from "react-router-dom";
import SelectCategories from "./selectCategories";
import { validator } from "../utils/validator";
import axios from "axios";
import { setAuthToken } from "./setAuthToken";
import { refreshToken } from "../services/refresh";

const EditPost = ({ id }) => {
  const [post, setPost] = useState();
  const [categories, setCategories] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`http://127.0.0.1:8000/api/v1/Posts/${id}/`)
      .then((data) => setPost(data.data))
      .catch((error) => console.log(error));

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    axios
      .get("http://127.0.0.1:8000/api/v1/categories/")
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (target) => {
    setPost((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    refreshToken();
    console.log(axios.defaults);
    console.log(id);
    axios
      .put(`http://127.0.0.1:8000/api/v1/Posts/${id}/`, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        text: post.text,
        categoryId: post.categoryId,
      })
      .catch((error) => console.log(error));
    navigate(`/home/${post.userId}`, { replace: true });
  };

  const validate = () => {
    const errors = validator(post, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [post]);

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    title: {
      isRequired: { message: "Поле обязательно для заполнения" },
    },
    text: {
      isRequired: { message: "Поле обязательно для заполнения" },
    },
  };

  return post && categories ? (
    <div className="m-4 p-4">
      <div className="shadow p-4 m-4">
        <h1>Редактирование поста</h1>
        <TextField
          type="text"
          label="Название поста"
          name="title"
          value={post.title}
          onChange={handleChange}
          error={errors.title}
        />
        <SelectCategories
          defaultValue={post.categoryId}
          label="Тема поста"
          onChange={handleChange}
          options={categories}
          name="categoryId"
        />
        <TextAreaField
          label="Содержание поста"
          name="text"
          value={post.text}
          onChange={handleChange}
          error={errors.text}
        />
        <button
          onClick={handleClick}
          type="submit"
          className="btn btn-sm btn-outline-dark m-2"
          disabled={!isValid}
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  ) : (
    "loading"
  );
};

export default EditPost;
