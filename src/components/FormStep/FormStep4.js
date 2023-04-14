import React, { useEffect, useState } from "react";

import { Description } from "./FormComponent/Description";
import { InputSelect } from "./FormComponent/InputSelect";
import { InputText } from "./FormComponent/InputText";
import { Button } from "./FormComponent/Button";
import { InputDate } from "./FormComponent/InputDate";

import Residential from "../../static/residential.svg";
import {
  validateNumberField,
  validateStringField,
} from "../../validate/ValidateFormText";
import { Checkbox } from "./FormComponent/Checkbox";

const citiesRussia = [
  { value: "Санкт-Петербург" },
  { value: "Москва" },
  { value: "Воронеж" },
];

const citiesKazakhstan = [
  { value: "Өскемен" },
  { value: "Қызылорда" },
];

const citiesArmenia = [
  { value: "Երևան" },
  { value: "Հրազդան" },
];

const citizenship = [
  { value: "Россия" },
  { value: "Қазақстан" },
  { value: "Կիզիլորդա" },
];

export const FormStep4 = () => {
  const [error, setErrors] = useState({});
  const [registrationAddress, setRegistrationAddress] = useState(false);
  const [noAddress, setNoAddress] = useState(false);
  const [residentialAddr, setResidentialAddr] = useState({
    registrationAddress: registrationAddress,
    country: "Россия",
    region: "",
    locality: "",
    street: "",
    house: "",
    apartment: "",
    noAddress: noAddress,
    date: "2023-04-12",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    console.log("test", name, value);
    setResidentialAddr((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCheckboxChange = (event) => {
    setRegistrationAddress(event.target.checked);
    setResidentialAddr((prevState) => ({
      ...prevState,
      registrationAddress: event.target.checked,
    }));
  };

  const handleCheckboxChangeNoAddress = (event) => {
    setNoAddress(event.target.checked);
    setResidentialAddr((prevState) => ({
      ...prevState,
      noAddress: event.target.checked,
    }));
  };

  const handleDateChange = (date) => {
    setResidentialAddr({ ...residentialAddr, date });
  };

  const validateFields = () => {
    const errors = {};
    validateStringField("locality", residentialAddr.locality, errors);
    validateStringField("street", residentialAddr.street, errors);
    validateNumberField("house", residentialAddr.house, errors, 0);
    validateNumberField("apartment", residentialAddr.apartment, errors, 0);
    if (!residentialAddr.date) {
      errors.date = "Введите дату рождения.";
    }

    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  console.log(residentialAddr.country);
  useEffect(() => {
    const storedData = localStorage.getItem("residentialAddr");
    if (storedData) {
      setResidentialAddr(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("residentialAddr", JSON.stringify(residentialAddr));
  }, [residentialAddr]);

  return (
    <div className="home__form">
      <Description
        img={Residential}
        title={"Адрес проживания"}
        descript={"Введите свой действуйющий адрес прописки."}
      />
      <div className="column__input" style={{ marginBottom: 40 }}>
        <Checkbox
          checked={registrationAddress}
          text={"Адрес регистрации и фактического проживания совпадают"}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="column__input">
        <InputSelect
          width={334}
          height={52}
          label={"Страна*"}
          firstValue={"Россия"}
          items={citizenship}
          onStateChange={(value) =>
            setResidentialAddr({ ...residentialAddr, country: value })
          }
        />
        <InputSelect
          width={334}
          height={52}
          label={"Регион*"}
          firstValue={"Выберите Регион"}
          items={
            residentialAddr.country === "Россия" ? citiesRussia : 
            residentialAddr.country === "Қазақстан" ? citiesKazakhstan :
            residentialAddr.country === "Կիզիլորդա" ? citiesArmenia : []
          }
          onStateChange={(value) =>
            setResidentialAddr({ ...residentialAddr, region: value })
          }
        />
      </div>
      <div className="column__input">
        <InputText
          width={334}
          height={52}
          label={"Город / Населенный пункт*"}
          placeholder={"Введите населенный пункт"}
          name={"locality"}
          value={residentialAddr.locality}
          onChange={handleChangeForm}
          error={error.locality}
        />
        <InputText
          width={334}
          height={52}
          label={"Улица*"}
          placeholder={"Введите улицу"}
          name={"street"}
          value={residentialAddr.street}
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
          value={residentialAddr.house}
          onChange={handleChangeForm}
          error={error.house}
        />
        <InputText
          width={72}
          height={52}
          label={"Квартира*"}
          placeholder={"0"}
          name={"apartment"}
          value={residentialAddr.apartment}
          onChange={handleChangeForm}
          error={error.apartment}
        />
        <div className="no__address-element">
          <Checkbox
            checked={noAddress}
            text={"Нет квартиры"}
            onChange={handleCheckboxChangeNoAddress}
          />
        </div>
        <InputDate
          width={157}
          height={52}
          title={"Дата прописки*"}
          onChange={handleDateChange}
          value={residentialAddr.date}
        />
      </div>
      <div className="column__input">
        <Button validate={validateFields} />
      </div>
    </div>
  );
};
