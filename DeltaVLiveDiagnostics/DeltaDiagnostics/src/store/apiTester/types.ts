export const UPDATE_JSON = "UPDATE_JSON";
export const UPDATE_ENDPOINT = "UPDATE_ENDPOINT";

export interface IApiTesterState {
  json: object;
  endpoint: string;
}

export interface IUpdateJsonAction {
  type: typeof UPDATE_JSON;
  payload: object;
}

export interface IUpdateEndpointAction {
  type: typeof UPDATE_ENDPOINT;
  payload: string;
}

export type ApiTesterActionTypes =
  | IUpdateJsonAction | IUpdateEndpointAction;
