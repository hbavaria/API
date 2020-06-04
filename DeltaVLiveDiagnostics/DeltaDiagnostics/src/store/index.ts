import { combineReducers, Reducer } from "redux";
import { IParameterSubscriberState } from "./parameterSubscriber/types";
import { IParameterWriterState } from "./parameterWriter/types";
import { parameterSubscriberReducer } from "./parameterSubscriber/reducers";
import { parameterWriterReducer } from "./parameterWriter/reducers";
import { ISessionIdState } from "./sessionIdForm/types";
import { sessionIdReducer } from "./sessionIdForm/reducer";
import { ISidebarState } from "./sidebar/types";
import { sidebarReducer } from "./sidebar/reducer";
import { IInstanceIdState } from "./instanceId/types";
import { instanceIdReducer } from "./instanceId/reducer";
import {
  ISelectedDisplayState,
  IAllDisplaysState,
  IDisplayDetailsState,
  IDisplayReferenceDataState,
  IDisplayPreRenderParametersState,
  IDisplayHierarchyState,
  IDisplaySearchState,
  IControlTagDisplaysState,
  IControlTagSearchState,
  IDisplayPreRenderDisplayState
} from "./display/types";
import {
  selectedDisplayReducer,
  allDisplaysReducer,
  detailsReducer,
  referenceDataReducer,
  preRenderParametersReducer,
  hierarchyReducer,
  controlTagDisplaysReducer,
  controlTagSearchReducer,
  displaySearchReducer,
  preRenderDisplayReducer
} from "./display/reducer";
import { IApiTesterState } from "./apiTester/types";
import { apiTesterReducer } from "./apiTester/reducer";
import { IResponseTimeState } from "./responseTimes/types";
import { responseTimeReducer } from "./responseTimes/reducer";
import { ISubscriptionUpdatesState } from "./subscriptionUpdates/types";
import { subscriptionUpdateReducer } from "./subscriptionUpdates/reducer";
import { IWriteUpdatesState } from "./writeUpdates/types";
import { writeUpdateReducer } from "./writeUpdates/reducer";
import { IPerformanceTesterState } from "./performanceTester/types";
import { performanceTesterReducer } from "./performanceTester/reducer";
import { IPerformanceResultState } from "./performanceResults/types";
import { performanceResultReducer } from "./performanceResults/reducer";
export interface IApplicationState {
  performanceTester: IPerformanceTesterState;
  writeUpdates: IWriteUpdatesState;
  subscriptionUpdates: ISubscriptionUpdatesState;
  parameterSubscriber: IParameterSubscriberState;
  parameterWriter: IParameterWriterState;
  sessionId: ISessionIdState;
  sidebar: ISidebarState;
  instanceId: IInstanceIdState;
  displayDetails: IDisplayDetailsState;
  displayReferenceData: IDisplayReferenceDataState;
  displayPreRenderParameters: IDisplayPreRenderParametersState;
  displayPreRenderDisplay: IDisplayPreRenderDisplayState;
  displayHierarchy: IDisplayHierarchyState;
  allDisplays: IAllDisplaysState;
  selectedDisplay: ISelectedDisplayState;
  controlTagSearch: IControlTagSearchState;
  controlTagDisplays: IControlTagDisplaysState;
  displaySearch: IDisplaySearchState;
  apiTester: IApiTesterState;
  responseTimes: IResponseTimeState;
  performanceResults: IPerformanceResultState;
}

const rootReducer: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  performanceTester: performanceTesterReducer,
  writeUpdates: writeUpdateReducer,
  subscriptionUpdates: subscriptionUpdateReducer,
  parameterSubscriber: parameterSubscriberReducer,
  parameterWriter: parameterWriterReducer,
  sessionId: sessionIdReducer,
  sidebar: sidebarReducer,
  instanceId: instanceIdReducer,
  displayDetails: detailsReducer,
  displayReferenceData: referenceDataReducer,
  displayPreRenderParameters: preRenderParametersReducer,
  displayPreRenderDisplay: preRenderDisplayReducer,
  displayHierarchy: hierarchyReducer,
  allDisplays: allDisplaysReducer,
  selectedDisplay: selectedDisplayReducer,
  controlTagSearch: controlTagSearchReducer,
  controlTagDisplays: controlTagDisplaysReducer,
  displaySearch: displaySearchReducer,
  apiTester: apiTesterReducer,
  responseTimes: responseTimeReducer,
  performanceResults: performanceResultReducer
});

export default rootReducer;
