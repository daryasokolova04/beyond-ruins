import React from "react";
import TextField from "./fields/textField";
import { useState } from "react";
import TextAreaField from "./fields/textAreaField";
import { useEffect } from "react";
import api from "../api/fake.api/users.api";
import { useNavigate } from "react-router-dom";
import SelectCategories from "./selectCategories";
import axios from "axios";
import { validator } from "../utils/validator";

const AddPost = ({ postId, userId }) => {
  const [post, setPost] = useState({
    id: postId,
    userId: userId,
    categoryId: "type1",
    title: "",
    text: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    api.fetchAllCategories().then((data) => {
      setCategories(data);
    });
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
    // axios
    //   .post("http://127.0.0.1:8000/api/v1/Article/", {
    //     id: 2,
    //     title: "Россия",
    //     main_text: "о России",
    //     user_id: 1,
    //     category_id: 1,
    //   })
    //   .then((data) => console.log(data));
    api.addPost(post);
    navigate(`/home/${userId}`, { replace: true });
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

  console.log(categories);

  return categories ? (
    <div className="m-4">
      <div className="shadow p-4">
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
        />
        <button
          onClick={handleClick}
          type="submit"
          className="btn btn-primary mt-2 mb-2"
          //   disabled={!isValid}
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
