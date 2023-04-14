import { useContext } from "react";

import { FormStep } from "../components/FormStep/FormStep";
import { LeftSidebar } from "../components/LeftSidebar/LeftSidebar";
import "../styles/main.css";
import { NextStepContext } from "../context/NextStep";
import { FormStep2 } from "../components/FormStep/FormStep2";
import { FormStep3 } from "../components/FormStep/FormStep3";
import { FormStep4 } from "../components/FormStep/FormStep4";
import { FormStep5 } from "../components/FormStep/FormStep5";

function Form() {
  const { step, setStep } = useContext(NextStepContext);
  return (
    <div className="App">
      <LeftSidebar />
      {step === 1 ? <FormStep setStep={setStep} /> : null}
      {step === 2 ? <FormStep2 setStep={setStep} /> : null}
      {step === 3 ? <FormStep3 setStep={setStep} /> : null}
      {step === 4 ? <FormStep4 setStep={setStep} /> : null}
      {step === 5 ? <FormStep5 setStep={setStep} /> : null}
    </div>
  );
}

export default Form;
