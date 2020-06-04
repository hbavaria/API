import { IParameter } from "../parameter/types";

export const CREATE_PARAMETER = "CREATE_PARAMETER_SUBSCRIBER";
export const UPDATE_PARAMETER = "UPDATE_PARAMETER_SUBSCRIBER";
export const DELETE_PARAMETER = "DELETE_PARAMETER_SUBSCRIBER";

export interface IParameterSubscriberState {
  readonly parameters: IParameter[];
}

interface ICreateParameterAction {
  type: typeof CREATE_PARAMETER;
  payload: { paramData: string[] };
}

interface IUpdateParameterAction {
  type: typeof UPDATE_PARAMETER;
  payload: { index: number; updatedParam: IParameter };
}

interface IDeleteParameterAction {
  type: typeof DELETE_PARAMETER;
  payload: { indices: number[] };
}

export type ParameterSubscriberActions =
  | ICreateParameterAction
  | IUpdateParameterAction
  | IDeleteParameterAction;
