import { IParameter } from "../parameter/types";
import {
  CREATE_PARAMETER,
  UPDATE_PARAMETER,
  DELETE_PARAMETER,
  ParameterSubscriberActions
} from "./types";

export function createParameter(
  paramData: string[]
): ParameterSubscriberActions {
  return {
    type: CREATE_PARAMETER,
    payload: { paramData }
  };
}

export function updateParameter(
  index: number,
  updatedParam: IParameter
): ParameterSubscriberActions {
  return {
    type: UPDATE_PARAMETER,
    payload: { index, updatedParam }
  };
}

export function deleteParameter(indices: number[]): ParameterSubscriberActions {
  return {
    type: DELETE_PARAMETER,
    payload: { indices }
  };
}
