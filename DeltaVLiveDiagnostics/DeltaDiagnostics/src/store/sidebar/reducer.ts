import { ISidebarState, SidebarActionTypes, TOGGLE_SIDEBAR } from "./types";

const initialState: ISidebarState = {
  sidebarIsShowing: false
};

export function sidebarReducer(
  state = initialState,
  action: SidebarActionTypes
): ISidebarState {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { sidebarIsShowing: action.payload.sidebarIsShowing };
    default:
      return state;
  }
}
