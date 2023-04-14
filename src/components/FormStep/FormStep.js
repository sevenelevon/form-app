import React, { useEffect, useState } from "react";
import { Description } from "./FormComponent/Description";
import iconPerson from "../../static/icon-person.svg";
import { InputText } from "./FormComponent/InputText";
import { InputSelect } from "./FormComponent/InputSelect";
import { InputCheckbox } from "./FormComponent/InputCheckbox";
import { InputDate } from "./FormComponent/InputDate";
import { Button } from "./FormComponent/Button";
import { validateStringField } from "../../validate/ValidateFormText";

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

export const FormStep = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    patronymic: "",
    city: "Санкт-Петербург",
    citizenship: "Russia",
    gender: "Man",
    date: "2023-04-20",
    birthplace: "",
  });

  const [error, setErrors] = useState({});

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };
  const handleCheckboxChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const validateFields = () => {
    const errors = {};
    validateStringField("firstName", formData.firstName, errors);
    validateStringField("lastName", formData.lastName, errors);
    validateStringField("patronymic", formData.patronymic, errors);
    validateStringField("birthplace", formData.birthplace, errors);
    if (!formData.date) {
      errors.date = "Введите дату рождения.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="home__form">
      <Description
        img={iconPerson}
        title={"Общие"}
        descript={"Введите свои персональные данные."}
      />
      <div className="column__input">
        <InputText
          width={334}
          height={52}
          label={"Фамилия*"}
          placeholder={"Васильев"}
          value={formData.lastName}
          name={"lastName"}
          onChange={handleChangeForm}
          error={error.lastName}
        />
        <InputText
          width={334}
          height={52}
          label={"Имя*"}
          placeholder={"Иван"}
          name={"firstName"}
          value={formData.firstName}
          onChange={handleChangeForm}
          error={error.firstName}
        />
      </div>
      <div className="column__input">
        <InputText
          width={334}
          height={52}
          label={"Отчество*"}
          placeholder={"Сергеевич"}
          name={"patronymic"}
          value={formData.patronymic}
          onChange={handleChangeForm}
          error={error.patronymic}
        />
        <InputSelect
          width={334}
          height={52}
          label={"Основной город*"}
          items={cities}
          firstValue={"Санкт-Петербург"}
          onStateChange={(value) => setFormData({ ...formData, city: value })}
        />
      </div>
      <div className="column__input">
        <InputSelect
          width={334}
          height={52}
          label={"Гражданство*"}
          items={citizenship}
          firstValue={"Россия"}
          onStateChange={(value) =>
            setFormData({ ...formData, citizenship: value })
          }
        />
        <InputCheckbox onChange={handleCheckboxChange} />
        <InputDate
          width={147}
          height={52}
          title={"Дата рождения*"}
          onChange={handleDateChange}
          value={formData.date}
        />
      </div>
      <div className="column__input">
        <InputText
          width={708}
          height={52}
          label={"Место рождения (как указано в паспорте)*"}
          placeholder={"Введите наименование региона и населенного пункта"}
          name={"birthplace"}
          value={formData.birthplace}
          onChange={handleChangeForm}
          error={error.birthplace}
        />
      </div>
      <div className="column__input">
        <Button validate={validateFields} />
      </div>
    </div>
  );
};
