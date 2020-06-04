import { IMetaData } from "./iMetaData";

/**
 * Notification message.
 */
export interface INotificationMessage {
  /**
   * The command associated with the message.
   */
  command: string;

  /**
   * The payload data.
   */
  data: any;

  /**
   * Optional metaData item to append
   */
  metaData?: IMetaData;
}
