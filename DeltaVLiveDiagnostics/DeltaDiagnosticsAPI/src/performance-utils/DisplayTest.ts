import now from "performance-now";
import { getFormattedByteString, getJsonSize } from "./lib/json-size";
import fetch from "node-fetch";
import clone from "clone";

export interface IDisplayTest {
  test(): Promise<IDisplayTestResult>;
  getDisplayErrors(): Array<IDisplayError>;
}

export interface IDisplayError {
  displayName: String;
  errorMessage: String;
  errorCode: Number;
}

export interface IDisplayTestResult {
  getJsonElapsed: number;
  parseJsonElapsed: number;
  displayJsonSize: string;
  animationScriptSize: string;
  eventScriptSize: string;
}

export class DisplayTest implements IDisplayTest {
  private _displayErrors: Array<IDisplayError> = [];
  private _defaultTestResult: IDisplayTestResult = {
    getJsonElapsed: 0,
    parseJsonElapsed: 0,
    displayJsonSize: "0",
    animationScriptSize: "0",
    eventScriptSize: "0"
  };
  constructor(private displayName: string, private authCookie: string) {}

  getDisplayErrors() {
    return clone(this._displayErrors);
  }

  async test(): Promise<IDisplayTestResult> {
    let startTime = now();
    let detailsJson = await this.fetchDisplayDetailsAsync();
    let endTime = now();
    if (detailsJson) {
      let getJsonElapsed = endTime - startTime;
      let parseJsonElapsed = this.parse(detailsJson);
      let displayJsonSize = this.getJsonSize(detailsJson);
      let eventScriptSize = this.getJsonSize(detailsJson.EventsScript);
      let animationScriptSize = this.getJsonSize(detailsJson.AnimationsScript);
      let testResult: IDisplayTestResult = {
        getJsonElapsed,
        parseJsonElapsed,
        displayJsonSize,
        eventScriptSize,
        animationScriptSize
      };
      return testResult;
    } else {
      return this._defaultTestResult;
    }
  }

  private getJsonSize(json) {
    return getFormattedByteString(getJsonSize(json));
  }

  private parse(details) {
    let parseStartTime = now();
    JSON.parse(JSON.stringify(details));
    let parseEndTime = now();
    let parseJsonElapsed = parseEndTime - parseStartTime;
    return parseJsonElapsed;
  }

  private addError(displayDetailsFetchResult) {
    this._displayErrors.push({
      displayName: this.displayName,
      errorMessage: displayDetailsFetchResult.statusText,
      errorCode: displayDetailsFetchResult.status
    });
  }

  private async fetchDisplayDetailsAsync() {
    let displayDetailsFetchResult;
    try {
      displayDetailsFetchResult = await fetch(
        `${process.env.OE_WEB_SERVER_URL}/api/Graphics/Display/${this.displayName}`,
        {
          headers: {
            cookie: this.authCookie
          }
        }
      );
      if (displayDetailsFetchResult.ok) {
        let json = await displayDetailsFetchResult.json();
        return json;
      } else {
        this.addError(displayDetailsFetchResult);
      }
    } catch (error) {
      this.addError(displayDetailsFetchResult);
    }
    return null;
  }
}
