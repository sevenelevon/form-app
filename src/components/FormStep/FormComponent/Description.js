import React from "react";
import "../../../styles/FormStep/FormStep.css";

export const Description = ({img, title, descript }) => {
  return (
    <div className="descript-header">
      <img src={img} />
      <h2 className="descript__title">{title}</h2>
      <p className="descript__p">{descript}</p>
    </div>
  );
};
