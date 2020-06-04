export const UPDATE_ALL_DISPLAYS = "UPDATE_ALL_DISPLAYS";
export const UPDATE_DISPLAY_DETAILS = "UPDATE_DISPLAY_DETAILS";
export const UPDATE_DISPLAY_REFERENCE_DATA = "UPDATE_DISPLAY_REFERENCE_DATA";
export const UPDATE_DISPLAY_PRE_RENDER_PARAMETERS =
  "UPDATE_DISPLAY_PRE_RENDER_PARAMETERS";
export const UPDATE_DISPLAY_PRE_RENDER_DISPLAY =
  "UPDATE_DISPLAY_PRE_RENDER_DISPLAY";
export const UPDATE_DISPLAY_HIERARCHY = "UPDATE_DISPLAY_HIERARCHY";
export const SELECT_DISPLAY = "SELECT_DISPLAY";
export const UPDATE_DISPLAY_SEARCH = "UPDATE_DISPLAY_SEARCH";
export const UPDATE_CONTROL_TAG_SEARCH = "UPDATE_CONTROL_TAG_SEARCH";
export const UPDATE_CONTROL_TAG_DISPLAYS = "UPDATE_CONTROL_TAG_DISPLAYS";

export interface IControlTagDisplaysState {
  controlTagDisplays: Object;
}

export interface IControlTagSearchState {
  controlTag: string;
}

export interface IDisplaySearchState {
  displayName: string;
}

export interface ISelectedDisplayState {
  selectedDisplay: string;
}

export interface IAllDisplaysState {
  allDisplays: Array<String>;
}

export interface IDisplayDetailsState {
  displayDetails: Object;
}

export interface IDisplayReferenceDataState {
  displayReferenceData: Object;
}

export interface IDisplayPreRenderParametersState {
  displayPreRenderParameters: Array<any>;
}

export interface IDisplayPreRenderDisplayState {
  displayPreRenderDisplay: Object;
}

export interface IDisplayHierarchyState {
  displayHierarchy: Array<any>;
}

export interface IUpdateDisplaySearchAction {
  type: typeof UPDATE_DISPLAY_SEARCH;
  payload: IDisplaySearchState;
}

export interface IUpdateControlTagSearchAction {
  type: typeof UPDATE_CONTROL_TAG_SEARCH;
  payload: IControlTagSearchState;
}

export interface IUpdateControlTagDisplaysAction {
  type: typeof UPDATE_CONTROL_TAG_DISPLAYS;
  payload: IControlTagDisplaysState;
}

export interface ISelectDisplayAction {
  type: typeof SELECT_DISPLAY;
  payload: ISelectedDisplayState;
}

export interface IUpdateAllDisplaysAction {
  type: typeof UPDATE_ALL_DISPLAYS;
  payload: IAllDisplaysState;
}

export interface IUpdateDisplayDetailsAction {
  type: typeof UPDATE_DISPLAY_DETAILS;
  payload: IDisplayDetailsState;
}

export interface IUpdateDisplayReferenceDataAction {
  type: typeof UPDATE_DISPLAY_REFERENCE_DATA;
  payload: IDisplayReferenceDataState;
}

export interface IUpdatePreRenderParametersAction {
  type: typeof UPDATE_DISPLAY_PRE_RENDER_PARAMETERS;
  payload: IDisplayPreRenderParametersState;
}

export interface IUpdatePreRenderDisplayAction {
  type: typeof UPDATE_DISPLAY_PRE_RENDER_DISPLAY;
  payload: IDisplayPreRenderDisplayState;
}

export interface IUpdateDisplayHierarchyAction {
  type: typeof UPDATE_DISPLAY_HIERARCHY;
  payload: IDisplayHierarchyState;
}

export type DisplayActionTypes =
  | IUpdateDisplayDetailsAction
  | IUpdateDisplayReferenceDataAction
  | IUpdatePreRenderParametersAction
  | IUpdateDisplayHierarchyAction
  | IUpdateAllDisplaysAction
  | ISelectDisplayAction
  | IUpdateDisplaySearchAction
  | IUpdateControlTagDisplaysAction
  | IUpdateControlTagSearchAction
  | IUpdatePreRenderDisplayAction;
