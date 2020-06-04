import {
  UPDATE_PERFORMANCE_TESTER_TABLE_ITEM,
  PerformanceTesterActions,
  IPerformanceTesterState,
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
  UPDATE_ITERATION_RESULT,
  DELETE_PARAM_ERRORS,
  UPDATE_TEST_RESULT
} from "./types";

const initialState: IPerformanceTesterState = {
  performanceTableItems: [],
  isPerformanceTestRunning: false,
  output: [],
  paramErrors: [],
  numIterations: 1,
  iterationDelay: 0,
  testDelay: 0
};

export function performanceTesterReducer(
  state = initialState,
  action: PerformanceTesterActions
): IPerformanceTesterState {
  switch (action.type) {
    case UPDATE_PERFORMANCE_TESTER_TABLE_ITEM: {
      let { index, tableItem } = action.payload;
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          tableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case CREATE_PERFORMANCE_TESTER_TABLE_ITEM: {
      let { tableItem } = action.payload;
      let updatedTableItem: IDisplayTestItem = {
        ...tableItem,
        isItemTesting: false,
        jsonSize: "0",
        getJsonElapsed: 0,
        parseJsonElapsed: 0,
        animationScriptSize: "0",
        eventScriptSize: "0",
        subscribeElapsed: 0,
        lowSubscribeElapsed: 0,
        highSubscribeElapsed: 0
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems,
          updatedTableItem
        ]
      };
    }
    case UPDATE_TABLE_ITEM_IS_SELECTED: {
      let { isSelected, index } = action.payload;
      let tableItem = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItem,
        isSelected: isSelected
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case DELETE_PERFORMANCE_TESTER_TABLE_ITEM: {
      let { itemId } = action.payload;
      return {
        ...state,
        performanceTableItems: state.performanceTableItems.filter(
          item => itemId !== item.itemId
        )
      };
    }
    case UPDATE_TABLE_ITEM_PARAMETERS: {
      let { itemId, parameterDtos } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        parameterDtos
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_TABLE_ITEM_JSON_SIZE: {
      let { itemId, jsonSize } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        jsonSize
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_TABLE_ITEM_GET_JSON_ELAPSED: {
      let { itemId, getJsonElapsed } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        getJsonElapsed
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_TABLE_ITEM_PARSE_JSON_ELAPSED: {
      let { itemId, parseJsonElapsed } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        parseJsonElapsed
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_TABLE_ITEM_SUBSCRIBE_ELAPSED: {
      let { itemId, subscribeElapsed } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        subscribeElapsed
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_LOW_SUBSCRIBE_ELAPSED: {
      let { itemId, lowSubscribeElapsed } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        lowSubscribeElapsed
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_HIGH_SUBSCRIBE_ELAPSED: {
      let { itemId, highSubscribeElapsed } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        highSubscribeElapsed
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_TABLE_ITEM_ANIMATION_SCRIPT_SIZE: {
      let { itemId, animationScriptSize } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        animationScriptSize
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_TABLE_ITEM_EVENT_SCRIPT_SIZE: {
      let { itemId, eventScriptSize } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        eventScriptSize
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_IS_PERFORMANCE_TEST_RUNNING: {
      let { isPerformanceTestRunning } = action.payload;
      return {
        ...state,
        isPerformanceTestRunning
      };
    }
    case UPDATE_OUTPUT_MESSAGE: {
      let { outputMessage } = action.payload;
      return {
        ...state,
        output: [outputMessage, ...state.output]
      };
    }
    case DELETE_OUTPUT_MESSAGES: {
      return {
        ...state,
        output: []
      };
    }
    case UPDATE_TABLE_ITEM_IS_TESTING: {
      let { itemId, isItemTesting } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        isItemTesting
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_HAS_PARAM_ERROR: {
      let { itemId, hasParamError } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        hasParamError
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_HAS_DISPLAY_NAME_ERROR: {
      let { itemId, hasDisplayNameError } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === itemId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        hasDisplayNameError
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case ADD_TABLE_ITEM: {
      let { tableItem } = action.payload;
      let updatedTableItem = {
        ...tableItem
        // itemId: Guid.newGuid()
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems,
          updatedTableItem
        ]
      };
    }
    case UPDATE_NUM_ITERATIONS: {
      let { numIterations } = action.payload;
      return {
        ...state,
        numIterations: numIterations
      };
    }
    case UPDATE_ITERATION_DELAY: {
      let { iterationDelay } = action.payload;
      return {
        ...state,
        iterationDelay: iterationDelay
      };
    }
    case UPDATE_TEST_DELAY: {
      let { testDelay } = action.payload;
      return {
        ...state,
        testDelay: testDelay
      };
    }
    case UPDATE_PARAM_ERRORS: {
      let { paramErrors } = action.payload;
      return {
        ...state,
        paramErrors: [...paramErrors, ...state.paramErrors]
      };
    }
    case DELETE_PARAM_ERRORS: {
      return {
        ...state,
        paramErrors: []
      };
    }
    case UPDATE_ITERATION_RESULT: {
      let { result } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === result.testId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        getJsonElapsed: result.getJsonElapsed,
        parseJsonElapsed: result.parseJsonElapsed,
        animationScriptSize: result.animationScriptSize,
        eventScriptSize: result.eventScriptSize,
        subscribeElapsed: result.subscribeElapsed
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    case UPDATE_TEST_RESULT: {
      let { result } = action.payload;
      let index = state.performanceTableItems.findIndex(
        item => item.itemId === result.testId
      );
      let tableItemToUpdate = state.performanceTableItems[index];
      let updatedTableItem = {
        ...tableItemToUpdate,
        getJsonElapsed: result.avgGetJsonElapsed,
        parseJsonElapsed: result.avgParseJsonElapsed,
        subscribeElapsed: result.avgSubscribeElapsed,
        lowSubscribeElapsed: result.lowSubscribeElapsed,
        highSubscribeElapsed: result.highSubscribeElapsed
      };
      return {
        ...state,
        performanceTableItems: [
          ...state.performanceTableItems.slice(0, index),
          updatedTableItem,
          ...state.performanceTableItems.slice(index + 1)
        ]
      };
    }
    default:
      return state;
  }
}
