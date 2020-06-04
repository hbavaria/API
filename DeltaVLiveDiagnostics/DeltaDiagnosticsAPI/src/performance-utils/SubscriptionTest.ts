import ParameterDefinitionDto from "./lib/interfaces/iParameterDefinitionDto";
import {
  IWebSocketProcess,
  ISubscriptionDataChangedEventArgs,
  WebSocketProcess
} from "./lib/webSocketProcess";
import { Observable } from "rxjs";
import now from "performance-now";
import { WebSocketHandler } from "./lib/webSocketHandler";
import clone from "clone";

export interface ISubscriptionTest {
  getSubscriptionElapsedAsync(): Promise<number>;
  getParamErrors(): Array<IParamError>;
  closeSocket(): void;
}

export interface IParamError {
  paramPath: String;
  timestamp: Number;
  errorMessage: String;
  status: Number;
  paramType: String;
  subStatus: Number;
}

export class SubscriptionTest implements ISubscriptionTest {
  constructor(
    private parameterDtos: ParameterDefinitionDto[],
    private authCookie: string
  ) {
    this.initWebSocket();
    this._subscriptionObservable = this._webSocketProcess.getSubscriptionDataObservable();
  }
  private _webSocketProcess: IWebSocketProcess;
  private _subscriptionObservable: Observable<
    ISubscriptionDataChangedEventArgs
  >;
  private _paramErrors: IParamError[] = [];

  private initWebSocket() {
    let webSocketHandler = new WebSocketHandler(this.authCookie);
    this._webSocketProcess = new WebSocketProcess(webSocketHandler);
  }
  getParamErrors() {
    return clone(this._paramErrors);
  }

  async getSubscriptionElapsedAsync(): Promise<number> {
    if (this.parameterDtos.length === 0) {
      return 0;
    }
    return new Promise((resolve, reject) => {
      let paramPaths = this.getFullParameterPathsFromDtos(this.parameterDtos);
      let parameterPathsSet = new Set(paramPaths);
      let subscription = this._subscriptionObservable.subscribe(
        async notification => {
          let paramPathsFromUpdate = Object.keys(
            notification.subscriptionUpdate
          );
          for (var i = 0; i < paramPathsFromUpdate.length; i++) {
            if (parameterPathsSet.has(paramPathsFromUpdate[i])) {
              parameterPathsSet.delete(paramPathsFromUpdate[i]);
            }
            let isParamError =
              notification.subscriptionUpdate[paramPathsFromUpdate[i]]
                .status !== 0;
            if (isParamError) {
              let {
                timestamp,
                error,
                status,
                type,
                subStatus
              } = notification.subscriptionUpdate[paramPathsFromUpdate[i]];
              let errorObj: IParamError = {
                paramPath: paramPathsFromUpdate[i],
                timestamp,
                errorMessage: error,
                status,
                paramType: type,
                subStatus
              };
              this._paramErrors.push(errorObj);
            }
          }
          let didReceiveValuesForAllParameterPaths =
            parameterPathsSet.size === 0;
          let isSubscriptionRequestComplete = didReceiveValuesForAllParameterPaths;
          if (isSubscriptionRequestComplete) {
            let subscribeEndTime = now();
            let subscribeElapsed = subscribeEndTime - subscribeSentTime;
            this._webSocketProcess.unsubscribe(this.parameterDtos);
            subscription.unsubscribe();
            resolve(subscribeElapsed);
          }
        },
        error => {
          console.log(error);
          this.closeSocket();
          reject(error);
        }
      );
      let subscribeSentTime = now();
      this._webSocketProcess.subscribe(this.parameterDtos);
    });
  }

  closeSocket() {
    if (this._webSocketProcess) {
      this._webSocketProcess.closeSocketConnectionAsync();
    }
  }

  /**
   * Given an array of parameterDtos, return the full paths
   * @param parameterDtos
   */
  private getFullParameterPathsFromDtos(
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
}
