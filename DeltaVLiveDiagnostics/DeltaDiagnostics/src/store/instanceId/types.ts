export const SELECT_INSTANCE_ID = "SELECT_INSTANCE_ID";

export interface IInstanceIdState {
  instanceId: string;
}

export interface ISelectInstanceIdAction {
  type: typeof SELECT_INSTANCE_ID;
  payload: IInstanceIdState;
}

export type InstanceIdActionTypes = ISelectInstanceIdAction;
