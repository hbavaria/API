import {
  IApiTesterState,
  ApiTesterActionTypes,
  UPDATE_JSON,
  UPDATE_ENDPOINT
} from "./types";

const initialState: IApiTesterState = {
  json: {},
  endpoint: ""
};

export function apiTesterReducer(
  state: typeof initialState = initialState,
  action: ApiTesterActionTypes
): IApiTesterState {
  switch (action.type) {
    case UPDATE_JSON:
      return {
        json: action.payload,
        endpoint: state.endpoint
      };
    case UPDATE_ENDPOINT:
      return {
        json: state.json,
        endpoint: action.payload
      };
    default:
      return state;
  }
}
