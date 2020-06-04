import {
  IInstanceIdState,
  InstanceIdActionTypes,
  SELECT_INSTANCE_ID
} from "./types";

const initialState: IInstanceIdState = {
  instanceId: ""
};

export function instanceIdReducer(
  state = initialState,
  action: InstanceIdActionTypes
): IInstanceIdState {
  switch (action.type) {
    case SELECT_INSTANCE_ID:
      return { instanceId: action.payload.instanceId };
    default:
      return state;
  }
}
