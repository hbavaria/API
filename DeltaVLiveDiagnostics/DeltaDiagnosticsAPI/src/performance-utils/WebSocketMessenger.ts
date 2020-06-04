import mongoose from "mongoose";
import { IIterationResult } from "./PerformanceTestIteration";
import { ITestResult } from "./PerformanceTestResult";

interface IResult extends IIterationResult {
  testId: mongoose.Types.ObjectId;
  iterationNumber: number;
}

export interface IWebSocketMessenger {
  init();
  end();
  testStart(testId: mongoose.Types.ObjectId);
  testEnd(result: ITestResult);
  iterationStart(currentIteration: number);
  iterationResult(result: IResult);
}

export class WebSocketMessenger implements IWebSocketMessenger {
  constructor(private socketId, private io) {}

  init() {
    this.send("init", "Initiating performance tests");
  }

  end() {
    this.send("end", "Performance tests complete");
  }

  testStart(testId: mongoose.Types.ObjectId) {
    this.send("testStart", testId);
  }

  testEnd(result: ITestResult) {
    this.send("testEnd", result);
  }

  iterationStart(currentIteration: number) {
    this.send("output", "starting iteration..." + currentIteration);
  }

  iterationResult(result: IResult) {
    this.send("iteration", result);
  }

  private send = (event, message) => {
    this.io.to(this.socketId).emit(event, message);
  };
}
