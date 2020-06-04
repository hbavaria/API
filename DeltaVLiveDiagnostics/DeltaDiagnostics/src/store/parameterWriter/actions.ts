import { IParameter } from "../parameter/types";
import {
  CREATE_PARAMETER,
  UPDATE_PARAMETER,
  DELETE_PARAMETER,
  ParameterWriterActions,
  UPDATE_ESIG_COMMENT,
  UPDATE_ESIG_CONFIRMER_USERNAME,
  UPDATE_ESIG_CONFIRMER_PASSWORD,
  UPDATE_ESIG_VERIFIER_USERNAME,
  UPDATE_ESIG_VERIFIER_PASSWORD,
  UPDATE_PARAMETER_VALUE,
  UPDATE_PARAMETER_SELECTED,
  UPDATE_ESIG_REQUIREMENT
} from "./types";

export function createParameter(
  paramData: string[],
  eSigRequirements?: number[]
): ParameterWriterActions {
  return {
    type: CREATE_PARAMETER,
    payload: { paramData, eSigRequirements }
  };
}

export function updateParameter(
  index: number,
  updatedParam: IParameter
): ParameterWriterActions {
  return {
    type: UPDATE_PARAMETER,
    payload: { index, updatedParam }
  };
}

export function deleteParameter(indices: number[]): ParameterWriterActions {
  return {
    type: DELETE_PARAMETER,
    payload: { indices }
  };
}

export function updateEsigComment(index: number, comment: string) {
  return {
    type: UPDATE_ESIG_COMMENT,
    payload: { index, comment }
  };
}

export function updateEsigConfirmerUsername(
  index: number,
  confirmerUsername: string
) {
  return {
    type: UPDATE_ESIG_CONFIRMER_USERNAME,
    payload: { index, confirmerUsername }
  };
}

export function updateEsigConfirmerPassword(
  index: number,
  confirmerPassword: string
) {
  return {
    type: UPDATE_ESIG_CONFIRMER_PASSWORD,
    payload: { index, confirmerPassword }
  };
}

export function updateEsigVerifierUsername(
  index: number,
  verifierUsername: string
) {
  return {
    type: UPDATE_ESIG_VERIFIER_USERNAME,
    payload: { index, verifierUsername }
  };
}

export function updateEsigVerifierPassword(
  index: number,
  verifierPassword: string
) {
  return {
    type: UPDATE_ESIG_VERIFIER_PASSWORD,
    payload: { index, verifierPassword }
  };
}
export function updateParameterValue(index: number, value: any) {
  return {
    type: UPDATE_PARAMETER_VALUE,
    payload: { index, value }
  };
}

export function updateParameterSelected(index: number, isSelected: boolean) {
  return {
    type: UPDATE_PARAMETER_SELECTED,
    payload: { index, isSelected }
  };
}

export function updateESigRequirement(updatedParameters: IParameter[]) {
  return {
    type: UPDATE_ESIG_REQUIREMENT,
    payload: { updatedParameters }
  };
}
