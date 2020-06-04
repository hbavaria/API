import {
  ApiTesterActionTypes, UPDATE_JSON, UPDATE_ENDPOINT
} from "./types";

export function updateJson(json: object): ApiTesterActionTypes {
  return {
    type: UPDATE_JSON,
    payload: json
  };
}

export function updateEndpoint(endpoint: string): ApiTesterActionTypes {
  return {
    type: UPDATE_ENDPOINT,
    payload: endpoint
  };
}
