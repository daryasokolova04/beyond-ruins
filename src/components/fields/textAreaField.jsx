import React from "react";

const TextAreaField = ({ label, name, value, onChange, error, rows }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const renderClass = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor="textArea" className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={value}
        className={renderClass()}
        id="textArea"
        rows={rows}
        onChange={handleChange}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextAreaField;
