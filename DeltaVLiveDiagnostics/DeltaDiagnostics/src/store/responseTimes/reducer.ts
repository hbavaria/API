import {
  IResponseTimeState,
  ResponseTimeActionTypes,
  UPDATE_DISPLAY_DETAILS_RESPONSE_TIME,
  UPDATE_DISPLAY_REFERENCE_DATA_RESPONSE_TIME,
  UPDATE_DISPLAY_PRERENDER_PARAMETERS_RESPONSE_TIME,
  UPDATE_DISPLAY_PRERENDER_DISPLAY_RESPONSE_TIME,
  UPDATE_API_TESTER_RESPONSE_TIME
} from "./types";

const responseTimeInitialState: IResponseTimeState = {
  displayDetails: 0,
  displayReferenceData: 0,
  displayPrerenderParameters: 0,
  displayPrerenderDisplay: 0,
  apiTester: 0
};

export function responseTimeReducer(
  state = responseTimeInitialState,
  action: ResponseTimeActionTypes
): IResponseTimeState {
  switch (action.type) {
    case UPDATE_DISPLAY_DETAILS_RESPONSE_TIME:
      return { ...state, displayDetails: action.payload };
    case UPDATE_DISPLAY_REFERENCE_DATA_RESPONSE_TIME:
      return { ...state, displayReferenceData: action.payload };
    case UPDATE_DISPLAY_PRERENDER_PARAMETERS_RESPONSE_TIME:
      return { ...state, displayPrerenderParameters: action.payload };
    case UPDATE_DISPLAY_PRERENDER_DISPLAY_RESPONSE_TIME:
      return { ...state, displayPrerenderDisplay: action.payload };
    case UPDATE_API_TESTER_RESPONSE_TIME:
      return { ...state, apiTester: action.payload };
    default:
      return state;
  }
}
