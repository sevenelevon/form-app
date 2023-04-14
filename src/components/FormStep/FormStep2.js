import React, { useState } from "react";

import { Description } from "./FormComponent/Description";
import { InputSelect } from "./FormComponent/InputSelect";
import { FormStepIp } from "./FormStepIp";
import { FormStepOOO } from "./FormStepOOO";

import Owner from "../../static/owner-form.svg";
import iconCall from "../../static/icon-call.svg";

const activist = [
  { value: "Индивидуальный предприниматель (ИП)" },
  { value: "Общество с ограниченной ответственностью (ООО)" },
];

export const FormStep2 = () => {
  const [selectedItem, setSelectedItem] = useState("");
  
  console.log("child", selectedItem);
  return (
    <div className="home__form">
      <Description
        img={selectedItem ? Owner : iconCall}
        title={"Форма собственности"}
        descript={"Выберите форму собственности и заполните данные."}
      />
      <div className="column__input">
        <InputSelect
          width={521}
          height={52}
          label={"Основной город*"}
          items={activist}
          firstValue={"Выбрать"}
          onStateChange={setSelectedItem}
        />
      </div>
      {selectedItem === "Индивидуальный предприниматель (ИП)" ? (
        <FormStepIp />
      ) : null}
      {selectedItem === "Общество с ограниченной ответственностью (ООО)" ? (
        <FormStepOOO />
      ) : null}
    </div>
  );
};
