export const UPDATE_PERFORMANCE_TEST_ID = "UPDATE_PERFORMANCE_TEST_ID";

interface IUpdatePerformanceTestId {
  type: typeof UPDATE_PERFORMANCE_TEST_ID;
  payload: { performanceTestId: string };
}

export interface IPerformanceResultState {
  performanceTestId: string;
}

export type PerformanceResultActions = IUpdatePerformanceTestId;
