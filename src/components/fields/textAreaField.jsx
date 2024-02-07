import React from "react";

const TextAreaField = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor="textArea" className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={value}
        className="form-control"
        id="textArea"
        rows="5"
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
