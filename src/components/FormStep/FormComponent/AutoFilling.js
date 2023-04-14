import React, { useEffect, useState } from "react";

export const AutoFilling = ({ company, onAutoFillClick, isVisible }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isButtonClicked && !isVisible) {
      timeout = setTimeout(() => {
        setIsComponentVisible(false);
      }, 100);
    } else {
      setIsComponentVisible(true);
    }
    return () => clearTimeout(timeout);
  }, [isButtonClicked, isVisible]);


  console.log(isComponentVisible);
  return (
    <div
      className={`auto__filling ${isComponentVisible  ? "visible" : "filling__hidden"}`}
    >
      {!isButtonClicked && (
        <button
          onClick={onAutoFillClick}
          className="input__text-custom form__button-push auto__filing-button"
        >
          {company.nameCompany}
        </button>
      )}
    </div>
  );
};
