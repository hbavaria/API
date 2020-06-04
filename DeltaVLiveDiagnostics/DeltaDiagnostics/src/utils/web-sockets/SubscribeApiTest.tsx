import * as React from "react";
import * as subscriptionApi from "../api/subscriptionApi";
import IESigData from "./interfaces/iEsigData";
// import { ParameterDefinitionDto } from "./interfaces/iParameterDefinitionDto";

//Component that tests subscribing and writing of parameters
class Subscribe extends React.Component {
  async componentDidMount() {
    let webSocketProcess = subscriptionApi.getWebSocketProcess();

    //Note: testParameters must be formatted this way (path and source specified, not just path) or else the web server will not process the response correctly.
    // let param2: ParameterDefinitionDto = {
    //   path: "PARAM2",
    //   source: "PID_LOOP_1"
    // };

    // let param1: ParameterDefinitionDto = {
    //   path: "PARAM1",
    //   source: "PID_LOOP_1"
    // };

    //test observing stream of subscription and write updates
    // let subscriptionObservable = subscriptionApi.getSubscriptionUpdatesObservable(
    //   webSocketProcess
    // );
    // subscriptionObservable.subscribe(update => {
    //   let liveUpdate = update;
    //   console.log("subscription update");
    //   console.log(liveUpdate);
    // });

    // let writeObservable = subscriptionApi.getWriteCompleteObservable(
    //   webSocketProcess
    // );
    // writeObservable.subscribe(update => {
    //   let liveUpdate = update;
    //   console.log("write update");
    //   console.log(liveUpdate);
    // });

    //test subscribing to parameters
    // await subscriptionApi.subscribe(webSocketProcess, [param1, param2]);

    //test writing values to a parameter
    // let valuesToWriteArray = [];
    // for (var i = 0; i < 10; i++) {
    //   valuesToWriteArray.push(i);
    // }

    // let startTime = performance.now();
    // for (var i = 0; i < valuesToWriteArray.length; i++) {
    //   console.log("writing value:" + valuesToWriteArray[i]);
    //   await subscriptionApi.writeValueAsync(
    //     webSocketProcess,
    //     param1,
    //     valuesToWriteArray[i]
    //   );
    // }
    // let endTime = performance.now();
    // console.log(
    //   "Writing values took" + (endTime - startTime) + " ms to complete"
    // );

    //test getting e sig requirements for a parameter
    await subscriptionApi.getEsigRequirementsAsync(
      "PID_LOOP_2/PARAM1",
      webSocketProcess
    );

    // let eSigDataConfirm: IESigData = {
    //   ConfirmPassword: "pass",
    //   ConfirmUser: "dvadmin"
    // };

    // let eSigDataConfirmandVerify: IESigData = {
    //   ConfirmPassword: "d",
    //   ConfirmUser: "dvadmin",
    //   VerifyPassword: "deltav",
    //   VerifyUser: "ver"
    // };

    let eSigDataComment: IESigData = { Comment: "my comment" };
    await subscriptionApi.writeEsigAsync(
      "PID_LOOP_2/PARAM1",
      "value",
      eSigDataComment,
      webSocketProcess
    );
  }
  render() {
    return <p>test</p>;
  }
}

export default Subscribe;
