import { ISubscriptionDataChangedEventArgs } from "../../utils/web-sockets/webSocketProcess";

export const UPDATE_SUBSCRIPTION_DATA = "UPDATE_SUBSCRIPTION_DATA";
export const DELETE_ALL_SUBSCRIPTION_DATA = "DELETE_ALL_SUBSCRIPTION_DATA";

export interface ISubscribeTestTracker {
  endTime: number;
  startTime: number;
  paramsLeft: string[];
  testIsDone: boolean;
}

export interface ISubscriptionUpdatesState {
  subscriptionUpdates: {};
  testTracker: ISubscribeTestTracker;
}

interface IUpdateSubscriptionDataAction {
  type: typeof UPDATE_SUBSCRIPTION_DATA;
  payload: { subscriptionUpdate: ISubscriptionDataChangedEventArgs };
}

interface IDeleteAllSubscriptionDataAction {
  type: typeof DELETE_ALL_SUBSCRIPTION_DATA;
  payload: {};
}

export type SubscriptionUpdateActions =
  | IUpdateSubscriptionDataAction
  | IDeleteAllSubscriptionDataAction;
