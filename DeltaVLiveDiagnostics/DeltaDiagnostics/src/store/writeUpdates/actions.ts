import {
  ADD_WRITE_DATA,
  UPDATE_WRITE_DATA,
  DELETE_ALL_WRITE_DATA,
  WriteUpdateActions
} from "./types";
import { IWriteCompleteEventArgs } from "../../utils/web-sockets/webSocketProcess";
import { INewWriteUpdateTableItem } from "../../components/parameterTester/parameterResults/WriteResults";

export function addWriteData(
  writeData: INewWriteUpdateTableItem
): WriteUpdateActions {
  return {
    type: ADD_WRITE_DATA,
    payload: { writeData }
  };
}

export function updateWriteData(
  writeUpdate: IWriteCompleteEventArgs
): WriteUpdateActions {
  return {
    type: UPDATE_WRITE_DATA,
    payload: { writeUpdate }
  };
}

export function deleteAllWriteData(): WriteUpdateActions {
  return {
    type: DELETE_ALL_WRITE_DATA,
    payload: {}
  };
}
