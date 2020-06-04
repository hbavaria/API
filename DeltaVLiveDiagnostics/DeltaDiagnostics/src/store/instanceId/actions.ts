import { InstanceIdActionTypes, SELECT_INSTANCE_ID } from "./types";

export function changeInstanceId(instanceId: string): InstanceIdActionTypes {
  return {
    type: SELECT_INSTANCE_ID,
    payload: { instanceId }
  };
}
