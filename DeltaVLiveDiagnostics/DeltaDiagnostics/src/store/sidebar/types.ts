export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

export interface ISidebarState {
  sidebarIsShowing: boolean;
}

export interface IToggleSidebarAction {
  type: typeof TOGGLE_SIDEBAR;
  payload: { sidebarIsShowing: boolean };
}

export type SidebarActionTypes = IToggleSidebarAction;
