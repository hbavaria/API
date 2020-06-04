import { PerformanceTest } from "./PerformanceTest";
import {
  PerformanceTestIteration,
  IIterationResult
} from "./PerformanceTestIteration";
import { SubscriptionTest } from "./SubscriptionTest";
import { DisplayTest } from "./DisplayTest";
import { PerformanceTestResult } from "./PerformanceTestResult";
import { IWebSocketMessenger } from "./WebSocketMessenger";
let TestModel = require("../models/performance/Test");

export interface IPerformanceTester {
  initTestsAsync(): Promise<void>;
  cancelTests(): void;
}

export class PerformanceTesterLive implements IPerformanceTester {
  private _isPerformanceTestCancelled = false;
  private _iterationDelayTimeout: any;
  private _testDelayTimeout: any;
  private _subTest: SubscriptionTest;
  private _dispTest: DisplayTest;
  private _testResult: PerformanceTestResult;
  private _startDate: Date;

  constructor(
    private readonly tests: PerformanceTest[],
    private authCookie: string,
    private wsMessenger: IWebSocketMessenger
  ) {
    if (!authCookie) {
      throw "Cannot start test without authentication cookie. Please ensure that the cookie is specified in the request headers.";
    }
  }

  cancelTests(): void {
    this._isPerformanceTestCancelled = true;
    if (this._iterationDelayTimeout) {
      this._iterationDelayTimeout.cancel();
    }
    if (this._testDelayTimeout) {
      this._testDelayTimeout.cancel();
    }
  }

  private initTest(test: PerformanceTest): void {
    this._subTest = new SubscriptionTest(
      test.getParameterDtos(),
      this.authCookie
    );
    this._dispTest = new DisplayTest(test.getDisplayName(), this.authCookie);
    this._testResult = new PerformanceTestResult();
    this._startDate = new Date();
    this.wsMessenger.init();
    this.wsMessenger.testStart(test.getId());
  }

  private async endTest(
    test: PerformanceTest,
    currentIteration: number
  ): Promise<void> {
    let endDate = new Date();
    let doesTestExist = await TestModel.exists({
      _id: test.getId()
    });
    if (doesTestExist) {
      let result = await this._testResult.saveAsync(
        this._startDate,
        endDate,
        test.getId()
      );
      this.wsMessenger.testEnd(result);
    } else {
      await test.saveAsync();
      let result = await this._testResult.saveAsync(
        this._startDate,
        endDate,
        test.getId()
      );
      this.wsMessenger.testEnd(result);
    }
    await this.testDelayAsync(test, currentIteration);
    this._subTest.closeSocket();
  }

  private updateResult(
    iterResult: IIterationResult,
    test: PerformanceTest,
    currentIteration: number
  ) {
    this._testResult.addIteration(iterResult, currentIteration);
    this._testResult.updateTotals(iterResult);
    this._testResult.updateSubscribeLowHigh(iterResult.subscribeElapsed);
    this._testResult.updateAverages(test.getSettings().numIterations);
  }

  async initTestsAsync(): Promise<void> {
    for (var i = 0; i < this.tests.length; i++) {
      if (!this._isPerformanceTestCancelled) {
        let test = this.tests[i];
        this.initTest(test);
        for (
          var currentIteration = 1;
          currentIteration <= test.getSettings().numIterations;
          currentIteration++
        ) {
          if (!this._isPerformanceTestCancelled) {
            let iterationResult = await this.initIteration(
              test,
              currentIteration
            );
            this.updateResult(iterationResult, test, currentIteration);
            await this.iterationDelayAsync(test, currentIteration);
          }
        }
        await this.endTest(test, currentIteration);
      }
    }
    this.wsMessenger.end();
  }

  private async initIteration(
    test: PerformanceTest,
    currentIteration: number
  ): Promise<IIterationResult> {
    this.wsMessenger.iterationStart(currentIteration);
    let iteration = new PerformanceTestIteration(this._dispTest, this._subTest);
    let iterationResult: IIterationResult = await iteration.run();
    this.wsMessenger.iterationResult({
      testId: test.getId(),
      iterationNumber: currentIteration,
      ...iterationResult
    });
    return iterationResult;
  }

  private async iterationDelayAsync(
    test: PerformanceTest,
    currentIteration: number
  ) {
    this._iterationDelayTimeout = this.getTimeoutObject(
      test.getSettings().iterationDelay
    );
    let isLastIteration = currentIteration === test.getSettings().numIterations;
    if (test.getSettings().iterationDelay > 0 && !isLastIteration) {
      await this._iterationDelayTimeout.promise;
    }
  }

  private async testDelayAsync(test: PerformanceTest, currIndex: number) {
    this._testDelayTimeout = this.getTimeoutObject(
      test.getSettings().testDelay
    );
    let isLastTest = currIndex === this.tests.length - 1;
    if (test.getSettings().testDelay > 0 && !isLastTest) {
      await this._testDelayTimeout.promise;
    }
  }

  private getTimeoutObject(ms) {
    let timeout, promise;
    promise = new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve();
      }, ms);
    });
    return {
      promise: promise,
      cancel: () => {
        clearTimeout(timeout);
      }
    };
  }
}
