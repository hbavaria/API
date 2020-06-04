import { IWriteCompleteEventArgs } from "../../utils/web-sockets/webSocketProcess";
import { INewWriteUpdateTableItem } from "../../components/parameterTester/parameterResults/WriteResults";

export const UPDATE_WRITE_DATA = "UPDATE_WRITE_DATA";
export const DELETE_ALL_WRITE_DATA = "DELETE_ALL_WRITE_DATA";
export const ADD_WRITE_DATA = "ADD_WRITE_DATA";

export interface IWriteTestTracker {
  endTime: number;
  startTime: number;
  testIsDone: boolean;
}

export interface IWriteUpdatesState {
  writeUpdates: INewWriteUpdateTableItem[];
  indexOfUpdate: number;
  testTracker: IWriteTestTracker;
}

interface IAddWriteDataAction {
  type: typeof ADD_WRITE_DATA;
  payload: { writeData: INewWriteUpdateTableItem };
}

interface IUpdateWriteCompleteAction {
  type: typeof UPDATE_WRITE_DATA;
  payload: { writeUpdate: IWriteCompleteEventArgs };
}

interface IDeleteAllWriteDataAction {
  type: typeof DELETE_ALL_WRITE_DATA;
  payload: {};
}

export type WriteUpdateActions =
  | IAddWriteDataAction
  | IUpdateWriteCompleteAction
  | IDeleteAllWriteDataAction;
