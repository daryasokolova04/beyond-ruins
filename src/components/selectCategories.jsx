import React from "react";

const SelectCategories = ({ defaultValue, label, onChange, options, name }) => {
  const handleChange = ({ target }) => {
    console.log(target.name, target.value);
    onChange({ name: target.name, value: target.value });
  };

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
