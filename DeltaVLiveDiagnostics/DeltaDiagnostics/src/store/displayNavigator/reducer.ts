import {
  DisplayNavigatorState,
  DisplayNavigatorActionTypes,
  UPDATE_ALL_DISPLAYS
} from "./types";

// import { initialState } from "../initialState";

const initialState: DisplayNavigatorState = {
  allDisplays: []
};

export function displayNavigatorReducer(
  state = initialState,
  action: DisplayNavigatorActionTypes
): DisplayNavigatorState {
  switch (action.type) {
    case UPDATE_ALL_DISPLAYS:
      return { allDisplays: action.payload };
    default:
      return state;
  }
}
