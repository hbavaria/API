import InputWithState from "../components/common/InputWithState";
import React from "react";
import Guid from "./web-sockets/utility/guid";

function getInputWithStateEsigJsx(
  defaultValue: string,
  placeholder: string,
  handleInput
) {
  let jsx: any;
  jsx = (
    <InputWithState
      key={Guid.newGuid()}
      defaultValue={defaultValue}
      placeholder={placeholder}
      fileSelectionEnabled={false}
      handleInput={handleInput}
    />
  );
  return jsx;
}

/**
 * Get the default value from the store based on the eSigDataKey
 * @param index
 * @param eSigDataKey
 */
function getDefaultValue(index, eSigDataKey, props) {
  let defaultValue = props.parameters[index].eSigData
    ? props.parameters[index].eSigData[eSigDataKey]
    : "";
  return defaultValue;
}

/**
 * Gets the proper handleInput function to be passed to the list manager so that the appropriate e sig data is updated in the store when the user inputs it
 * @param index
 * @param eSigDataKey
 */
function getHandleInputFunction(index, eSigDataKey, props) {
  let handleInput;
  if (eSigDataKey === "Comment") {
    handleInput = input => {
      props.parameterWriterActions.updateEsigComment(index, input);
      return input;
    };
  } else if (eSigDataKey === "ConfirmUser") {
    handleInput = input => {
      props.parameterWriterActions.updateEsigConfirmerUsername(index, input);
      return input;
    };
  } else if (eSigDataKey === "ConfirmPassword") {
    handleInput = input => {
      props.parameterWriterActions.updateEsigConfirmerPassword(index, input);
      return input;
    };
  } else if (eSigDataKey === "VerifyUser") {
    handleInput = input => {
      props.parameterWriterActions.updateEsigVerifierUsername(index, input);
      return input;
    };
  } else if (eSigDataKey === "VerifyPassword") {
    handleInput = input => {
      props.parameterWriterActions.updateEsigVerifierPassword(index, input);
      return input;
    };
  }

  return handleInput;
}

export function getESigInput(index, eSigDataKey, props) {
  let defaultValue = getDefaultValue(index, eSigDataKey, props);
  let placeholder = eSigDataKey;
  let handleInput = getHandleInputFunction(index, eSigDataKey, props);
  let jsx = getInputWithStateEsigJsx(defaultValue, placeholder, handleInput);
  return jsx;
}

export function getConfirmerInputs(index, props) {
  let confirmerInputs = [];
  let eSigDataKeyUser = "ConfirmUser";
  confirmerInputs.push(getESigInput(index, eSigDataKeyUser, props));
  let eSigDataKeyPassword = "ConfirmPassword";
  confirmerInputs.push(getESigInput(index, eSigDataKeyPassword, props));
  return confirmerInputs;
}

export function getVerifierInputs(index, props) {
  let verifierInputs = [];
  let eSigDataKeyUser = "VerifyUser";
  verifierInputs.push(getESigInput(index, eSigDataKeyUser, props));
  let eSigDataKeyPassword = "VerifyPassword";
  verifierInputs.push(getESigInput(index, eSigDataKeyPassword, props));
  return verifierInputs;
}
