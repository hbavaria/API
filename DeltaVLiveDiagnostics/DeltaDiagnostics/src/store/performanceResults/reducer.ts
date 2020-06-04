import {
  PerformanceResultActions,
  UPDATE_PERFORMANCE_TEST_ID,
  IPerformanceResultState
} from "./types";

const initialState: IPerformanceResultState = {
  performanceTestId: ""
};

export function performanceResultReducer(
  state = initialState,
  action: PerformanceResultActions
): IPerformanceResultState {
  switch (action.type) {
    case UPDATE_PERFORMANCE_TEST_ID: {
      return {
        performanceTestId: action.payload.performanceTestId
      };
    }
    default:
      return state;
  }
}
