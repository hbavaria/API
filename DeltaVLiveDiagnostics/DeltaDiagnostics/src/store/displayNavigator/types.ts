export const UPDATE_ALL_DISPLAYS = "UPDATE_ALL_DISPLAYS";

export interface DisplayNavigatorState {
  allDisplays: Display[];
}

export interface Display {
  name: string;
  id: string;
}

// export interface AllDisplays {
//   allDisplays: string[];
// }

export interface UpdateAllDisplaysAction {
  type: typeof UPDATE_ALL_DISPLAYS;
  payload: Display[];
}

export type DisplayNavigatorActionTypes = UpdateAllDisplaysAction;
