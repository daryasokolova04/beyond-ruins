import React from "react";
import { useEffect } from "react";
import api from "../api/fake.api/users.api";
import { useState } from "react";

const SelectCategories = ({ defaultValue, label, onChange, options, name }) => {
  //   const [categories, setCategories] = useState();

  //   useEffect(() => {
  //     let isMounted = true;
  //     api.fetchAllCategories().then((data) => {
  //       setCategories(data);
  //     });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const handleChange = ({ target }) => {
    console.log(target.name, target.value);
    onChange({ name: target.name, value: target.value });
  };

  //   console.log(categories);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={"form-select"}
        id={name}
        onChange={handleChange}
        name={name}
        defaultValue={defaultValue}
      >
        {options &&
          options.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectCategories;
