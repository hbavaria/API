export const UPDATE_SESSION_ID = "UPDATE_SESSION_ID";

export interface ISessionIdState {
  sessionId: string;
}

export interface IUpdateSessionIdAction {
  type: typeof UPDATE_SESSION_ID;
  payload: { sessionId: string };
}

export type SessionIdActionTypes = IUpdateSessionIdAction;
