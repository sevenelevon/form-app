import React from "react";

import Cross from "../../../static/cross.svg";

export const FormSocialSend = ({
  width,
  height,
  label,
  placeholder,
  value,
  onChange,
  error,
  link,
  deleteSocialNet,
  name,
}) => {
  const clearFile = () => {
    // setFilename("");
    onChange("");
  };
  return (
    <div className="input__text">
      <label className="label__text">{label}</label>
      <div>
        <input
          className={`social__send input__text-custom input__active ${
            error ? "input__error" : ""
          }`}
          type="text"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          style={{ width: width, height: height }}
        />
        {link ? (
          <button onClick={deleteSocialNet} className="">
            <img className="img-close" src={Cross} />
          </button>
        ) : (
          ""
        )}
      </div>
      <label className="error__label">{error}</label>
    </div>
  );
};
