import mongoose from "mongoose";
import ParameterDefinitionDto from "./lib/interfaces/iParameterDefinitionDto";
let TestModel = require("../models/performance/Test");

export interface IPerformanceTest {
  getParameterDtos(): ParameterDefinitionDto[];
  getDisplayName(): string;
  getId(): mongoose.Types.ObjectId;
  getSettings(): IPerformanceTestSettings;
  saveAsync();
}

export interface IPerformanceTestSettings {
  numIterations: number;
  iterationDelay: number;
  testDelay: number;
}

export class PerformanceTest implements IPerformanceTest {
  constructor(
    private parameterDtos: ParameterDefinitionDto[],
    private displayName: string,
    private id: mongoose.Types.ObjectId,
    private settings: IPerformanceTestSettings
  ) {}

  getParameterDtos(): ParameterDefinitionDto[] {
    return this.parameterDtos;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  getId(): mongoose.Types.ObjectId {
    return this.id;
  }

  getSettings(): IPerformanceTestSettings {
    return this.settings;
  }

  async saveAsync() {
    let newTest = new TestModel({
      _id: this.id,
      settings: this.settings,
      displayName: this.displayName,
      parameterDtos: this.parameterDtos
    });
    console.log("saving test");
    await newTest.save((err, product) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
