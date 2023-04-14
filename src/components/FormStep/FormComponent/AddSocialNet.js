import React, { useEffect, useState } from "react";

import Math from "../../../static/Math.svg";

export const AddSocialNet = ({ selectedItem, linkSocial, validate, socialNetworks, setSocialNetworks }) => {
console.log(socialNetworks);
  const handleAddSocialNetwork = () => {
    const isValid = validate();
    if (isValid) {
      const newSocialNetworks = [
        ...socialNetworks,
        { selectedItem, linkSocial },
      ];
      setSocialNetworks(newSocialNetworks);
    } else {
      console.log("Ошибка");
    }
  };

  return (
    <div className="social__network">
      <button onClick={handleAddSocialNetwork} className="social__network-add">
        <img src={Math} />
        <p>Добавить социальную сеть</p>
      </button>
    </div>
  );
};
