export const UPDATE_DISPLAY_DETAILS_RESPONSE_TIME =
  "UPDATE_DISPLAY_DETAILS_RESPONSE_TIME";
export const UPDATE_DISPLAY_REFERENCE_DATA_RESPONSE_TIME =
  "UPDATE_DISPLAY_REFERENCE_DATA_RESPONSE_TIME";

export const UPDATE_DISPLAY_PRERENDER_PARAMETERS_RESPONSE_TIME =
  "UPDATE_DISPLAY_PRERENDER_PARAMETERS_RESPONSE_TIME";

export const UPDATE_DISPLAY_PRERENDER_DISPLAY_RESPONSE_TIME =
  "UPDATE_DISPLAY_PRERENDER_DISPLAY_RESPONSE_TIME";

export const UPDATE_API_TESTER_RESPONSE_TIME =
  "UPDATE_API_TESTER_RESPONSE_TIME";

export interface IResponseTimeState {
  displayDetails: number;
  displayReferenceData: number;
  displayPrerenderParameters: number;
  displayPrerenderDisplay: number;
  apiTester: number;
}

export interface IDisplayDetailsResponseTimeAction {
  type: typeof UPDATE_DISPLAY_DETAILS_RESPONSE_TIME;
  payload: number;
}

export interface IDisplayReferenceDataResponseTimeAction {
  type: typeof UPDATE_DISPLAY_REFERENCE_DATA_RESPONSE_TIME;
  payload: number;
}

export interface IDisplayPrerenderParametersResponseTimeAction {
  type: typeof UPDATE_DISPLAY_PRERENDER_PARAMETERS_RESPONSE_TIME;
  payload: number;
}

export interface IDisplayPrerenderDisplayResponseTimeAction {
  type: typeof UPDATE_DISPLAY_PRERENDER_DISPLAY_RESPONSE_TIME;
  payload: number;
}

export interface IApiTesterResponseTimeAction {
  type: typeof UPDATE_API_TESTER_RESPONSE_TIME;
  payload: number;
}

export type ResponseTimeActionTypes =
  | IDisplayDetailsResponseTimeAction
  | IDisplayReferenceDataResponseTimeAction
  | IDisplayPrerenderParametersResponseTimeAction
  | IDisplayPrerenderDisplayResponseTimeAction
  | IApiTesterResponseTimeAction;
