import { SessionIdActionTypes, UPDATE_SESSION_ID } from "./types";

export function updateSessionId(sessionId: string): SessionIdActionTypes {
  return {
    type: UPDATE_SESSION_ID,
    payload: { sessionId }
  };
}
