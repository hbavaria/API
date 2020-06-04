import { IDisplayError, IDisplayTest, IDisplayTestResult } from "./DisplayTest";
import { IParamError, ISubscriptionTest } from "./SubscriptionTest";
export interface IPerformanceTestIteration {
  run(): Promise<IIterationResult>;
}

export interface IIterationResult {
  subscribeElapsed: number;
  getJsonElapsed: number;
  parseJsonElapsed: number;
  displayJsonSize: string;
  animationScriptSize: string;
  eventScriptSize: string;
  startDate: Date;
  endDate: Date;
  paramErrors: Array<IParamError>;
  displayErrors: Array<IDisplayError>;
}

export class PerformanceTestIteration implements IPerformanceTestIteration {
  constructor(
    private DisplayTest: IDisplayTest,
    private SubscriptionTest: ISubscriptionTest
  ) {}

  async run(): Promise<IIterationResult> {
    let startDate = new Date();
    let displayTestResult: IDisplayTestResult = await this.DisplayTest.test();
    let {
      getJsonElapsed,
      parseJsonElapsed,
      displayJsonSize,
      animationScriptSize,
      eventScriptSize
    } = displayTestResult;
    let displayErrors: IDisplayError[] = await this.DisplayTest.getDisplayErrors();
    let subscribeElapsed = await this.SubscriptionTest.getSubscriptionElapsedAsync();
    let paramErrors: IParamError[] = await this.SubscriptionTest.getParamErrors();
    let endDate = new Date();
    let result: IIterationResult = {
      subscribeElapsed,
      getJsonElapsed,
      parseJsonElapsed,
      displayJsonSize,
      animationScriptSize,
      eventScriptSize,
      startDate,
      endDate,
      paramErrors,
      displayErrors
    };
    return result;
  }
}
