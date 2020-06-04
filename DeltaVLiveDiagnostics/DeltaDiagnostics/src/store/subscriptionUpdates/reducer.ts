import {
  ISubscriptionUpdatesState,
  UPDATE_SUBSCRIPTION_DATA,
  SubscriptionUpdateActions,
  DELETE_ALL_SUBSCRIPTION_DATA,
  ISubscribeTestTracker
} from "./types";
import { ISubscriptionUpdate } from "../../utils/web-sockets/interfaces/iSubscriptionUpdate";
import { IMetaData } from "../../utils/web-sockets/interfaces/iMetaData";

const initialState: ISubscriptionUpdatesState = {
  subscriptionUpdates: {},
  testTracker: {
    endTime: -1,
    startTime: Number.MAX_SAFE_INTEGER,
    paramsLeft: [],
    testIsDone: false
  }
};

export function subscriptionUpdateReducer(
  state: ISubscriptionUpdatesState = initialState,
  action: SubscriptionUpdateActions
): ISubscriptionUpdatesState {
  switch (action.type) {
    case UPDATE_SUBSCRIPTION_DATA:
      let subscriptionUpdateObj: ISubscriptionUpdate =
        action.payload.subscriptionUpdate.subscriptionUpdate;
      let paramPaths: string[] = Object.keys(subscriptionUpdateObj);
      let metaData: IMetaData = action.payload.subscriptionUpdate.metaData;
      let newTestTracker: ISubscribeTestTracker = { ...state.testTracker };

      if (metaData.requestSentTimeStamp === 0) {
        newTestTracker.paramsLeft = [
          ...newTestTracker.paramsLeft,
          ...paramPaths
        ];
      } else {
        if (!state.testTracker.testIsDone) {
          newTestTracker.startTime =
            newTestTracker.startTime < metaData.requestSentTimeStamp
              ? newTestTracker.startTime
              : metaData.requestSentTimeStamp;
          newTestTracker.endTime =
            newTestTracker.endTime > metaData.responseReceivedTimeStamp
              ? newTestTracker.endTime
              : metaData.responseReceivedTimeStamp;
        }

        let lastTimestamp: number;

        for (let index: number = 0; index < paramPaths.length; index++) {
          let paramIndex: number = newTestTracker.paramsLeft.indexOf(
            paramPaths[index]
          );

          lastTimestamp =
            state.subscriptionUpdates[paramPaths[index]].timestamp;

          subscriptionUpdateObj[paramPaths[index]].timestamp =
            lastTimestamp === 0
              ? metaData.responseReceivedTimeStamp
              : lastTimestamp;

          if (paramIndex >= 0) {
            newTestTracker.paramsLeft = [
              ...newTestTracker.paramsLeft.slice(0, paramIndex),
              ...newTestTracker.paramsLeft.slice(paramIndex + 1)
            ];
          }
        }
      }

      newTestTracker.testIsDone = newTestTracker.paramsLeft.length === 0;

      return {
        subscriptionUpdates: {
          ...state.subscriptionUpdates,
          ...subscriptionUpdateObj
        },
        testTracker: newTestTracker
      };
    case DELETE_ALL_SUBSCRIPTION_DATA:
      return {
        subscriptionUpdates: [],
        testTracker: {
          endTime: -1,
          startTime: Number.MAX_SAFE_INTEGER,
          paramsLeft: [],
          testIsDone: false
        }
      };
    default:
      return state;
  }
}
