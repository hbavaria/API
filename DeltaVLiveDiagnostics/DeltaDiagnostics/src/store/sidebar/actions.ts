import { SidebarActionTypes, TOGGLE_SIDEBAR } from "./types";

export function toggleSidebar(sidebarIsShowing: boolean): SidebarActionTypes {
  return {
    type: TOGGLE_SIDEBAR,
    payload: { sidebarIsShowing }
  };
}
