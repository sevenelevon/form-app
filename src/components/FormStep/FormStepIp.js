import React, { useEffect, useState } from "react";

import { InputText } from "./FormComponent/InputText";
import { InputFile } from "./FormComponent/InputFile";
import { InputDate } from "./FormComponent/InputDate";
import { Button } from "./FormComponent/Button";
import {
  validateFileField,
  validateNumberField,
} from "../../validate/ValidateFormText";
import { Checkbox } from "./FormComponent/Checkbox";

export const FormStepIp = () => {
  const [contract, setContract] = useState(false)
  const [ownership, setOwnership] = useState({
    INN: "",
    scanINN: "",
    dateRegistration: "2023-04-17",
    OGRNIP: "",
    citizenship: "Russia",
    scanORNIP: "",
    scanLease: "",
    scanEGRIP: "",
    contract: contract,
  });
  const [error, setErrors] = useState({});

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setOwnership((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDateChange = (dateRegistration) => {
    setOwnership({ ...ownership, dateRegistration });
  };

  const handleFileChangeScanINN = (scanINN) => {
    setOwnership({ ...ownership, scanINN });
  };
  const handleFileChangeScanORNIP = (scanORNIP) => {
    setOwnership({ ...ownership, scanORNIP });
  };
  const handleFileChangeScanLease = (scanLease) => {
    setOwnership({ ...ownership, scanLease });
  };
  const handleFileChangeScanEGRIP = (scanEGRIP) => {
    setOwnership({ ...ownership, scanEGRIP });
  };
  const handleCheckboxChange = (event) => {
    setContract(event.target.checked);
    setOwnership((prevState) => ({
      ...prevState,
      contract: event.target.checked,
    }));
  };

  const validateFields = () => {
    const errors = {};

    validateNumberField("INN", ownership.INN, errors, 10);
    validateNumberField("OGRNIP", ownership.OGRNIP, errors, 10);
    validateFileField("scanINN", ownership.scanINN, errors);
    validateFileField("scanORNIP", ownership.scanORNIP, errors);
    validateFileField("scanLease", ownership.scanLease, errors);
    validateFileField("scanEGRIP", ownership.scanEGRIP, errors);

    if (!ownership.dateRegistration) {
      errors.dateRegistration = "Введите дату.";
    }

    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("ownership");
    if (storedData) {
      setOwnership(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ownership", JSON.stringify(ownership));
  }, [ownership]);
  console.log("contract", contract);
  return (
    <div>
      <div className="column__input">
        <InputText
          width={157}
          height={52}
          label={"ИНН*"}
          placeholder={"хххххххххх"}
          value={ownership.INN}
          name={"INN"}
          onChange={handleChangeForm}
          error={error.INN}
        />
        <InputFile
          label={"Скан ИНН*"}
          placeholder={"Выберите или перетащите файл"}
          height={52}
          width={334}
          onСhange={handleFileChangeScanINN}
          name={"scanINN"}
          error={error.scanINN}
        />
        <InputDate
          width={157}
          height={52}
          title={"Дата регистрации*"}
          value={ownership.dateRegistration}
          onChange={handleDateChange}
        />
      </div>
      <div className="column__input">
        <InputText
          width={334}
          height={52}
          label={"ОГРНИП*"}
          placeholder={"ххххххххххххххх"}
          value={ownership.OGRNIP}
          name={"OGRNIP"}
          onChange={handleChangeForm}
          error={error.OGRNIP}
        />
        <InputFile
          label={"Скан ОГРНИП*"}
          placeholder={"Выберите или перетащите файл"}
          height={52}
          width={334}
          onСhange={handleFileChangeScanORNIP}
          error={error.scanORNIP}
        />
      </div>
      <div className="column__input">
        <InputFile
          label={"Скан договора аренды помещения (офиса)"}
          placeholder={"Выберите или перетащите файл"}
          width={334}
          height={52}
          onСhange={handleFileChangeScanLease}
          error={error.scanLease}
        />
        <InputFile
          label={"Скан выписки из ЕГРИП (не старше 3 месяцев)*"}
          placeholder={"Выберите или перетащите файл"}
          height={52}
          width={334}
          onСhange={handleFileChangeScanEGRIP}
          error={error.scanEGRIP}
        />
      </div>
      <div className="column__input">
        <Checkbox
          checked={contract}
          text={"Нет договора"}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="column__input">
        <Button validate={validateFields} />
      </div>
    </div>
  );
};
