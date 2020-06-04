import { IRuntimeDataPoint } from "./iRuntimeDataPoint";

/**
 * Represents a subscription update.
 */
export interface ISubscriptionUpdate {
  [fullPath: string]: IRuntimeDataPoint;
}
