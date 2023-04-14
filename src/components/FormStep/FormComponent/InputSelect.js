import React, { useState } from "react";

export const InputSelect = ({
  width,
  height,
  items,
  label,
  onStateChange,
  firstValue,
  error,
  disabled,
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [button, setButton] = useState(false);
  const handleButtonClick = (e) => {
    e.preventDefault();
    setButton((prevState) => !prevState);
  };

  const handleListItemClick = (e) => {
    const selectValue = e.target.getAttribute("value");
    onStateChange(selectValue);
    setSelectedItem(selectValue);
    setButton(false);
  };

  return (
    <div className="input__text">
      <label className="label__text">{label}</label>
      <button
        disabled={disabled}
        style={{ width: width, height: height }}
        className={`dropdown_button ${button ? "dropdown_button-flip" : ""}`}
        onClick={handleButtonClick}
      >
        {selectedItem ? selectedItem : firstValue}
      </button>
      <div className="drop__down">
        {button && (
          <ul className="dropdown__list" style={{ width: width }}>
            {items.map((item) => (
              <li
                className="dropdown__list-item"
                onClick={handleListItemClick}
                value={item.value}
                key={item.value}
              >
                {item.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
