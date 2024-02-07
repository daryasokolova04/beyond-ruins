import React from "react";

const CheckBoxField = ({ onChange, value, name, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  const renderClass = () => {
    // return "form-check-input";
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          className={renderClass()}
          type="checkbox"
          id={name}
          checked={value}
          onChange={handleChange}
          name={name}
          value=""
          required
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default CheckBoxField;
