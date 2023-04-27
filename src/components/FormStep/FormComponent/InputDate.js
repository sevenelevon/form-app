import React from "react";

export const InputDate = ({ width, height, title, onChange, value, name }) => {
  const handleDateChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className="input__text date">
      <label className="label__text">{title}</label>
      <input
        name={name}
        className="date__input"
        style={{ width: width, height: height }}
        type="date"
        value={value}
        onChange={handleDateChange}
      ></input>
    </div>
  );
};
