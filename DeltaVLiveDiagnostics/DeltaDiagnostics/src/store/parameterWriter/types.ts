import { IParameter } from "../parameter/types";

export const CREATE_PARAMETER = "CREATE_PARAMETER_WRITER";
export const UPDATE_PARAMETER = "UPDATE_PARAMETER_WRITER";
export const DELETE_PARAMETER = "DELETE_PARAMETER_WRITER";
export const UPDATE_ESIG_COMMENT = "UPDATE_ESIG_COMMENT";
export const UPDATE_ESIG_CONFIRMER_USERNAME = "UPDATE_ESIG_CONFIRMER_USERNAME";
export const UPDATE_ESIG_CONFIRMER_PASSWORD = "UPDATE_ESIG_CONFIRMER_PASSWORD";
export const UPDATE_ESIG_VERIFIER_USERNAME = "UPDATE_ESIG_VERIFIER_USERNAME";
export const UPDATE_ESIG_VERIFIER_PASSWORD = "UPDATE_ESIG_VERIFIER_PASSWORD";
export const UPDATE_PARAMETER_VALUE = "UPDATE_PARAMETER_VALUE";
export const UPDATE_PARAMETER_SELECTED = "UPDATE_PARAMETER_SELECTED";
export const UPDATE_ESIG_REQUIREMENT = "UPDATE_ESIG_REQUIREMENT";

export interface IParameterWriterState {
  readonly parameters: IParameter[];
}

interface ICreateParameterAction {
  type: typeof CREATE_PARAMETER;
  payload: { paramData: string[]; eSigRequirements?: number[] };
}

interface IUpdateParameterAction {
  type: typeof UPDATE_PARAMETER;
  payload: { index: number; updatedParam: IParameter };
}

interface IDeleteParameterAction {
  type: typeof DELETE_PARAMETER;
  payload: { indices: number[] };
}

interface IUpdateESigComment {
  type: typeof UPDATE_ESIG_COMMENT;
  payload: { index: number; comment: string };
}

interface IUpdateESigConfirmerUsername {
  type: typeof UPDATE_ESIG_CONFIRMER_USERNAME;
  payload: { index: number; confirmerUsername: string };
}

interface IUpdateESigConfirmerPassword {
  type: typeof UPDATE_ESIG_CONFIRMER_PASSWORD;
  payload: { index: number; confirmerPassword: string };
}

interface IUpdateVerifierUsername {
  type: typeof UPDATE_ESIG_VERIFIER_USERNAME;
  payload: { index: number; verifierUsername: string };
}

interface IUpdateVerifierPassword {
  type: typeof UPDATE_ESIG_VERIFIER_USERNAME;
  payload: { index: number; verifierPassword: string };
}

interface IUpdateParameterValue {
  type: typeof UPDATE_PARAMETER_VALUE;
  payload: { index: number; parameterValue: any };
}

interface IUpdateParameterSelected {
  type: typeof UPDATE_PARAMETER_SELECTED;
  payload: { index: number; isSelected: boolean };
}

interface IUpdateESigRequirement {
  type: typeof UPDATE_ESIG_REQUIREMENT;
  payload: { updatedParameters: IParameter[] };
}

export type ParameterWriterActions =
  | ICreateParameterAction
  | IUpdateParameterAction
  | IDeleteParameterAction
  | IUpdateESigComment
  | IUpdateESigConfirmerUsername
  | IUpdateESigConfirmerPassword
  | IUpdateVerifierUsername
  | IUpdateVerifierPassword
  | IUpdateParameterValue
  | IUpdateParameterSelected
  | IUpdateESigRequirement;
