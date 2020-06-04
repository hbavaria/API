import { IParameter } from "../parameter/types";
import {
  IParameterSubscriberState,
  CREATE_PARAMETER,
  UPDATE_PARAMETER,
  DELETE_PARAMETER
} from "./types";
import { Reducer } from "redux";

const initialState: IParameterSubscriberState = {
  parameters: []
};

const reducer: Reducer<IParameterSubscriberState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_PARAMETER:
      let newParams: IParameter[] = [];
      for (let paramDatum of action.payload.paramData) {
        newParams.push({
          path: paramDatum as string,
          selected: true
        });
      }
      return {
        parameters: [...state.parameters, ...newParams]
      };

    case UPDATE_PARAMETER:
      let index: number = action.payload.index;
      return {
        parameters: [
          ...state.parameters.slice(0, index),
          action.payload.updatedParam,
          ...state.parameters.slice(index + 1)
        ]
      };
    case DELETE_PARAMETER:
      let newParameters: typeof state.parameters = [...state.parameters];

      for (let index of action.payload.indices) {
        newParameters.splice(index, 1);
      }

      return {
        parameters: [...newParameters]
      };
    default:
      return state;
  }
};

export { reducer as parameterSubscriberReducer };
