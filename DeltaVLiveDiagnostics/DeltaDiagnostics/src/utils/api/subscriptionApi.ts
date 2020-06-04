import { WebSocketHandler } from "../web-sockets/webSocketHandler";
import { ParameterDefinitionDto } from "../web-sockets/interfaces/iParameterDefinitionDto";
import {
  WebSocketProcess,
  IWebSocketProcess,
  ISubscriptionDataChangedEventArgs,
  IWriteCompleteEventArgs,
  ESigType
} from "../web-sockets/webSocketProcess";
import { logError } from "./apiUtils";
import { Observable } from "rxjs";
import { IParameter } from "../../store/parameter/types";
import IESigData from "../web-sockets/interfaces/iEsigData";

/**
 * SubscriptionApi
 * Helper functions for subscribing and writing to parameters
 */

/** 
Gets a new webSocketProcess
*/
export function getWebSocketProcess() {
  let webSocketProcess: IWebSocketProcess;
  try {
    let webSocketHandler = new WebSocketHandler();
    webSocketProcess = new WebSocketProcess(webSocketHandler);
  } catch (error) {
    logError(
      error,
      "Error encountered while attempting to create webSocketProcess"
    );
  }

  return webSocketProcess;
}

export async function closeSocketConnectionAsync(
  webSocketProcess: IWebSocketProcess
) {
  try {
    await webSocketProcess.closeSocketConnectionAsync();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Subscribes to an array of parameters
 * @param webSocketProcess the process through which to send the parameters
 * @param subscriptionParameters the parameters you want to subscribe to
 */
export function subscribe(
  webSocketProcess: IWebSocketProcess,
  subscriptionParameters: ParameterDefinitionDto[]
) {
  try {
    if (subscriptionParameters.length !== 0) {
      webSocketProcess.subscribe(subscriptionParameters);
    } else {
      alert(
        "Cannot subscribe to an array of empty parameters. Please make sure you have a parameter selected."
      );
      throw console.error("Cannot subscribe to empty parameters");
    }
  } catch (error) {
    logError(error, "Error encountered while attempting to subscribe");
  }
}
/**
 * Unsubscribe to an array of parameters
 * @param webSocketProcess the process through which to send the request
 * @param subscriptionParameters the parameters you want to unsubscribe to
 */
export function unsubscribe(
  webSocketProcess: IWebSocketProcess,
  subscriptionParameters: ParameterDefinitionDto[]
) {
  try {
    webSocketProcess.unsubscribe(subscriptionParameters);
  } catch (error) {
    logError(error, "Error encountered while attempting to unsubscribe");
  }
}

/**
 * Writes a value to a parameter
 * @param webSocketProcess the process through which you want to send the write request through
 * @param parameter the parameter you want to write to
 * @param valueToWrite the value you want to write
 */
export async function writeValueAsync(
  webSocketProcess: IWebSocketProcess,
  parameter: ParameterDefinitionDto,
  valueToWrite: any
) {
  try {
    console.log(parameter);
    console.log(valueToWrite);
    if (isValidWriteRequest(parameter, valueToWrite)) {
      await webSocketProcess.write(parameter, valueToWrite);
    } else {
      alert("Invalid write request, please double check input.");
      throw Error("Invalid write request, please double check input.");
    }
  } catch (error) {
    logError(error, "Error encountered while attempting to write");
  }
}

function isValidWriteRequest(
  parameter: ParameterDefinitionDto,
  valueToWrite: string
) {
  let isValidWriteRequest = false;
  if (
    valueToWrite !== undefined &&
    parameter.path !== "" &&
    parameter.source !== ""
  ) {
    isValidWriteRequest = true;
  }
  return isValidWriteRequest;
}

/**
 * Gets the observable stream of subscription updates
 * We use observables because the subscription data is an asynchronous data stream
 * For more info see https://rxjs-dev.firebaseapp.com/guide/observable
 * Note: OeWeb sends subscription updates once every second.
 * This means that if multiple writes are performed in one second, you will only see the updated value after that second has elapsed.
 * @param webSocketProcess the web socket process that you want to observe
 */
export function getSubscriptionUpdatesObservable(
  webSocketProcess: IWebSocketProcess
): Observable<ISubscriptionDataChangedEventArgs> {
  let subscriptionObservable;
  try {
    subscriptionObservable = webSocketProcess.getSubscriptionDataObservable();
  } catch (error) {
    logError(error, "Error encountered while observing subscription data");
  }
  return subscriptionObservable;
}
/**
 * Gets the observable stream of asynchronous write requests
 * @param webSocketProcess
 */
export function getWriteCompleteObservable(
  webSocketProcess: IWebSocketProcess
): Observable<IWriteCompleteEventArgs> {
  let writeObservable;
  try {
    writeObservable = webSocketProcess.getWriteCompleteObservable();
  } catch (error) {
    logError(error, "Error encountered while observing write data");
  }
  return writeObservable;
}

/**
 * Given an array of parameters, returns an array containing only the parameters where selected is true.
 * @param parameters
 */
export function getSelectedParameters(parameters: IParameter[]): IParameter[] {
  let selectedParameters = [];
  for (var i = 0; i < parameters.length; i++) {
    let parameter = parameters[i];
    if (parameter.selected) {
      selectedParameters.push(parameter);
    }
  }
  return selectedParameters;
}

export function getSelectedParameterPaths(parameters: IParameter[]): string[] {
  let selectedParameterPaths = [];
  for (var i = 0; i < parameters.length; i++) {
    if (parameters[i].selected) {
      selectedParameterPaths.push(parameters[i].path);
    }
  }
  return selectedParameterPaths;
}

/**
 * Given an array of parameters, returns an array of IParameterDefinitionDtos to be sent to the server
 */
export function getParameterDefinitionDtos(
  parameters: IParameter[]
): ParameterDefinitionDto[] {
  let parameterDtos = [];
  for (var i = 0; i < parameters.length; i++) {
    let paramDto = { path: parameters[i].path };
    parameterDtos.push(paramDto);
  }
  return parameterDtos;
}

/**
 * Given an array of parameterPaths, return the parameterDefinitionDtos to be sent to oeweb
 * @param parameterPaths
 */
export function getParameterDefinitionDtosFromString(
  parameterPaths: string[]
): ParameterDefinitionDto[] {
  let parameterDtos = [];
  for (var i = 0; i < parameterPaths.length; i++) {
    let parameterPath = parameterPaths[i];
    let paramDto = { path: parameterPath };
    parameterDtos.push(paramDto);
  }
  return parameterDtos;
}
/**
 * Given an array of parameterDtos, return the full paths
 * @param parameterDtos
 */
export function getFullParameterPathsFromDtos(
  parameterDtos: ParameterDefinitionDto[]
): string[] {
  let fullParameterPaths = [];
  for (var i = 0; i < parameterDtos.length; i++) {
    let paramDto = parameterDtos[i];
    let fullParameterPath = paramDto.path;
    fullParameterPaths.push(fullParameterPath);
  }
  return fullParameterPaths;
}

/**
 * Gets esig requirements for a parameter
 * @param parameterPath
 * @param webSocketProcess
 */
export async function getEsigRequirementsAsync(
  parameterPath: string,
  webSocketProcess: IWebSocketProcess
): Promise<ESigType> {
  let eSigRequirements;
  try {
    eSigRequirements = await webSocketProcess.getEsigRequirementsAsync(
      parameterPath
    );
  } catch (error) {
    logError(error, "Error encountered while getting e sig requirements");
  }
  return eSigRequirements;
}

/**
 * Write to a parameter with esig configured
 * @param parameterPath
 * @param value
 * @param eSigData
 * @param webSocketProcess
 */
export async function writeEsigAsync(
  parameterPath: string,
  value: any,
  eSigData: IESigData,
  webSocketProcess: IWebSocketProcess
) {
  try {
    await webSocketProcess.writeEsigAsync(parameterPath, value, eSigData);
  } catch (error) {
    logError(error, "Error encountered while writing to parameter with esig");
  }
}
