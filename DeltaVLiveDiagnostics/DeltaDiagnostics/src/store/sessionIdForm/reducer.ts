import {
  ISessionIdState,
  SessionIdActionTypes,
  UPDATE_SESSION_ID
} from "./types";

const initialState: ISessionIdState = {
  sessionId: ""
};

export function sessionIdReducer(
  state = initialState,
  action: SessionIdActionTypes
): ISessionIdState {
  switch (action.type) {
    case UPDATE_SESSION_ID:
      return { sessionId: action.payload.sessionId };
    default:
      return state;
  }
}
