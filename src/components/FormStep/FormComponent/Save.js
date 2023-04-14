import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Save = () => {
  const navigate = useNavigate();

  const formData = JSON.parse(localStorage.getItem("formData"));
  const ownershipOOO = JSON.parse(localStorage.getItem("ownershipOOO"));
  const ownership = JSON.parse(localStorage.getItem("ownership"));
  const adressReg = JSON.parse(localStorage.getItem("adressReg"));
  const residentialAddr = JSON.parse(localStorage.getItem("residentialAddr"));
  const socialNetworks = JSON.parse(localStorage.getItem("socialNetworks"));
  console.log("test", socialNetworks);

  const sendDataToServer = async (...data) => {
    try {
      const response = await axios.post("/api/data", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {};


  const handleButtonClick = () => {
    handleSubmit();
    console.log({
      formData: formData,
      ownershipOOO: ownershipOOO,
      ownership: ownership,
      adressReg: adressReg,
      residentialAddr: residentialAddr,
      socialNetworks: socialNetworks,
    });
    navigate("/end");
  };

  return (
    <div className="button">
      <div>
        <button className="button__cancle">Отмена</button>
      </div>
      <div>
        <button
          className="button__next"
          type="submit"
          onClick={handleButtonClick}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
