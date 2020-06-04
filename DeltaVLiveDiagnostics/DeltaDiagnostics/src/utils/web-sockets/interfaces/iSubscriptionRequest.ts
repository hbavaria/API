import { ParameterDefinitionDto } from "./iParameterDefinitionDto";

/**
 * Represents a subscription request.
 */
export interface ISubscriptionRequest {
  /**
   * List of parameters to subscribe to.
   */
  addedParameters?: ParameterDefinitionDto[];

  /**
   * List of parameters to unsubscribe to.
   */
  removedParameters?: ParameterDefinitionDto[];
}
