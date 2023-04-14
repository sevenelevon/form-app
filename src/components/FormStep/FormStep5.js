import React, { useEffect, useState } from "react";

import { Description } from "./FormComponent/Description";
import { InputSelect } from "./FormComponent/InputSelect";

import Social from "../../static/social.svg";
import { Save } from "./FormComponent/Save";
import { AddSocialNet } from "./FormComponent/AddSocialNet";
import { InputText } from "./FormComponent/InputText";
import {
  validateLinkField,
  validateStringField,
} from "../../validate/ValidateFormText";
import { FormSocialSend } from "./FormComponent/FormSocialSend";

const social = [
  { value: "ВКонтакте" },
  { value: "WhatsApp" },
  { value: "YouTube" },
  { value: "Одноклассники" },
  { value: "Facebook" },
  { value: "Viber" },
  { value: "Twitter" },
  { value: "Vimeo" },
  { value: "Skype" },
];

export const FormStep5 = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [error, setError] = useState("");
  const [linkSocial, setLinkSocial] = useState("");
  const [socialNetworks, setSocialNetworks] = useState([]);

  const handleDeleteSocialNetwork = (index) => {
    const newSocialNetworks = [...socialNetworks];
    newSocialNetworks.splice(index, 1);
    setSocialNetworks(newSocialNetworks);
  };

  const validateFields = () => {
    const errors = {};
    validateLinkField("linkSocial", linkSocial, errors);

    console.log(errors);
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("socialNetworks");
    if (storedData) {
      setSocialNetworks(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("socialNetworks", JSON.stringify(socialNetworks));
  }, [socialNetworks]);
  console.log('social', socialNetworks);
  return (
    <div className="home__form">
      <Description
        img={Social}
        title={"Социальные сети"}
        descript={
          "Введите свои действуйющие ссылки на социальные сети и количество подписчиков."
        }
      />
      {socialNetworks.map((socialNetwork, index) => (
        <div className="column__input">
          <InputSelect
            width={334}
            height={52}
            label={"Сайт / Приложение*"}
            firstValue={socialNetwork.selectedItem}
            disabled={true}
          />
          <div className="add__form-social">
            {selectedItem === selectedItem ? (
              <FormSocialSend
                width={334}
                height={52}
                label={""}
                placeholder={"https://vk.com/im"}
                name={"linkSocial"}
                value={socialNetwork.linkSocial}
                link={socialNetwork.linkSocial}
                deleteSocialNet={handleDeleteSocialNetwork}
              />
            ) : null}
          </div>
        </div>
      ))}
      <div className="column__input">
        <InputSelect
          width={334}
          height={52}
          label={"Сайт / Приложение*"}
          firstValue={"Выбрать"}
          items={social}
          onStateChange={setSelectedItem}
        />
        <div className="add__form-social">
          {selectedItem === selectedItem ? (
            <FormSocialSend
              width={334}
              height={52}
              label={""}
              placeholder={"https://vk.com/im"}
              name={"linkSocial"}
              value={linkSocial}
              onChange={(e) => setLinkSocial(e.target.value)}
              error={error.linkSocial}
            />
          ) : null}
        </div>
      </div>

      <div className="column__input" style={{ marginBottom: 420 }}>
        <AddSocialNet
          selectedItem={selectedItem}
          linkSocial={linkSocial}
          validate={validateFields}
          socialNetworks={socialNetworks}
          setSocialNetworks={setSocialNetworks}
        />
      </div>
      <div className="column__input">
        <Save />
      </div>
    </div>
  );
};
