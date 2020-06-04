import { IIterationResult } from "./PerformanceTestIteration";
import mongoose from "mongoose";
let ResultModel = require("../models/performance/Result");

export interface IPerformanceTestResult {
  addIteration(iteration: IIterationResult, iterationNumber: number): void;
  saveAsync(
    startDate: Date,
    endDate: Date,
    testId: mongoose.Types.ObjectId
  ): Promise<ITestResult>;
  updateTotals(iterationResult: IIterationResult): void;
  updateAverages(numIterations: number): void;
}

export interface ITestResult {
  testId: mongoose.Types.ObjectId;
  avgSubscribeElapsed: number;
  lowSubscribeElapsed: number;
  highSubscribeElapsed: number;
  avgGetJsonElapsed: number;
  avgParseJsonElapsed: number;
}

export class PerformanceTestResult implements IPerformanceTestResult {
  private _iterations = [];
  private _totalSubscribeElapsed = 0;
  private _totalGetJsonElapsed = 0;
  private _totalParseJsonElapsed = 0;
  private _avgSubscribeElapsed = 0;
  private _lowSubscribeElapsed: number = Number.MAX_SAFE_INTEGER;
  private _highSubscribeElapsed: number = 0;
  private _avgParseJsonElapsed = 0;
  private _avgGetJsonElapsed = 0;

  constructor() {}

  addIteration(iteration: IIterationResult, iterationNumber: number): void {
    this._iterations.push({ iterationNumber, ...iteration });
  }

  updateTotals(iterationResult: IIterationResult) {
    this._totalGetJsonElapsed += iterationResult.getJsonElapsed;
    this._totalParseJsonElapsed += iterationResult.parseJsonElapsed;
    this._totalSubscribeElapsed += iterationResult.subscribeElapsed;
  }

  updateAverages(numIterations: number) {
    this._avgGetJsonElapsed = this._totalGetJsonElapsed / numIterations;
    this._avgParseJsonElapsed = this._totalParseJsonElapsed / numIterations;
    this._avgSubscribeElapsed = this._totalSubscribeElapsed / numIterations;
  }

  updateSubscribeLowHigh(subElapsed) {
    this._highSubscribeElapsed = Math.max(
      subElapsed,
      this._highSubscribeElapsed
    );
    this._lowSubscribeElapsed = Math.min(subElapsed, this._lowSubscribeElapsed);
  }

  async saveAsync(
    startDate: Date,
    endDate: Date,
    testId: mongoose.Types.ObjectId
  ): Promise<ITestResult> {
    let newResult = new ResultModel({
      _id: new mongoose.Types.ObjectId(),
      testId: testId,
      startDate: startDate,
      endDate: endDate,
      avgSubscribeElapsed: this._avgSubscribeElapsed,
      lowSubscribeElapsed: this._lowSubscribeElapsed,
      highSubscribeElapsed: this._highSubscribeElapsed,
      avgGetJsonElapsed: this._avgGetJsonElapsed,
      avgParseJsonElapsed: this._avgParseJsonElapsed,
      iterations: this._iterations
    });
    console.log("saving result");
    await newResult.save((err, product) => {
      if (err) {
        console.log(err);
      }
    });
    return {
      testId: testId,
      avgSubscribeElapsed: this._avgSubscribeElapsed,
      lowSubscribeElapsed: this._lowSubscribeElapsed,
      highSubscribeElapsed: this._highSubscribeElapsed,
      avgGetJsonElapsed: this._avgGetJsonElapsed,
      avgParseJsonElapsed: this._avgParseJsonElapsed
    };
  }
}
