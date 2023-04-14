import React, { useState } from "react";

export const InputCheckbox = ({ onChange }) => {
  const [gender, setGender] = useState("Man");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="checkbox-group">
      <label className="label__text">Пол*</label>
      <div className="form__gender">
        <label className="gender-select gender-select-man">
          <input
            type="radio"
            name="gender"
            value="Man"
            checked={gender === "Man"}
            onChange={handleGenderChange}
          />
          <span>
            <span
              className={`gender__item ${
                gender === "Man" ? "color__gender" : ""
              }`}
              style={{ top: 15, left: 25 }}
            >
              М
            </span>
          </span>
        </label>
        <label className="gender-select gender-select-women">
          <input
            type="radio"
            name="gender"
            value="Women"
            checked={gender === "Women"}
            onChange={handleGenderChange}
          />
          <span>
            <span
              className={`gender__item ${
                gender === "Women" ? "color__gender" : ""
              }`}
              style={{ top: 15, left: 25 }}
            >
              Ж
            </span>
          </span>
        </label>
      </div>
    </div>
  );
};
