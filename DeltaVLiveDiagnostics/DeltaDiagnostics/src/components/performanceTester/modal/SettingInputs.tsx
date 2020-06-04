import React from "react";
import IterationDelayForm from "./IterationDelayForm";
import IterationsForm from "./IterationsForm";
import TestDelayForm from "./TestDelayForm";

class SettingInputs extends React.Component {
  render() {
    return (
      <>
        <IterationsForm />
        <IterationDelayForm />
        <TestDelayForm />
      </>
    );
  }
}

export default SettingInputs;
