import {
  IWriteUpdatesState,
  ADD_WRITE_DATA,
  UPDATE_WRITE_DATA,
  WriteUpdateActions,
  DELETE_ALL_WRITE_DATA,
  IWriteTestTracker
} from "./types";
import { INewWriteUpdateTableItem } from "../../components/parameterTester/parameterResults/WriteResults";
import { IWriteCompleteEventArgs } from "../../utils/web-sockets/webSocketProcess";

const initialState: IWriteUpdatesState = {
  writeUpdates: [],
  indexOfUpdate: 0,
  testTracker: {
    startTime: Number.MAX_SAFE_INTEGER,
    endTime: -1,
    testIsDone: false
  }
};

export function writeUpdateReducer(
  state: IWriteUpdatesState = initialState,
  action: WriteUpdateActions
): IWriteUpdatesState {
  switch (action.type) {
    case ADD_WRITE_DATA:
      return {
        ...state,
        writeUpdates: [...state.writeUpdates, action.payload.writeData]
      };
    case UPDATE_WRITE_DATA:
      let index: number = state.indexOfUpdate;
      let updatedItem: INewWriteUpdateTableItem = {
        ...state.writeUpdates[index]
      };
      let itemInfo: IWriteCompleteEventArgs = action.payload.writeUpdate;
      updatedItem.message = itemInfo.writeUpdate.message;
      updatedItem.success = itemInfo.writeUpdate.success;
      updatedItem.metaData = `round trip: ${
        itemInfo.metaData.roundTripTime
      } ms`;

      let newTestTracker: IWriteTestTracker = {
        startTime:
          state.testTracker.startTime < itemInfo.metaData.requestSentTimeStamp
            ? state.testTracker.startTime
            : itemInfo.metaData.requestSentTimeStamp,
        endTime:
          state.testTracker.endTime >
          itemInfo.metaData.responseReceivedTimeStamp
            ? state.testTracker.endTime
            : itemInfo.metaData.responseReceivedTimeStamp,
        testIsDone: index >= state.writeUpdates.length - 1
      };

      return {
        ...state,
        writeUpdates: [
          ...state.writeUpdates.slice(0, index),
          updatedItem,
          ...state.writeUpdates.slice(index + 1)
        ],
        indexOfUpdate: index + 1,
        testTracker: newTestTracker
      };
    case DELETE_ALL_WRITE_DATA:
      return {
        writeUpdates: [],
        indexOfUpdate: 0,
        testTracker: {
          startTime: Number.MAX_SAFE_INTEGER,
          endTime: -1,
          testIsDone: false
        }
      };
    default:
      return state;
  }
}
