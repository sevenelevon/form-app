import React, { useRef, useState } from "react";

import Vector from "../../../static/Vector.svg";
import Cross from "../../../static/cross.svg";

export const InputFile = ({
  label,
  placeholder,
  height,
  width,
  onСhange,
  error,
}) => {
  const [filename, setFilename] = useState("");
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFilename(file.name);
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      onСhange(event.target.result)
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFile = e.dataTransfer.files[0];
    setFilename(newFile.name);

    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onload = (event) => {
      onСhange(event.target.result)
    }
  };

  const clearFile = () => {
    setFilename("");
    onСhange("");
  };

  
  return (
    <div className="input__text img__load">
      <label className="label__text">{label}</label>
      <input
        ref={fileInputRef}
        className="input__img-load input__text-custom input__active"
        type="file"
        placeholder={placeholder}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        className="button__file"
      >
        <label className="error__label">{error}</label>
        <button
          style={{ height: height, width: filename ? width : width - 52 }}
          className={`input__text-custom form__button-push ${
            filename ? "push__button-active" : ""
          } ${error ? "input__error" : ""}`}
        >
          {filename ? filename : "Выберите файл"}
        </button>
        <button
          className={`${filename ? "file__cancel" : "file__button"}`}
          {...(filename
            ? { onClick: clearFile }
            : { onClick: handleButtonClick })}
        >
          {filename ? (
            <img className="img-close" src={Cross} />
          ) : (
            <img src={Vector} />
          )}
        </button>
      </div>
    </div>
  );
};
