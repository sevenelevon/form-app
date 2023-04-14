import React, { useContext } from "react";

import { NextStepContext } from "../../context/NextStep";
import '../../styles/LeftSidebar/LeftSidebar.css'

const stepNumber = [
  { item: "Общие" },
  { item: "Форма собственности" },
  { item: "Адрес регистрации" },
  { item: "Адрес проживания" },
  { item: "Социальные сети" },
];

export const LeftSidebar = () => {
  const { step, setStep } = useContext(NextStepContext);
  return (
    <div className="left__sidebar">
      <h1 className="sidebar-text">Создание аккаунта</h1>
      <p className="sidebar-paragraph">
        Заполните все пункты данной формы и нажмите кнопку «Сохранить».
      </p>
      <ul className="item">
        {stepNumber.map((element, index) => (
          <li className="list__item-num" key={index}>
            <div className={`num__next ${index === step - 1 ? "num__next-current": ""} ${index < step - 1 ? "before__step": ""}`}>{index + 1}</div>
            <a className={` list__item-text ${index < step - 1 ? "before-step-icon": ""}`}>{element.item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
