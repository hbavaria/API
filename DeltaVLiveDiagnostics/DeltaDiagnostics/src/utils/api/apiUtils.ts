import * as appConstants from "../../appConstants";
import { IApiRequestDto } from "./interfaces/iapiRequestDto";
/**
 * Helper function for sending fetch requests to OeWeb
 * Returns a payload with the response data and responseTime
 * @param apiEndpoint the endpoint to send the request to
 * @param header an optional header specification for the fetch request
 */
export async function handleFetchAsync(
  apiEndpoint: string,
  header?: object
): Promise<IApiRequestDto> {
  let payload;
  try {
    let timeBeforeApiCall = performance.now();
    const response = await fetch(apiEndpoint, header);
    let timeAfterApiCall = performance.now();
    let responseTime = timeAfterApiCall - timeBeforeApiCall;
    let data = await handleResponseAsync(response);
    payload = createPayload(responseTime, data);
  } catch (error) {
    handleError(error);
  }
  return payload;
}

/**
 * Helper function to handle responses from OeWeb
 * @param response
 */

export async function handleResponseAsync(response) {
  let isJsonContent = response.headers
    .get("content-type")
    .includes("application/json");

  // Some endpoints give a text result instead of json, return the right data
  let content = isJsonContent ? response.json() : response.text();

  if (response.ok) return content;

  if (!response.ok) {
    throw Error(response.statusText);
  }
}

/**
 * Alerts user of errors
 * @param error
 */
export function handleError(error) {
  alert(appConstants.API_CALL_ERROR_MESSAGE(error));
  throw error;
}

/**
 * Helper function to log errors
 * @param error - the error to log
 * @param errorMsg - an optional custom error message
 */
export function logError(error: Error, errorMsg?: string) {
  console.log(`${errorMsg} ${error}`);
}

/**
 * Helper function to create payload for an API call
 * @param responseTime the time in ms that it took to get a response back from the oeweb server
 * @param data the data received from the server
 */
export function createPayload(responseTime, data): IApiRequestDto {
  return {
    responseTime: responseTime,
    data: data
  };
}

/**
 * Get all the associated control tag displays
 * @param controlTagName
 */
export async function getAllDisplaysForControlTagAsync(controlTagName: string) {
  const displayTypes = {
    Primary: "Primary",
    Faceplate: "Faceplate",
    Detail: "Detail"
  };
  let allDisplayNames = {};
  for (let displayType in displayTypes) {
    let payload = await getDisplayForControlTagAsync(
      controlTagName,
      displayTypes[displayType]
    );
    allDisplayNames[displayType] = payload.data;
  }
  return allDisplayNames;
}

/**
 * Get the controlTag display for a given display type
 * @param controlTag
 * @param displayType
 */
async function getDisplayForControlTagAsync(
  controlTag: string,
  displayType: string
) {
  let contextualDisplayEndpoint = appConstants.API_GET_CONTEXTUAL_DISPLAY_ENDPOINT(
    displayType,
    controlTag
  );
  let payload = handleFetchAsync(
    contextualDisplayEndpoint,
    appConstants.API_GET_INCLUDE_HEADER
  );
  return payload;
}
