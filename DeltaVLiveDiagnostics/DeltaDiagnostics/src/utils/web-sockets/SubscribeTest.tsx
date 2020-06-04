import * as React from "react";
import { WebSocketHandler } from "./webSocketHandler";
import { ParameterDefinitionDto } from "./interfaces/iParameterDefinitionDto";
import { WebSocketProcess } from "./webSocketProcess";

//Component that tests subscribing and writing of parameters
class Subscribe extends React.Component {
  async componentDidMount() {
    let webSocketHandler = new WebSocketHandler();
    let webSocketProcess = new WebSocketProcess(webSocketHandler);

    //Note: testParameters must be formatted this way (path and source specified, not just path) or else the web server will not process the response correctly.
    let testParam: ParameterDefinitionDto = {
      path: "PARAM2",
      source: "PID_LOOP_1"
    };

    let testParams: Array<ParameterDefinitionDto> = [testParam];
    console.log(webSocketHandler);
    console.log(webSocketProcess);
    console.log(testParams);

    //test subscribing to a parameter
    await webSocketProcess.subscribe([testParam]);

    //test writing to a parameter
    let valuesToWriteArray = [
      "firstValue",
      "secondVal",
      "thirdVal",
      "fourthVal",
      "lastVal"
    ];

    for (var i = 0; i < valuesToWriteArray.length; i++) {
      console.log("writing value:" + valuesToWriteArray[i]);
      await webSocketProcess.write(testParam, valuesToWriteArray[i]);
    }
  }
  render() {
    return <p>test</p>;
  }
}

export default Subscribe;
