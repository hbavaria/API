import {
  UPDATE_SUBSCRIPTION_DATA,
  DELETE_ALL_SUBSCRIPTION_DATA,
  SubscriptionUpdateActions
} from "./types";
import { ISubscriptionDataChangedEventArgs } from "../../utils/web-sockets/webSocketProcess";

export function updateSubscriptionData(
  subscriptionUpdate: ISubscriptionDataChangedEventArgs
): SubscriptionUpdateActions {
  return {
    type: UPDATE_SUBSCRIPTION_DATA,
    payload: { subscriptionUpdate }
  };
}

export function deleteAllSubscriptionData(): SubscriptionUpdateActions {
  return {
    type: DELETE_ALL_SUBSCRIPTION_DATA,
    payload: {}
  };
}
