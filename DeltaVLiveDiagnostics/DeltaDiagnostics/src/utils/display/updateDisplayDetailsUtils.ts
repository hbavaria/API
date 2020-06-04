import { handleFetchAsync } from "../api/apiUtils";
import * as appConstants from "../../appConstants";

/**
 * When a user selects a display, we need to make various api calls to update the redux store so that our components can access the updates
 */

/**
 * Updates pre render display for a given display
 * @param chosenDisplay
 * @param props
 */
async function updatePreRenderDisplayAsync(chosenDisplay, props) {
  let preRenderDisplayEndpoint = appConstants.API_GET_PRERENDER_DISPLAY_ENDPOINT(
    chosenDisplay
  );
  let preRenderDisplayFetchResult = await handleFetchAsync(
    preRenderDisplayEndpoint,
    appConstants.API_GET_INCLUDE_HEADER
  );
  props.displayActions.updateDisplayPreRenderDisplay(
    preRenderDisplayFetchResult.data
  );
  props.responseTimeActions.updateDisplayPreRenderDisplayResponseTime(
    preRenderDisplayFetchResult.responseTime
  );
}

/**
 * Updates the referenceData, details, and pre render parameters for a given display
 * @param chosenDisplay
 * @param props
 */
export async function updateDetails(chosenDisplay, props) {
  props.displayActions.selectDisplay(chosenDisplay);
  updatePreRenderDisplayAsync(chosenDisplay, props);
}
