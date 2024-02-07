import React from "react";
import TextField from "./fields/textField";
import { useState } from "react";
import TextAreaField from "./fields/textAreaField";
import { useEffect } from "react";
import api from "../api/fake.api/users.api";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SelectCategories from "./selectCategories";

const AddPost = ({ postId, userId }) => {
  const [post, setPost] = useState({
    id: postId,
    userId: userId,
    categoryId: "type1",
    title: "",
    text: "",
  });
  const [categories, setCategories] = useState();
  //   console.log(post);
  const history = useHistory();

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
    api.addPost(post);
    history.replace(`/home/${userId}`);
  };

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
          Опубликовать
        </button>
      </div>
    </div>
  ) : (
    "loading"
  );
};

export default AddPost;
