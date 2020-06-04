import { INotificationMessage } from "./interfaces/iNotificationMessage";
import ResolveablePromiseWrapper from "./utility/promise-resolve";
import NotificationStrings from "./notificationStrings";
import { API_ONE_TIME_TOKEN_ENDPOINT, WS_URL } from "../../appConstants";

/**
 * Payload for a notification event.
 */
export interface INotificationHandler {
  notify(message: INotificationMessage);
}

/**
 * Client-side service responsible for sending/receiving socket messages.
 */
export class WebSocketHandler {
  _socket: WebSocket = null;
  private _handlers: INotificationHandler[] = [];
  _connectPromise: ResolveablePromiseWrapper<boolean>;

  // @ts-ignore
  private readonly _cleanup: ICleanUpService;
  /**
   * Constructor.
   */
  constructor() {
    this.initPromise();
    this.initializeWebSocket();
  }

  initPromise() {
    this._connectPromise = new ResolveablePromiseWrapper<boolean>(
      "WebSocketHandler initPromise"
    );
  }

  /**
   * Registers a notification handler.
   * @param handler
   */
  registerHandler(handler: INotificationHandler): void {
    const idx = this._handlers.indexOf(handler);
    if (idx === -1) {
      // add if it doesn't exist
      this._handlers.push(handler);
    }
  }

  /**
   * Unregisters a notification handler.
   * @param handler
   */
  unregisterHandler(handler: INotificationHandler): void {
    const idx = this._handlers.indexOf(handler);
    if (idx > -1) {
      // remove if it exists
      this._handlers.splice(this._handlers.indexOf(handler), 1);
    }
  }

  /**
   * Sends a message to the server through the socket.
   * @param notificationMessage
   */
  send = (notificationMessage: INotificationMessage) => {
    const jsonMessage = JSON.stringify(notificationMessage);
    this._connectPromise.promise.then(_ => {
      // when shutting down, this is null -
      try {
        if (this._socket) {
          this._socket.send(jsonMessage);
        }
      } catch (e) {
        console.log(`Error ${e.message} send() message via websocket`, e);
      }
    });
  };

  /**
   * Sends a raw message to the server through the socket.
   * @param notificationMessage
   */
  rawSend = (jsonMessage: string) => {
    this._connectPromise.promise.then(_ => {
      // when shutting down, this is null -
      try {
        if (this._socket) {
          this._socket.send(jsonMessage);
        }
      } catch (e) {
        console.log(`Error ${e.message} rawSend() message via websocket`, e);
      }
    });
  };

  //Initializes the web socket connection.
  initializeWebSocket(): Promise<any> {
    const req = new Promise<any>(async (resolve, reject) => {
      // This fetch is for establishing the jwt and authenticating.
      const res = await fetch(API_ONE_TIME_TOKEN_ENDPOINT, {
        method: "GET",
        credentials: "include"
      });
      if (res.ok) {
        await res.text().then(token => {
          let uri = WS_URL();
          this._socket = new WebSocket(uri);
          this._socket.onopen = () => {
            // we need to first authenticate before any other messages
            // will be processed by the server.
            let authMessage = {
              command: NotificationStrings[NotificationStrings.authenticate],
              data: { token: token }
            } as INotificationMessage;
            this._socket.send(JSON.stringify(authMessage));
            // this will allow send operations to run
            this._connectPromise.resolve(true);
          };
          this._socket.onclose = e => {
            this._socket = null;
            if (!e.wasClean) {
              console.log(`Nonclean WebSocket close: ${e.code} ${e.reason}`);
            }
          };
          let self = this;
          this._socket.onmessage = function(e) {
            WebSocketHandler.socketUpdateCount++;
            let notification = JSON.parse(e.data) as INotificationMessage;
            self.notifyObservers(notification);
          };

          this._socket.onerror = _e => {
            console.log(
              `WebSocket Error. Debug the socket.onerror event for more information.`
            );
          };
        });

        resolve(true);
      } else {
        const m =
          "Failed to retrieve token from server to authenticate web socket.";
        console.log(m);
        reject(m);
      }
    });

    return req;
  }

  static socketUpdateCount: number = 0;

  //Sends socket messages to all registered observers.
  private notifyObservers(notification: INotificationMessage) {
    this._handlers.forEach((handler: INotificationHandler) => {
      handler.notify(notification);
    });
  }
}
