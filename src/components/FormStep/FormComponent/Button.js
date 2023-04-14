import React, { useContext } from "react";

import { NextStepContext } from "../../../context/NextStep";
import { useNavigate } from "react-router-dom";

export const Button = ({ validate }) => {
  const navigate = useNavigate();
  const { step, setStep } = useContext(NextStepContext);

  const handleSubmitCancel = () => {
    localStorage.clear();
    window.location.reload()
    // navigate("/");
  };

  const handleButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      setStep(step + 1);
    } else {
      console.log("Произошла ошибка");
    }
  };

  console.log(step);
  return (
    <div className="button">
      <div>
        <button
          onClick={handleSubmitCancel}
          type="sibmit"
          className="button__cancle"
        >
          Отмена
        </button>
      </div>
      <div>
        <button
          className="button__next"
          type="submit"
          onClick={handleButtonClick}
        >
          Далее
        </button>
      </div>
    </div>
  );
};
