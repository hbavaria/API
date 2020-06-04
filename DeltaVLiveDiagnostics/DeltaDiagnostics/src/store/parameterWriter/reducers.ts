import { IParameter } from "../parameter/types";
import {
  IParameterWriterState,
  CREATE_PARAMETER,
  UPDATE_PARAMETER,
  DELETE_PARAMETER,
  UPDATE_ESIG_COMMENT,
  UPDATE_ESIG_CONFIRMER_PASSWORD,
  UPDATE_ESIG_CONFIRMER_USERNAME,
  UPDATE_ESIG_VERIFIER_PASSWORD,
  UPDATE_ESIG_VERIFIER_USERNAME,
  UPDATE_PARAMETER_VALUE,
  UPDATE_PARAMETER_SELECTED,
  UPDATE_ESIG_REQUIREMENT
} from "./types";
import { Reducer } from "redux";
import IESigData from "../../utils/web-sockets/interfaces/iEsigData";

const initialState: IParameterWriterState = {
  parameters: []
};

const reducer: Reducer<IParameterWriterState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_PARAMETER: {
      let newParams: IParameter[] = [];
      let paramData: string[];
      let newParam: IParameter;

      for (
        let index: number = 0;
        index < action.payload.paramData.length;
        index++
      ) {
        paramData = action.payload.paramData[index].split(":");
        newParam = {
          path: paramData[0] as string,
          selected: true,
          value: paramData[1],
          eSigRequirement:
            action.payload.eSigRequirements !== undefined
              ? action.payload.eSigRequirements[index]
              : -1,
          eSigData: {}
        };

        newParams.push(newParam);
      }

      return {
        parameters: [...state.parameters, ...newParams]
      };
    }
    case UPDATE_ESIG_COMMENT: {
      let paramIndex = action.payload.index;
      let parameter = state.parameters[paramIndex];
      let updatedEsigData: IESigData = {
        ...parameter.eSigData,
        Comment: action.payload.comment
      };
      let updatedParameter = {
        ...parameter,
        eSigData: updatedEsigData
      };
      return {
        parameters: [
          ...state.parameters.slice(0, paramIndex),
          updatedParameter,
          ...state.parameters.slice(paramIndex + 1)
        ]
      };
    }
    case UPDATE_ESIG_CONFIRMER_USERNAME: {
      let paramIndex = action.payload.index;
      let parameter = state.parameters[paramIndex];
      let updatedEsigData: IESigData = {
        ...parameter.eSigData,
        ConfirmUser: action.payload.confirmerUsername
      };
      let updatedParameter = {
        ...parameter,
        eSigData: updatedEsigData
      };
      return {
        parameters: [
          ...state.parameters.slice(0, paramIndex),
          updatedParameter,
          ...state.parameters.slice(paramIndex + 1)
        ]
      };
    }
    case UPDATE_ESIG_CONFIRMER_PASSWORD: {
      let paramIndex = action.payload.index;
      let parameter = state.parameters[paramIndex];
      let updatedEsigData: IESigData = {
        ...parameter.eSigData,
        ConfirmPassword: action.payload.confirmerPassword
      };
      let updatedParameter = {
        ...parameter,
        eSigData: updatedEsigData
      };
      return {
        parameters: [
          ...state.parameters.slice(0, paramIndex),
          updatedParameter,
          ...state.parameters.slice(paramIndex + 1)
        ]
      };
    }
    case UPDATE_ESIG_VERIFIER_USERNAME: {
      let paramIndex = action.payload.index;
      let parameter = state.parameters[paramIndex];
      let updatedEsigData: IESigData = {
        ...parameter.eSigData,
        VerifyUser: action.payload.verifierUsername
      };
      let updatedParameter = {
        ...parameter,
        eSigData: updatedEsigData
      };
      return {
        parameters: [
          ...state.parameters.slice(0, paramIndex),
          updatedParameter,
          ...state.parameters.slice(paramIndex + 1)
        ]
      };
    }
    case UPDATE_ESIG_VERIFIER_PASSWORD: {
      let paramIndex = action.payload.index;
      let parameter = state.parameters[paramIndex];
      let updatedEsigData: IESigData = {
        ...parameter.eSigData,
        VerifyPassword: action.payload.verifierPassword
      };
      let updatedParameter = {
        ...parameter,
        eSigData: updatedEsigData
      };
      return {
        parameters: [
          ...state.parameters.slice(0, paramIndex),
          updatedParameter,
          ...state.parameters.slice(paramIndex + 1)
        ]
      };
    }
    case UPDATE_ESIG_REQUIREMENT: {
      return {
        parameters: [...action.payload.updatedParameters]
      };
    }
    case UPDATE_PARAMETER: {
      let index: number = action.payload.index;
      return {
        parameters: [
          ...state.parameters.slice(0, index),
          action.payload.updatedParam,
          ...state.parameters.slice(index + 1)
        ]
      };
    }
    case UPDATE_PARAMETER_VALUE: {
      let paramIndex = action.payload.index;
      let parameter = state.parameters[paramIndex];
      let updatedParameter = {
        ...parameter,
        value: action.payload.value
      };
      return {
        parameters: [
          ...state.parameters.slice(0, paramIndex),
          updatedParameter,
          ...state.parameters.slice(paramIndex + 1)
        ]
      };
    }
    case UPDATE_PARAMETER_SELECTED: {
      let paramIndex = action.payload.index;
      let parameter = state.parameters[paramIndex];
      let updatedParameter = {
        ...parameter,
        selected: action.payload.isSelected
      };
      return {
        parameters: [
          ...state.parameters.slice(0, paramIndex),
          updatedParameter,
          ...state.parameters.slice(paramIndex + 1)
        ]
      };
    }
    case DELETE_PARAMETER: {
      let newParameters: IParameter[] = [...state.parameters];

      for (let index of action.payload.indices) {
        newParameters.splice(index, 1);
      }

      return {
        parameters: [...newParameters]
      };
    }
    default:
      return state;
  }
};

export { reducer as parameterWriterReducer };
