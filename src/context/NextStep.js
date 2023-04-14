import { createContext, useState } from "react";

export const NextStepContext = createContext();

export const NextStepProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  return (
    <NextStepContext.Provider value={{ step, setStep }}>
      {children}
    </NextStepContext.Provider>
  );
};
