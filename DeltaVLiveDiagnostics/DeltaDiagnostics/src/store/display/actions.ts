import {
  DisplayActionTypes,
  UPDATE_ALL_DISPLAYS,
  UPDATE_DISPLAY_DETAILS,
  UPDATE_DISPLAY_REFERENCE_DATA,
  UPDATE_DISPLAY_PRE_RENDER_PARAMETERS,
  UPDATE_DISPLAY_HIERARCHY,
  SELECT_DISPLAY,
  UPDATE_CONTROL_TAG_DISPLAYS,
  UPDATE_CONTROL_TAG_SEARCH,
  UPDATE_DISPLAY_SEARCH,
  UPDATE_DISPLAY_PRE_RENDER_DISPLAY
} from "./types";

export function updateDisplaySearch(displayName: string): DisplayActionTypes {
  return {
    type: UPDATE_DISPLAY_SEARCH,
    payload: { displayName }
  };
}

export function updateControlTagSearch(controlTag: string): DisplayActionTypes {
  return {
    type: UPDATE_CONTROL_TAG_SEARCH,
    payload: { controlTag }
  };
}

export function updateControlTagDisplays(
  controlTagDisplays: Object
): DisplayActionTypes {
  return {
    type: UPDATE_CONTROL_TAG_DISPLAYS,
    payload: { controlTagDisplays }
  };
}

export function selectDisplay(selectedDisplay: string): DisplayActionTypes {
  return {
    type: SELECT_DISPLAY,
    payload: { selectedDisplay }
  };
}

export function updateAllDisplays(
  allDisplays: Array<String>
): DisplayActionTypes {
  return {
    type: UPDATE_ALL_DISPLAYS,
    payload: { allDisplays }
  };
}

export function updateDisplayDetails(displayDetails: JSON): DisplayActionTypes {
  return {
    type: UPDATE_DISPLAY_DETAILS,
    payload: { displayDetails }
  };
}

export function updateDisplayReferenceData(
  displayReferenceData: JSON
): DisplayActionTypes {
  return {
    type: UPDATE_DISPLAY_REFERENCE_DATA,
    payload: { displayReferenceData }
  };
}

export function updateDisplayPreRenderParameters(
  displayPreRenderParameters: Array<any>
): DisplayActionTypes {
  return {
    type: UPDATE_DISPLAY_PRE_RENDER_PARAMETERS,
    payload: { displayPreRenderParameters }
  };
}

export function updateDisplayPreRenderDisplay(
  displayPreRenderDisplay: Object
): DisplayActionTypes {
  return {
    type: UPDATE_DISPLAY_PRE_RENDER_DISPLAY,
    payload: { displayPreRenderDisplay }
  };
}

export function updateDisplayHierarchy(
  displayHierarchy: Array<any>
): DisplayActionTypes {
  return {
    type: UPDATE_DISPLAY_HIERARCHY,
    payload: { displayHierarchy }
  };
}
