import {
  Display,
  DisplayNavigatorActionTypes,
  UPDATE_ALL_DISPLAYS
} from "./types";

export function updateAllDisplays(
  allDisplays: Display[]
): DisplayNavigatorActionTypes {
  return {
    type: UPDATE_ALL_DISPLAYS,
    payload: allDisplays
  };
}
