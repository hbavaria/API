import { PerformanceResultActions, UPDATE_PERFORMANCE_TEST_ID } from "./types";

export function updatePerformanceTestId(
  performanceTestId: string
): PerformanceResultActions {
  return {
    type: UPDATE_PERFORMANCE_TEST_ID,
    payload: { performanceTestId: performanceTestId }
  };
}
