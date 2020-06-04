import {
  ISelectedDisplayState,
  IAllDisplaysState,
  IDisplayDetailsState,
  IDisplayReferenceDataState,
  IDisplayPreRenderParametersState,
  IDisplayPreRenderDisplayState,
  IDisplayHierarchyState,
  IDisplaySearchState,
  IControlTagDisplaysState,
  IControlTagSearchState,
  DisplayActionTypes,
  UPDATE_ALL_DISPLAYS,
  UPDATE_DISPLAY_DETAILS,
  UPDATE_DISPLAY_REFERENCE_DATA,
  UPDATE_DISPLAY_PRE_RENDER_PARAMETERS,
  UPDATE_DISPLAY_PRE_RENDER_DISPLAY,
  UPDATE_DISPLAY_HIERARCHY,
  SELECT_DISPLAY,
  UPDATE_CONTROL_TAG_DISPLAYS,
  UPDATE_CONTROL_TAG_SEARCH,
  UPDATE_DISPLAY_SEARCH
} from "./types";

const displaySearchInitialState: IDisplaySearchState = {
  displayName: ""
};

const controlTagSearchInitialState: IControlTagSearchState = {
  controlTag: ""
};

const controlTagDisplayInitialState: IControlTagDisplaysState = {
  controlTagDisplays: {}
};

const selectedDisplayInitialState: ISelectedDisplayState = {
  selectedDisplay: ""
};

const allDisplaysInitialState: IAllDisplaysState = {
  allDisplays: []
};

const detailsInitialState: IDisplayDetailsState = {
  displayDetails: {}
};

const preRenderParametersInitialState: IDisplayPreRenderParametersState = {
  displayPreRenderParameters: []
};

const preRenderDisplayInitialState: IDisplayPreRenderDisplayState = {
  displayPreRenderDisplay: {}
};

const hierarchyInitialState: IDisplayHierarchyState = {
  displayHierarchy: []
};

const referenceDataInitialState: IDisplayReferenceDataState = {
  displayReferenceData: {}
};

export function displaySearchReducer(
  state = displaySearchInitialState,
  action: DisplayActionTypes
): IDisplaySearchState {
  switch (action.type) {
    case UPDATE_DISPLAY_SEARCH:
      return { displayName: action.payload.displayName };
    default:
      return state;
  }
}

export function controlTagSearchReducer(
  state = controlTagSearchInitialState,
  action: DisplayActionTypes
): IControlTagSearchState {
  switch (action.type) {
    case UPDATE_CONTROL_TAG_SEARCH:
      return { controlTag: action.payload.controlTag };
    default:
      return state;
  }
}

export function controlTagDisplaysReducer(
  state = controlTagDisplayInitialState,
  action: DisplayActionTypes
): IControlTagDisplaysState {
  switch (action.type) {
    case UPDATE_CONTROL_TAG_DISPLAYS:
      return { controlTagDisplays: action.payload.controlTagDisplays };
    default:
      return state;
  }
}

export function selectedDisplayReducer(
  state = selectedDisplayInitialState,
  action: DisplayActionTypes
): ISelectedDisplayState {
  switch (action.type) {
    case SELECT_DISPLAY:
      return { selectedDisplay: action.payload.selectedDisplay };
    default:
      return state;
  }
}

export function allDisplaysReducer(
  state = allDisplaysInitialState,
  action: DisplayActionTypes
): IAllDisplaysState {
  switch (action.type) {
    case UPDATE_ALL_DISPLAYS:
      return { allDisplays: action.payload.allDisplays };
    default:
      return state;
  }
}

export function detailsReducer(
  state = detailsInitialState,
  action: DisplayActionTypes
): IDisplayDetailsState {
  switch (action.type) {
    case UPDATE_DISPLAY_DETAILS:
      return { displayDetails: action.payload.displayDetails };
    default:
      return state;
  }
}

export function preRenderParametersReducer(
  state = preRenderParametersInitialState,
  action: DisplayActionTypes
): IDisplayPreRenderParametersState {
  switch (action.type) {
    case UPDATE_DISPLAY_PRE_RENDER_PARAMETERS:
      return {
        displayPreRenderParameters: action.payload.displayPreRenderParameters
      };
    default:
      return state;
  }
}

export function preRenderDisplayReducer(
  state = preRenderDisplayInitialState,
  action: DisplayActionTypes
): IDisplayPreRenderDisplayState {
  switch (action.type) {
    case UPDATE_DISPLAY_PRE_RENDER_DISPLAY:
      return {
        displayPreRenderDisplay: action.payload.displayPreRenderDisplay
      };
    default:
      return state;
  }
}

export function referenceDataReducer(
  state = referenceDataInitialState,
  action: DisplayActionTypes
): IDisplayReferenceDataState {
  switch (action.type) {
    case UPDATE_DISPLAY_REFERENCE_DATA:
      return {
        displayReferenceData: action.payload.displayReferenceData
      };
    default:
      return state;
  }
}

export function hierarchyReducer(
  state = hierarchyInitialState,
  action: DisplayActionTypes
): IDisplayHierarchyState {
  switch (action.type) {
    case UPDATE_DISPLAY_HIERARCHY:
      return {
        displayHierarchy: action.payload.displayHierarchy
      };
    default:
      return state;
  }
}
