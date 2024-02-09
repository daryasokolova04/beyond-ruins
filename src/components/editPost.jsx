import React, { useEffect, useState } from "react";
import api from "../api/fake.api/users.api";
import TextField from "./fields/textField";
import TextAreaField from "./fields/textAreaField";
import { useNavigate } from "react-router-dom";
import SelectCategories from "./selectCategories";
import { validator } from "../utils/validator";

const EditPost = ({ id }) => {
  const [post, setPost] = useState({
    id: id,
    userId: "",
    categoryId: "",
    title: "",
    text: "",
  });
  const [categories, setCategories] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    api.getPostById(id).then((data) => {
      setPost(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
    api
      .update(id, post)
      .then(() => navigate(`/home/${post.userId}`, { replace: true }));
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
    <div className="m-4">
      <div className="shadow p-4">
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
          className="btn btn-primary mt-2 mb-2"
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
