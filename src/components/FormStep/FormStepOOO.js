import React, { useEffect, useState } from "react";
import { InputText } from "./FormComponent/InputText";
import { InputFile } from "./FormComponent/InputFile";
import { InputDate } from "./FormComponent/InputDate";
import { Button } from "./FormComponent/Button";
import { AutoFilling } from "./FormComponent/AutoFilling";
import {
  validateFileField,
  validateNumberField,
  validateStringField,
} from "../../validate/ValidateFormText";
import { NoDataFound } from "./FormComponent/NoDataFound";

const company = [
  {
    nameCompany: "ООО «Булочный комбинат имени пам пам»",
    reducedCompany: "ООО «БКИПП»",
    dateRegistration: "2023-03-27",
    INN: 1234567891,
    OGRN: 109876543211,
  },
  {
    nameCompany: "ООО «Общественное товароб»",
    reducedCompany: "ООО «ОТ»",
    dateRegistration: "2023-10-17",
    INN: 123455134891,
    OGRN: 309876543211,
  },
  {
    nameCompany: "ООО «Деятоо калабро»",
    reducedCompany: "ООО «ДК»",
    dateRegistration: "2020-06-12",
    INN: 123455134891,
    OGRN: 509876543211,
  },
  {
    nameCompany: "ООО «Меха девяткиено»",
    reducedCompany: "ООО «МД»",
    dateRegistration: "2017-03-07",
    INN: 123455134891,
    OGRN: 609876543211,
  },
  {
    nameCompany: "ООО Отдых Питер",
    reducedCompany: "ООО «МД»",
    dateRegistration: "2017-03-07",
    INN: 123455134891,
    OGRN: 609876543211,
  },
];

export const FormStepOOO = () => {
  const [isAutoFillingVisible, setIsAutoFillingVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setErrors] = useState({});
  const [ownershipOOO, setOwnershipOOO] = useState({
    nameCompany: "",
    reducedCompany: "",
    dateRegistration: "1995-03-21",
    INN: "",
    OGRN: "",
    scanINN: "",
    scanEGRIP: "",
  });

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    const foundCompany = company.find((c) =>
      c.nameCompany.toLowerCase().includes(e.target.value.toLowerCase())
    );
    
    if (foundCompany) {
      setSelectedCompany(foundCompany);
    } else {
      setSelectedCompany("");
    }
  };

  const handleAutoFillClick = () => {
    setOwnershipOOO({
      ...ownershipOOO,
      nameCompany: selectedCompany.nameCompany,
      reducedCompany: selectedCompany.reducedCompany,
      dateRegistration: selectedCompany.dateRegistration,
      INN: selectedCompany.INN,
      OGRN: selectedCompany.OGRN,
    });
    setSearchTerm({
      ...searchTerm,
      nameCompany: selectedCompany.nameCompany,
    });
  };

  const handleInputFocus = () => {
    setIsAutoFillingVisible(true);
  };

  const handleInputBlur = () => {
    setIsAutoFillingVisible(false);
  };

  const handleFileChangeScanEGRIP = (scanEGRIP) => {
    setOwnershipOOO({ ...ownershipOOO, scanEGRIP });
  };

  const handleFileChangeScanINN = (scanINN) => {
    setOwnershipOOO({ ...ownershipOOO, scanINN });
  };

  const handleDateChange = (dateRegistration) => {
    setOwnershipOOO({ ...ownershipOOO, dateRegistration});
  };

  const validateFields = () => {
    const errors = {};
    validateStringField("reducedCompany", ownershipOOO.reducedCompany, errors);
    validateNumberField("INN", ownershipOOO.INN, errors, 10);
    validateNumberField("OGRN", ownershipOOO.OGRN, errors, 10);
    validateFileField("scanINN", ownershipOOO.scanINN, errors);
    validateFileField("scanEGRIP", ownershipOOO.scanEGRIP, errors);

    if (!ownershipOOO.dateRegistration) {
      errors.dateRegistration = "Введите дату.";
    }

    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("ownershipOOO");
    if (storedData) {
      setOwnershipOOO(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ownershipOOO", JSON.stringify(ownershipOOO));
  }, [ownershipOOO]);

  return (
    <div>
      <div className="column__input">
        <div className="auto__filling-component">
          <InputText
            width={511}
            height={52}
            label={"Наименование полное*"}
            placeholder={"ООО «Московская промышленная компания»"}
            value={searchTerm.nameCompany}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {selectedCompany ? (
            <AutoFilling
              company={selectedCompany}
              onAutoFillClick={handleAutoFillClick}
              isVisible={isAutoFillingVisible}
            />
          ) : null}
        </div>
        <InputText
          width={157}
          height={52}
          label={"Сокращение*"}
          placeholder={"ООО «МПК»"}
          value={ownershipOOO.reducedCompany}
          onChange={(event) =>
            setOwnershipOOO({ ...ownershipOOO, reducedCompany: event.target.value })
          }
          error={error.reducedCompany}
        />
      </div>
      <div className="column__input">
        <InputDate
          width={157}
          height={52}
          title={"Дата регистрации*"}
          value={ownershipOOO.dateRegistration}
          onChange={handleDateChange}
        />
        <InputText
          width={157}
          height={52}
          label={"ИНН*"}
          placeholder={"хххххххххх"}
          value={ownershipOOO.INN}
          onChange={(event) =>
            setOwnershipOOO({ ...ownershipOOO, INN: event.target.value })
          }
          error={error.INN}
        />
        <InputFile
          label={"Скан ИНН**"}
          placeholder={"Выберите или перетащите файл"}
          height={52}
          width={334}
          onСhange={handleFileChangeScanINN}
          name={"scanINN"}
          error={error.scanINN}
        />
      </div>
      <div className="column__input">
        <InputText
          width={157}
          height={52}
          label={"ОГРН*"}
          placeholder={"ххххххххххххх"}
          value={ownershipOOO.OGRN}
          onChange={(event) =>
            setOwnershipOOO({ ...ownershipOOO, OGRN: event.target.value })
          }
          error={error.OGRN}
        />
        <InputFile
          label={"Скан выписки из ЕГРИП (не старше 3 месяцев)*"}
          placeholder={"Выберите или перетащите файл"}
          height={52}
          width={334}
          name={"scanEGRIP"}
          onСhange={handleFileChangeScanEGRIP}
          error={error.scanEGRIP}
        />
      </div>
      <div className="column__input">
        <Button validate={validateFields} />
      </div>
    </div>
  );
};
