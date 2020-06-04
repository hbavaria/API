import ParameterDefinitionDto from "../../utils/web-sockets/interfaces/iParameterDefinitionDto";
export const UPDATE_PERFORMANCE_TESTER_TABLE_ITEM =
  "UPDATE_PERFORMANCE_TESTER_TABLE_ITEM";
export const CREATE_PERFORMANCE_TESTER_TABLE_ITEM =
  "CREATE_PERFORMANCE_TESTER_TABLE_ITEM";
export const UPDATE_TABLE_ITEM_IS_SELECTED = "UPDATE_TABLE_ITEM_IS_SELECTED";
export const DELETE_PERFORMANCE_TESTER_TABLE_ITEM =
  "DELETE_PERFORMANCE_TESTER_TABLE_ITEM";
export const UPDATE_TABLE_ITEM_PARAMETERS = "UPDATE_TABLE_ITEM_PARAMETERS";
export const UPDATE_TABLE_ITEM_JSON_SIZE = "UPDATE_TABLE_ITEM_JSON_SIZE";
export const UPDATE_TABLE_ITEM_GET_JSON_ELAPSED =
  "UPDATE_TABLE_ITEM_GET_JSON_ELAPSED";
export const UPDATE_TABLE_ITEM_PARSE_JSON_ELAPSED =
  "UPDATE_TABLE_ITEM_PARSE_JSON_ELAPSED";
export const UPDATE_TABLE_ITEM_ANIMATION_SCRIPT_SIZE =
  "UPDATE_TABLE_ITEM_ANIMATION_SCRIPT_SIZE";
export const UPDATE_TABLE_ITEM_EVENT_SCRIPT_SIZE =
  "UPDATE_TABLE_ITEM_EVENT_SCRIPT_SIZE";
export const UPDATE_IS_PERFORMANCE_TEST_RUNNING =
  "UPDATE_IS_PERFORMANCE_TEST_RUNNING";
export const UPDATE_OUTPUT_MESSAGE = "UPDATE_OUTPUT_MESSAGE";
export const DELETE_OUTPUT_MESSAGES = "DELETE_OUTPUT_MESSAGES";
export const UPDATE_TABLE_ITEM_IS_TESTING = "UPDATE_TABLE_ITEM_IS_TESTING";
export const ADD_TABLE_ITEM = "ADD_TABLE_ITEM";
export const UPDATE_TABLE_ITEM_SUBSCRIBE_ELAPSED =
  "UPDATE_TABLE_ITEM_SUBSCRIBE_ELAPSED";
export const UPDATE_NUM_ITERATIONS = "UPDATE_NUM_ITERATIONS";
export const UPDATE_ITERATION_DELAY = "UPDATE_ITERATION_DELAY";
export const UPDATE_TEST_DELAY = "UPDATE_TEST_DELAY";
export const UPDATE_PARAM_ERRORS = "UPDATE_PARAM_ERRORS";
export const DELETE_PARAM_ERRORS = "DELETE_PARAM_ERRORS";
export const UPDATE_HAS_PARAM_ERROR = "UPDATE_HAS_PARAM_ERROR";
export const UPDATE_HAS_DISPLAY_NAME_ERROR = "UPDATE_HAS_DISPLAY_NAME_ERROR";
export const UPDATE_LOW_SUBSCRIBE_ELAPSED = "UPDATE_LOW_SUBSCRIBE_ELAPSED";
export const UPDATE_HIGH_SUBSCRIBE_ELAPSED = "UPDATE_HIGH_SUBSCRIBE_ELAPSED";
export const UPDATE_ITERATION_RESULT = "UPDATE_ITERATION_RESULT";
export const UPDATE_TEST_RESULT = "UPDATE_TEST_RESULT";

export interface IDisplayTestItem {
  itemId: string;
  displayName: string;
  isSelected: boolean;
  isItemTesting?: boolean;
  hasParamError?: boolean;
  hasDisplayNameError?: boolean;
  jsonSize?: string;
  getJsonElapsed?: number;
  parseJsonElapsed?: number;
  animationScriptSize?: string;
  eventScriptSize?: string;
  subscribeElapsed?: number;
  lowSubscribeElapsed?: number;
  highSubscribeElapsed?: number;
  parameterDtos: ParameterDefinitionDto[];
}

export interface IIterationResult {
  testId: string;
  subscribeElapsed: number;
  getJsonElapsed: number;
  parseJsonElapsed: number;
  animationScriptSize: string;
  eventScriptSize: string;
  iterationNumber: number;
  paramErrors: IParamError[];
  displayErrors: Array<IDisplayError>;
}

export interface ITestResult {
  testId: string;
  avgSubscribeElapsed: number;
  avgGetJsonElapsed: number;
  avgParseJsonElapsed: number;
  lowSubscribeElapsed: number;
  highSubscribeElapsed: number;
}

export interface IParamError {
  testId?: string;
  paramPath: String;
  timestamp: Number;
  errorMessage: String;
  status: Number;
  paramType: String;
  subStatus: Number;
  iterationNumber?: number;
}

export interface IDisplayError {
  displayName: String;
  errorMessage: String;
  errorCode: Number;
}

export interface IPerformanceTesterState {
  performanceTableItems: IDisplayTestItem[];
  isPerformanceTestRunning: boolean;
  output: string[];
  paramErrors: IParamError[];
  numIterations: number;
  iterationDelay: number;
  testDelay: number;
}

interface IUpdateTableItemAction {
  type: typeof UPDATE_PERFORMANCE_TESTER_TABLE_ITEM;
  payload: { tableItem: IDisplayTestItem; index: number };
}

interface ICreateTableItemAction {
  type: typeof CREATE_PERFORMANCE_TESTER_TABLE_ITEM;
  payload: { tableItem: IDisplayTestItem };
}

interface IUpdateTableItemIsSelected {
  type: typeof UPDATE_TABLE_ITEM_IS_SELECTED;
  payload: { isSelected: boolean; index: number };
}

interface IDeleteTableItemAction {
  type: typeof DELETE_PERFORMANCE_TESTER_TABLE_ITEM;
  payload: { itemId: string };
}

interface IUpdateTableItemParameterDtos {
  type: typeof UPDATE_TABLE_ITEM_PARAMETERS;
  payload: { itemId: string; parameterDtos: ParameterDefinitionDto[] };
}

interface IUpdateTableItemJsonSize {
  type: typeof UPDATE_TABLE_ITEM_JSON_SIZE;
  payload: { itemId: string; jsonSize: string };
}

interface IUpdateTableItemGetJsonElapsed {
  type: typeof UPDATE_TABLE_ITEM_GET_JSON_ELAPSED;
  payload: { itemId: string; getJsonElapsed: number };
}

interface IUpdateTableItemParseJsonElapsed {
  type: typeof UPDATE_TABLE_ITEM_PARSE_JSON_ELAPSED;
  payload: { itemId: string; parseJsonElapsed: number };
}

interface IUpdateTableItemAnimationScriptSize {
  type: typeof UPDATE_TABLE_ITEM_ANIMATION_SCRIPT_SIZE;
  payload: { itemId: string; animationScriptSize: string };
}

interface IUpdateTableItemEventScriptSize {
  type: typeof UPDATE_TABLE_ITEM_EVENT_SCRIPT_SIZE;
  payload: { itemId: string; eventScriptSize: string };
}

interface IUpdateIsPerformanceTestRunning {
  type: typeof UPDATE_IS_PERFORMANCE_TEST_RUNNING;
  payload: { isPerformanceTestRunning: boolean };
}

interface IUpdateOutputMessage {
  type: typeof UPDATE_OUTPUT_MESSAGE;
  payload: { outputMessage: string };
}

interface IDeleteOutputMessages {
  type: typeof DELETE_OUTPUT_MESSAGES;
  payload: {};
}

interface IUpdateTableItemIsTesting {
  type: typeof UPDATE_TABLE_ITEM_IS_TESTING;
  payload: { itemId: string; isItemTesting: boolean };
}

interface IAddTableItem {
  type: typeof ADD_TABLE_ITEM;
  payload: { tableItem: IDisplayTestItem };
}

interface IUpdateTableItemSubscribeElapsed {
  type: typeof UPDATE_TABLE_ITEM_SUBSCRIBE_ELAPSED;
  payload: { itemId: string; subscribeElapsed: number };
}

interface IUpdateNumIterations {
  type: typeof UPDATE_NUM_ITERATIONS;
  payload: { numIterations: number };
}

interface IUpdateIterationDelay {
  type: typeof UPDATE_ITERATION_DELAY;
  payload: { iterationDelay: number };
}

interface IUpdateTestDelay {
  type: typeof UPDATE_TEST_DELAY;
  payload: { testDelay: number };
}

interface IUpdateParamErrors {
  type: typeof UPDATE_PARAM_ERRORS;
  payload: { paramErrors: IParamError[] };
}

interface IDeleteParamErrors {
  type: typeof DELETE_PARAM_ERRORS;
  payload: {};
}

interface IUpdateHasParamError {
  type: typeof UPDATE_HAS_PARAM_ERROR;
  payload: { itemId: string; hasParamError: boolean };
}

interface IUpdateHasDisplayNameError {
  type: typeof UPDATE_HAS_DISPLAY_NAME_ERROR;
  payload: { itemId: string; hasDisplayNameError: boolean };
}

interface IUpdateLowSubscribeElapsed {
  type: typeof UPDATE_LOW_SUBSCRIBE_ELAPSED;
  payload: { itemId: string; lowSubscribeElapsed: number };
}

interface IUpdateHighSubscribeElapsed {
  type: typeof UPDATE_HIGH_SUBSCRIBE_ELAPSED;
  payload: { itemId: string; highSubscribeElapsed: number };
}

interface IUpdateIterationResult {
  type: typeof UPDATE_ITERATION_RESULT;
  payload: { result: IIterationResult };
}

interface IUpdateTestResult {
  type: typeof UPDATE_TEST_RESULT;
  payload: { result: ITestResult };
}

export type PerformanceTesterActions =
  | IUpdateTableItemAction
  | ICreateTableItemAction
  | IUpdateTableItemIsSelected
  | IDeleteTableItemAction
  | IUpdateTableItemParameterDtos
  | IUpdateTableItemJsonSize
  | IUpdateTableItemGetJsonElapsed
  | IUpdateTableItemParseJsonElapsed
  | IUpdateTableItemAnimationScriptSize
  | IUpdateTableItemEventScriptSize
  | IUpdateIsPerformanceTestRunning
  | IUpdateOutputMessage
  | IDeleteOutputMessages
  | IUpdateTableItemIsTesting
  | IAddTableItem
  | IUpdateTableItemSubscribeElapsed
  | IUpdateNumIterations
  | IUpdateIterationDelay
  | IUpdateTestDelay
  | IUpdateParamErrors
  | IDeleteParamErrors
  | IUpdateHasParamError
  | IUpdateHasDisplayNameError
  | IUpdateLowSubscribeElapsed
  | IUpdateHighSubscribeElapsed
  | IUpdateIterationResult
  | IUpdateTestResult;
