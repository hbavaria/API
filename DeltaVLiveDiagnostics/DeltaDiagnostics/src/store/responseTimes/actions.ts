import {
  ResponseTimeActionTypes,
  UPDATE_DISPLAY_DETAILS_RESPONSE_TIME,
  UPDATE_DISPLAY_REFERENCE_DATA_RESPONSE_TIME,
  UPDATE_DISPLAY_PRERENDER_PARAMETERS_RESPONSE_TIME,
  UPDATE_DISPLAY_PRERENDER_DISPLAY_RESPONSE_TIME,
  UPDATE_API_TESTER_RESPONSE_TIME
} from "./types";

export function updateDisplayDetailsResponseTime(
  responseTime: number
): ResponseTimeActionTypes {
  return {
    type: UPDATE_DISPLAY_DETAILS_RESPONSE_TIME,
    payload: responseTime
  };
}

export function updateDisplayReferenceDataResponseTime(
  responseTime: number
): ResponseTimeActionTypes {
  return {
    type: UPDATE_DISPLAY_REFERENCE_DATA_RESPONSE_TIME,
    payload: responseTime
  };
}

export function updateDisplayPreRenderParametersResponseTime(
  responseTime: number
): ResponseTimeActionTypes {
  return {
    type: UPDATE_DISPLAY_PRERENDER_PARAMETERS_RESPONSE_TIME,
    payload: responseTime
  };
}

export function updateDisplayPreRenderDisplayResponseTime(
  responseTime: number
): ResponseTimeActionTypes {
  return {
    type: UPDATE_DISPLAY_PRERENDER_DISPLAY_RESPONSE_TIME,
    payload: responseTime
  };
}

export function updateApiTesterResponseTime(
  responseTime: number
): ResponseTimeActionTypes {
  return {
    type: UPDATE_API_TESTER_RESPONSE_TIME,
    payload: responseTime
  };
}
