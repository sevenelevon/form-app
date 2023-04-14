import React, { useEffect, useState } from "react";

import { InputText } from "./FormComponent/InputText";
import { InputFile } from "./FormComponent/InputFile";
import { InputDate } from "./FormComponent/InputDate";
import { Button } from "./FormComponent/Button";
import { Description } from "./FormComponent/Description";

import Registration from "../../static/Registration.svg";
import { InputCheckbox } from "./FormComponent/InputCheckbox";
import { InputSelect } from "./FormComponent/InputSelect";
import {
  validateNumberField,
  validateStringField,
} from "../../validate/ValidateFormText";

const cities = [
  { value: "Санкт-Петербург" },
  { value: "Москва" },
  { value: "Воронеж" },
];

const citizenship = [
  { value: "Россия" },
  { value: "Казакстан" },
  { value: "Армения" },
];

export const FormStep3 = () => {
  const [error, setErrors] = useState({});
  const [adressReg, setAdressReg] = useState({
    country: "Россия",
    region: "",
    locality: "",
    street: "",
    house: "",
    apartment: "",
    date: "2023-04-12",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    console.log("test", name, value);
    setAdressReg((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDateChange = (date) => {
    setAdressReg({ ...adressReg, date });
  };

  const validateFields = () => {
    const errors = {};
    validateStringField("locality", adressReg.locality, errors);
    validateStringField("street", adressReg.street, errors);
    validateNumberField("house", adressReg.house, errors, 0);
    validateNumberField("apartment", adressReg.apartment, errors, 0);
    if (!adressReg.date) {
      errors.date = "Введите дату рождения.";
    }

    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("adressReg");
    if (storedData) {
      setAdressReg(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adressReg", JSON.stringify(adressReg));
  }, [adressReg]);

  return (
    <div className="home__form">
      <Description
        img={Registration}
        title={"Адрес регистрации"}
        descript={"Введите свой действуйющий адрес прописки."}
      />
      <div className="column__input">
        <InputSelect
          width={334}
          height={52}
          label={"Страна*"}
          items={citizenship}
          firstValue={"Россия"}
          onStateChange={(value) =>
            setAdressReg({ ...adressReg, country: value })
          }
        />
        <InputSelect
          width={334}
          height={52}
          label={"Регион*"}
          items={cities}
          firstValue={"Выберите Регион"}
          onStateChange={(value) => setAdressReg({ ...adressReg, region: value })}
        />
      </div>
      <div className="column__input">
        <InputText
          width={334}
          height={52}
          label={"Город / Населенный пункт*"}
          placeholder={"Введите населенный пункт"}
          name={"locality"}
          value={adressReg.locality}
          onChange={handleChangeForm}
          error={error.locality}
        />
        <InputText
          width={334}
          height={52}
          label={"Улица*"}
          placeholder={"Введите улицу"}
          name={"street"}
          value={adressReg.street}
          onChange={handleChangeForm}
          error={error.street}
        />
      </div>
      <div className="column__input">
        <InputText
          width={72}
          height={52}
          label={"Дом*"}
          placeholder={"0"}
          name={"house"}
          value={adressReg.house}
          onChange={handleChangeForm}
          error={error.house}
        />
        <InputText
          width={72}
          height={52}
          label={"Квартира*"}
          placeholder={"0"}
          name={"apartment"}
          value={adressReg.apartment}
          onChange={handleChangeForm}
          error={error.apartment}
        />
        <InputDate
          width={157}
          height={52}
          title={"Дата прописки*"}
          onChange={handleDateChange}
          value={adressReg.date}
        />
      </div>
      <div className="column__input">
        <Button validate={validateFields} />
      </div>
    </div>
  );
};
