import { ParameterDefinitionDto } from "./interfaces/iParameterDefinitionDto";
import { ISubscriptionRequest } from "./interfaces/iSubscriptionRequest";
import { ISubscriptionUpdate } from "./interfaces/iSubscriptionUpdate";
import { INotificationMessage } from "./interfaces/iNotificationMessage";
import { IRequestCompleteDto } from "./interfaces/iRequestCompleteDto";
import { IWriteRequestDto } from "./interfaces/iWriteRequestDto";
import { IParameterCheckResponseDto } from "./interfaces/iParameterCheckResponseDto";
import { IESigData } from "./interfaces/iEsigData";
import { WebSocketHandler, INotificationHandler } from "./webSocketHandler";
import NotificationStrings from "./notificationStrings";
import { Guid } from "./guid";
import { ResolveablePromiseWrapper } from "./promise-resolve";
import { Observable, Subject } from "rxjs";
import { IMetaData } from "./interfaces/iMetaData";
import IParameterCheckRequestDto from "./interfaces/iParameterCheckDto";
import IESigValidationResult from "./interfaces/iEsigValidationResult";
import { IESigWriteRequestDto } from "./interfaces/iESigWriteRequestDto";

/**
 * Payload for the ProcessDataChanged event.
 */
export interface ISubscriptionDataChangedEventArgs {
  subscriptionUpdate: ISubscriptionUpdate;
  metaData: IMetaData;
  command?: string;
}

export interface IWriteCompleteEventArgs {
  writeUpdate: IRequestCompleteDto;
  metaData: IMetaData;
  command?: string;
}

export interface ISubscriptionNotifcation {
  data: ISubscriptionUpdate;
  metaData: IMetaData;
}

export interface IWriteNotification {
  writeUpdate: IRequestCompleteDto;
  metaData: IMetaData;
}

export enum ESigType {
  None = 0,
  Comment = 1,
  Confirm = 2,
  ConfirmAndVerify = 3
}

export interface IWebSocketProcess {
  unsubscribe(parameters: ParameterDefinitionDto[]): void;
  subscribe(parameters: ParameterDefinitionDto[]): void;
  requestParameterRefresh(parameters: string[]): void;
  notify(notification: INotificationMessage): void;
  write(
    parameter: ParameterDefinitionDto,
    value: any
  ): Promise<IRequestCompleteDto>;
  getEsigRequirementsAsync(parameterPath: string): Promise<ESigType>;
  writeEsigAsync(
    parameterPath: string,
    value: any,
    eSigData: IESigData
  ): Promise<IESigValidationResult>;
  getSubscriptionDataObservable(): Observable<
    ISubscriptionDataChangedEventArgs
  >;
  getWriteCompleteObservable(): Observable<IWriteCompleteEventArgs>;
  closeSocketConnectionAsync(): void;
  openSocketConnection(): void;
}

/**
 * Controls and monitors a web socket connection
 * Uses a webSocketHandler to subscribe/unsubscribe or write to parameters
 * Sends/recieves notifications via webSocketHandler
 * Notifies observers of notifications
 */
export class WebSocketProcess
  implements INotificationHandler, IWebSocketProcess {
  private readonly _maxParametersInOneSend: number = 50;
  private _writeRequests: {
    [token: string]: ResolveablePromiseWrapper<IRequestCompleteDto>;
  } = {};
  private _eSigCheckRequests: {
    [token: string]: ResolveablePromiseWrapper<IParameterCheckResponseDto>;
  } = {};
  private _eSigWriteRequests: {
    [token: string]: ResolveablePromiseWrapper<IRequestCompleteDto>;
  } = {};
  readonly _subscriptionDataSubject = new Subject<
    ISubscriptionDataChangedEventArgs
  >();
  readonly _writeSubject = new Subject<IWriteCompleteEventArgs>();
  _subscribeRequestSentTimeStamp: number;
  _subscribeResponseReceivedTimeStamp: number;
  _subscribeRoundTripTime: number;
  _writeRequestSentTimeStamp: number;
  _writeResponseReceivedTimeStamp: number;
  _writeRoundTripTime: number;
  /**
   * Creates a new WebSocketProcess
   * @param _webSocketHandler
   */
  constructor(private _webSocketHandler: WebSocketHandler) {
    this._webSocketHandler.registerHandler(this);
  }

  /**
   * Sends a notification to the server via webSocketHandler
   * @param notificationMessage
   */
  private _send(notificationMessage: any) {
    try {
      this._webSocketHandler.send(notificationMessage);
    } catch (e) {
      console.log(e);
    }
  }

  openSocketConnection() {
    if (this._webSocketHandler._socket === null) {
      this._webSocketHandler.initializeWebSocket();
      this._webSocketHandler.initPromise();
    }
  }

  async closeSocketConnectionAsync() {
    if (this._webSocketHandler._socket) {
      let isSocketOpenOrConnecting =
        this._webSocketHandler._socket.readyState === 1 ||
        this._webSocketHandler._socket.readyState === 0;
      if (isSocketOpenOrConnecting) {
        await this._webSocketHandler._connectPromise.resolve(true);
        this._webSocketHandler._socket.close();
        isSocketOpenOrConnecting = false;
      }
    }
  }

  /**
   * Gets the observable stream of subscription data updates
   */
  getSubscriptionDataObservable(): Observable<
    ISubscriptionDataChangedEventArgs
  > {
    return this._subscriptionDataSubject;
  }

  /**
   * Gets the observable stream of write requests
   */
  getWriteCompleteObservable(): Observable<IWriteCompleteEventArgs> {
    return this._writeSubject;
  }

  /**
   * Sends a write request to the server.
   * @param parameter
   * @param value
   */
  async write(
    parameter: ParameterDefinitionDto,
    value: any
  ): Promise<IRequestCompleteDto> {
    const strVal = JSON.stringify(value);
    const token = Guid.newGuid();
    const request: IWriteRequestDto = {
      token,
      parameter,
      value: strVal
    };
    const writePromiseWrapper = new ResolveablePromiseWrapper<
      IRequestCompleteDto
    >(`Writing to parameter ${parameter.path}`, 15000);

    this._writeRequests[token] = writePromiseWrapper;
    const message = <INotificationMessage>{
      command: NotificationStrings[NotificationStrings.write],
      data: request
    };
    this._writeRequestSentTimeStamp = Date.now();
    this._webSocketHandler.send(message);
    const response = await writePromiseWrapper.promise;
    if (!response.success) {
      throw response.message;
    }
    return response;
  }

  async getEsigRequirementsAsync(parameterPath: string): Promise<ESigType> {
    const token = Guid.newGuid();
    const request: IParameterCheckRequestDto = {
      token,
      parameterPath
    };
    const eSigPromiseWrapper = new ResolveablePromiseWrapper<
      IParameterCheckResponseDto
    >(`Checking Esig requirements for parameter ${parameterPath}`, 15000);
    this._eSigCheckRequests[token] = eSigPromiseWrapper;
    const message = <INotificationMessage>{
      command: NotificationStrings[NotificationStrings.eSigCheck],
      data: request
    };
    this._webSocketHandler.send(message);
    const response = await eSigPromiseWrapper.promise;
    if (!response.success) {
      throw response.message;
    }
    return response.eSigRequirement;
  }

  async writeEsigAsync(
    parameterPath: string,
    value: any,
    eSigData: IESigData
  ): Promise<IESigValidationResult> {
    const token = Guid.newGuid();
    const strValue = JSON.stringify(value);
    const request: IESigWriteRequestDto = {
      token,
      parameterPath,
      value: strValue,
      eSigData
    };
    const promiseWrapper = new ResolveablePromiseWrapper<IRequestCompleteDto>(
      `Writing with ESig validation to parameter ${parameterPath}`,
      15000
    );
    this._eSigWriteRequests[token] = promiseWrapper;
    const message = <INotificationMessage>{
      command: NotificationStrings[NotificationStrings.eSigWrite],
      data: request
    };
    try {
      this._writeRequestSentTimeStamp = Date.now();
      this._webSocketHandler.send(message);
      const response = await promiseWrapper.promise;
      return {
        isValid: response.success,
        validationException: response.message ? response.message : undefined
      };
    } catch (validationException) {
      return {
        isValid: false,
        validationException
      };
    }
  }

  /**
   * Unsubscribes from an array of specified parameters.
   * @param parameters
   */
  unsubscribe(parameters: ParameterDefinitionDto[]) {
    return new Promise(resolve => {
      for (
        let i = 0;
        i < parameters.length;
        i = i + this._maxParametersInOneSend
      ) {
        let subsetOfParameters = parameters.slice(
          i,
          i + this._maxParametersInOneSend >= parameters.length
            ? parameters.length
            : i + this._maxParametersInOneSend
        );
        let request: ISubscriptionRequest = {
          removedParameters: subsetOfParameters
        };

        let message = <INotificationMessage>{
          command: NotificationStrings[NotificationStrings.subscribe],
          data: request
        };
        this._send(message);
        resolve();
      }
    });
  }

  /**
   * Subscribes an array of specified parameters.
   * @param parameters
   */
  subscribe(parameters: ParameterDefinitionDto[]) {
    for (
      let i = 0;
      i < parameters.length;
      i = i + this._maxParametersInOneSend
    ) {
      let subsetOfParameters = parameters.slice(
        i,
        i + this._maxParametersInOneSend >= parameters.length
          ? parameters.length
          : i + this._maxParametersInOneSend
      );
      let request: ISubscriptionRequest = {
        addedParameters: subsetOfParameters
      };

      let message = <INotificationMessage>{
        command: NotificationStrings[NotificationStrings.subscribe],
        data: request
      };
      //log subscribe request sent

      this._subscribeRequestSentTimeStamp = Date.now();
      this._send(message);
    }
  }

  /**
   * Force server to flush parameter cache
   * @param parameters
   */
  requestParameterRefresh(parameters: string[]) {
    let message = <INotificationMessage>{
      command: NotificationStrings[NotificationStrings.flushParameter],
      data: parameters
    };
    this._send(message);
  }

  /**
   * Called by the web socket handler whenever it receives a message from the server.
   * @param notification
   */
  notify(notification: INotificationMessage) {
    switch (notification.command) {
      case NotificationStrings[NotificationStrings.dataUpdate]: {
        this._subscribeResponseReceivedTimeStamp = Date.now();
        this._subscribeRoundTripTime = this.calculateRoundTripTime(
          this._subscribeRequestSentTimeStamp,
          this._subscribeResponseReceivedTimeStamp
        );

        notification["metaData"] = {
          requestSentTimeStamp: this._subscribeRequestSentTimeStamp,
          responseReceivedTimeStamp: this._subscribeResponseReceivedTimeStamp,
          roundTripTime: this._subscribeRoundTripTime
        };
        this.notifySubscriptionObservers(notification);
        break;
      }
      case NotificationStrings[NotificationStrings.writeComplete]: {
        this._writeResponseReceivedTimeStamp = Date.now();
        this._writeRoundTripTime = this.calculateRoundTripTime(
          this._writeRequestSentTimeStamp,
          this._writeResponseReceivedTimeStamp
        );

        notification["metaData"] = {
          requestSentTimeStamp: this._writeRequestSentTimeStamp,
          responseReceivedTimeStamp: this._writeResponseReceivedTimeStamp,
          roundTripTime: this._writeRoundTripTime
        };
        this.notifyWriteObservers(notification);

        const data = notification.data as IRequestCompleteDto;

        this._writeRequests[data.token].resolve(data);
        delete this._writeRequests[data.token];
        break;
      }
      case NotificationStrings[NotificationStrings.eSigCheckComplete]: {
        const data = notification.data as IParameterCheckResponseDto;

        this._eSigCheckRequests[data.token].resolve(data);
        delete this._eSigCheckRequests[data.token];
        break;
      }
      case NotificationStrings[NotificationStrings.eSigWriteComplete]: {
        this._writeResponseReceivedTimeStamp = Date.now();
        this._writeRoundTripTime = this.calculateRoundTripTime(
          this._writeRequestSentTimeStamp,
          this._writeResponseReceivedTimeStamp
        );

        notification["metaData"] = {
          requestSentTimeStamp: this._writeRequestSentTimeStamp,
          responseReceivedTimeStamp: this._writeResponseReceivedTimeStamp,
          roundTripTime: this._writeRoundTripTime
        };
        this.notifyWriteObservers(notification);
        const data = notification.data as IRequestCompleteDto;

        this._eSigWriteRequests[data.token].resolve(data);
        delete this._eSigWriteRequests[data.token];
        break;
      }
    }
  }

  /**
   * Helper function for storing metaData of subscribe/write requests
   * Calculates round trip time given a start and end time
   * @param startTime
   * @param endTime
   */
  private calculateRoundTripTime(startTime: number, endTime: number): number {
    let roundTripTime = endTime - startTime;
    return roundTripTime;
  }

  /**
   * Notify observers of subscription data updates
   * @param data
   */
  private notifySubscriptionObservers(notification: any) {
    this._subscriptionDataSubject.next(<ISubscriptionDataChangedEventArgs>{
      subscriptionUpdate: notification.data,
      metaData: notification.metaData
    });
  }

  /**
   * Notify observers of write request updates
   * @param data
   */
  private notifyWriteObservers(notification: any) {
    this._writeSubject.next(<IWriteCompleteEventArgs>{
      writeUpdate: notification.data,
      metaData: notification.metaData
    });
  }
}
