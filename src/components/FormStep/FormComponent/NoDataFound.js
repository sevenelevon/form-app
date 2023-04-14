import React from "react";

import Warning from "../../../static/warning.svg" 

export const NoDataFound = () => {
  return (
    <div className="data__error">
      <img className="img__warning" src={Warning} />
      <p className="data__error-info">
        Организация не найдена.
      </p>
    </div>
  );
};
