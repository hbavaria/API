import {
  UPDATE_PERFORMANCE_TESTER_TABLE_ITEM,
  PerformanceTesterActions,
  CREATE_PERFORMANCE_TESTER_TABLE_ITEM,
  UPDATE_TABLE_ITEM_IS_SELECTED,
  IDisplayTestItem,
  DELETE_PERFORMANCE_TESTER_TABLE_ITEM,
  UPDATE_TABLE_ITEM_PARAMETERS,
  UPDATE_TABLE_ITEM_JSON_SIZE,
  UPDATE_TABLE_ITEM_GET_JSON_ELAPSED,
  UPDATE_TABLE_ITEM_PARSE_JSON_ELAPSED,
  UPDATE_TABLE_ITEM_ANIMATION_SCRIPT_SIZE,
  UPDATE_TABLE_ITEM_EVENT_SCRIPT_SIZE,
  UPDATE_IS_PERFORMANCE_TEST_RUNNING,
  UPDATE_OUTPUT_MESSAGE,
  DELETE_OUTPUT_MESSAGES,
  UPDATE_TABLE_ITEM_IS_TESTING,
  ADD_TABLE_ITEM,
  UPDATE_TABLE_ITEM_SUBSCRIBE_ELAPSED,
  UPDATE_NUM_ITERATIONS,
  UPDATE_ITERATION_DELAY,
  UPDATE_TEST_DELAY,
  UPDATE_PARAM_ERRORS,
  UPDATE_HAS_PARAM_ERROR,
  UPDATE_HAS_DISPLAY_NAME_ERROR,
  UPDATE_LOW_SUBSCRIBE_ELAPSED,
  UPDATE_HIGH_SUBSCRIBE_ELAPSED,
  IIterationResult,
  UPDATE_ITERATION_RESULT,
  IParamError,
  DELETE_PARAM_ERRORS,
  ITestResult,
  UPDATE_TEST_RESULT
} from "./types";
import ParameterDefinitionDto from "../../utils/web-sockets/interfaces/iParameterDefinitionDto";

export function updatePerformanceTesterTableItem(
  tableItem: IDisplayTestItem,
  index: number
): PerformanceTesterActions {
  return {
    type: UPDATE_PERFORMANCE_TESTER_TABLE_ITEM,
    payload: { tableItem, index }
  };
}

export function createPerformanceTesterTableItem(
  tableItem: IDisplayTestItem
): PerformanceTesterActions {
  return {
    type: CREATE_PERFORMANCE_TESTER_TABLE_ITEM,
    payload: { tableItem }
  };
}

export function updatePerformanceTesterTableItemIsSelected(
  isSelected: boolean,
  index: number
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_IS_SELECTED,
    payload: { isSelected, index }
  };
}

export function deletePerformanceTesterTableItem(
  itemId: string
): PerformanceTesterActions {
  return {
    type: DELETE_PERFORMANCE_TESTER_TABLE_ITEM,
    payload: { itemId }
  };
}

export function updateParameterDtos(
  itemId: string,
  parameterDtos: ParameterDefinitionDto[]
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_PARAMETERS,
    payload: { itemId, parameterDtos }
  };
}

export function updateJsonSize(
  itemId: string,
  jsonSize: string
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_JSON_SIZE,
    payload: { itemId, jsonSize }
  };
}

export function updateGetJsonElapsed(
  itemId: string,
  getJsonElapsed: number
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_GET_JSON_ELAPSED,
    payload: { itemId, getJsonElapsed }
  };
}

export function updateParseJsonElapsed(
  itemId: string,
  parseJsonElapsed: number
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_PARSE_JSON_ELAPSED,
    payload: { itemId, parseJsonElapsed }
  };
}

export function updateAnimationScriptSize(
  itemId: string,
  animationScriptSize: string
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_ANIMATION_SCRIPT_SIZE,
    payload: { itemId, animationScriptSize }
  };
}

export function updateEventScriptSize(
  itemId: string,
  eventScriptSize: string
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_EVENT_SCRIPT_SIZE,
    payload: { itemId, eventScriptSize }
  };
}

export function updateIsPerformanceTestRunning(
  isPerformanceTestRunning: boolean
): PerformanceTesterActions {
  return {
    type: UPDATE_IS_PERFORMANCE_TEST_RUNNING,
    payload: { isPerformanceTestRunning }
  };
}

export function updateOutput(outputMessage: string): PerformanceTesterActions {
  return {
    type: UPDATE_OUTPUT_MESSAGE,
    payload: { outputMessage }
  };
}

export function deleteOutputMessages(): PerformanceTesterActions {
  return {
    type: DELETE_OUTPUT_MESSAGES,
    payload: {}
  };
}
export function updateTableItemIsTesting(
  itemId: string,
  isItemTesting: boolean
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_IS_TESTING,
    payload: { itemId, isItemTesting }
  };
}

export function addTableItem(
  tableItem: IDisplayTestItem
): PerformanceTesterActions {
  return {
    type: ADD_TABLE_ITEM,
    payload: { tableItem }
  };
}

export function updateSubscribeElapsed(
  itemId: string,
  subscribeElapsed: number
): PerformanceTesterActions {
  return {
    type: UPDATE_TABLE_ITEM_SUBSCRIBE_ELAPSED,
    payload: { itemId, subscribeElapsed }
  };
}

export function updateNumIterations(
  numIterations: number
): PerformanceTesterActions {
  return {
    type: UPDATE_NUM_ITERATIONS,
    payload: { numIterations }
  };
}

export function updateIterationDelay(
  iterationDelay: number
): PerformanceTesterActions {
  return {
    type: UPDATE_ITERATION_DELAY,
    payload: { iterationDelay }
  };
}

export function updateTestDelay(testDelay: number): PerformanceTesterActions {
  return {
    type: UPDATE_TEST_DELAY,
    payload: { testDelay }
  };
}

export function updateParamErrors(
  paramErrors: IParamError[]
): PerformanceTesterActions {
  return {
    type: UPDATE_PARAM_ERRORS,
    payload: { paramErrors }
  };
}

export function deleteParamErrors(): PerformanceTesterActions {
  return {
    type: DELETE_PARAM_ERRORS,
    payload: {}
  };
}

export function updateHasParamError(
  itemId: string,
  hasParamError: boolean
): PerformanceTesterActions {
  return {
    type: UPDATE_HAS_PARAM_ERROR,
    payload: { itemId, hasParamError }
  };
}

export function updateHasDisplayNameError(
  itemId: string,
  hasDisplayNameError: boolean
): PerformanceTesterActions {
  return {
    type: UPDATE_HAS_DISPLAY_NAME_ERROR,
    payload: { itemId, hasDisplayNameError }
  };
}

export function updateLowSubscribeElapsed(
  itemId: string,
  lowSubscribeElapsed: number
): PerformanceTesterActions {
  return {
    type: UPDATE_LOW_SUBSCRIBE_ELAPSED,
    payload: { itemId, lowSubscribeElapsed }
  };
}

export function updateHighSubscribeElapsed(
  itemId: string,
  highSubscribeElapsed: number
): PerformanceTesterActions {
  return {
    type: UPDATE_HIGH_SUBSCRIBE_ELAPSED,
    payload: { itemId, highSubscribeElapsed }
  };
}

export function updateIterationResult(
  iterationResult: IIterationResult
): PerformanceTesterActions {
  return {
    type: UPDATE_ITERATION_RESULT,
    payload: { result: iterationResult }
  };
}

export function updateTestResult(
  result: ITestResult
): PerformanceTesterActions {
  return {
    type: UPDATE_TEST_RESULT,
    payload: { result }
  };
}
