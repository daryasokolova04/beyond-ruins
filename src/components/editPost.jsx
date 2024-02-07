import React, { useEffect, useState } from "react";

import api from "../api/fake.api/users.api";
import TextField from "./fields/textField";
import TextAreaField from "./fields/textAreaField";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SelectCategories from "./selectCategories";

const EditPost = ({ id }) => {
  const [post, setPost] = useState({
    id: id,
    userId: "",
    categoryId: "",
    title: "",
    text: "",
  });
  const [categories, setCategories] = useState();
  const history = useHistory();

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

  //   console.log(post);

  const handleChange = (target) => {
    setPost((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    api.update(id, post).then(() => history.replace(`/home/${post.userId}`));
  };

  //   const prevCategory = categories.map((category) => {
  //     if (category.id === post.id) return category.name;
  //   });

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
        />
        <button
          onClick={handleClick}
          type="submit"
          className="btn btn-primary mt-2 mb-2"
          //   disabled={!isValid}
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
