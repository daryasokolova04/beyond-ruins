import React from "react";
import TextField from "./fields/textField";
import { useState } from "react";
import TextAreaField from "./fields/textAreaField";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategories from "./selectCategories";
import axios from "axios";
import { validator } from "../utils/validator";
import { refreshToken } from "../services/refresh";

const AddPost = ({ userId }) => {
  const [post, setPost] = useState({
    userId: userId,
    categoryId: 1,
    title: "",
    text: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  console.log(axios.defaults.headers.common);

  useEffect(() => {
    refreshToken();
    let isMounted = true;

    try {
      axios
        .get("http://127.0.0.1:8000/api/v1/categories/")
        .then((data) => setCategories(data.data));
    } catch (error) {
      console.log(error.response.data);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (target) => {
    setPost((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    console.log(post);
  };

  const handleClick = () => {
    refreshToken();
    console.log(axios.defaults.headers);
    axios
      .post("http://127.0.0.1:8000/api/v1/Posts/", {
        userId: post.userId,
        categoryId: post.categoryId,
        title: post.title,
        text: post.text,
      })
      .catch((err) => console.log(err.response.data));
    navigate(`/home/${userId}`, { replace: true });
    document.location.reload();
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

  return categories ? (
    <div className="m-4 p-4">
      <div className="shadow m-4 p-4">
        <h1>Создание поста</h1>
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
          rows={7}
        />
        <button
          onClick={handleClick}
          type="submit"
          className="btn btn-sm btn-outline-dark m-2"
          disabled={!isValid}
        >
          Опубликовать
        </button>
      </div>
    </div>
  ) : (
    "loading"
  );
};

export default AddPost;
