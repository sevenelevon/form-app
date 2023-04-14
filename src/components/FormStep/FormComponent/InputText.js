import React from "react";

import "../../../styles/FormStep/Input.css";

export const InputText = ({
  width,
  height,
  label,
  placeholder,
  value,
  onChange,
  error,
  name,
  onFocus,
  onBlur
}) => {
  return (
    <div className="input__text">
      <label className="label__text">{label}</label>
      <input
        className={`input__text-custom input__active ${
          error ? "input__error" : ""
        }`}
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ width: width, height: height }}
      />
      <label className="error__label">{error}</label>
    </div>
  );
};
