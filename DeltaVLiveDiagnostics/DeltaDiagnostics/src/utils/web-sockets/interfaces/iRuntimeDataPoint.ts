/**
 * Represents a runtime data point.
 */
export interface IRuntimeDataPoint {
  /**
   * value.
   */
  value: any;

  /**
   * timestamp.
   */
  timestamp: number;

  /**
   * error.
   */
  error: string;

  /**
   * status.
   */
  status: number;

  /**
   * type.
   */
  type: string;

  /**
   * SubStatus.
   */
  subStatus: number;

  /**
   * the id used to register
   */
  targetId: string;

  /**
   *the service type
   */
  serviceType: string;
}

/**
 * A runtime data point.
 */
export class RuntimeDataPoint implements IRuntimeDataPoint {
  constructor(public serviceType: string, public targetId: string) {}
  /**
   * value.
   */
  value: any;

  /**
   * timestamp.
   */
  timestamp: any;

  /**
   * error.
   */
  error: string;

  /**
   * status.
   */
  status: number;

  /**
   * type.
   */
  type: string;

  /**
   * SubStatus.
   */
  subStatus: number;
}
