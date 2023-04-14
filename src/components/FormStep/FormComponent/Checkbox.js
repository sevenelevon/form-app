import React from "react";

export const Checkbox = ({ checked, text, onChange }) => {
  return (
    <div className="checkbox">
      <input
        className="input__type-checkbox"
        checked={checked}
        onChange={onChange}
        type="checkbox"
      ></input>
      <p className="checbox__text">{text}</p>
    </div>
  );
};
