import React from "react";
import { Button } from "react-bootstrap";
import {
  IDisplayTestItem,
  IParamError,
  ITestResult,
  IIterationResult,
  IDisplayError
} from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";
import socketIOClient from "socket.io-client";
import {
  BASE_WS_URL,
  API_INIT_PERFORMANCE_TEST_ENDPOINT,
  API_CANCEL_PERFORMANCE_TEST_ENDPOINT
} from "../../../appConstants";

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  isPerformanceTestRunning?: boolean;
  numIterations: number;
  iterationDelay: number;
  testDelay: number;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

type Props = IStateProps & IDispatchProps;
class RunButton extends React.Component<Props> {
  _subElapsedLow: number = Number.MAX_SAFE_INTEGER;
  _subElapsedHigh: number = 0;
  _performanceTestId = "";
  _socketId = 0;
  _socket;
  state = {
    isModalShowing: false
  };

  componentDidMount() {
    const socket = socketIOClient(BASE_WS_URL);
    socket.on("connect", () => this.handleConnect(socket));
    socket.on("iteration", iter => this.updateIteration(iter));
    socket.on("init", () => this.setIsTesterRunning(true));
    socket.on("end", () => this.setIsTesterRunning(false));
    socket.on("testStart", id => this.updateItemIsTesting(id, true));
    socket.on("testEnd", result => this.updateAvg(result));
  }

  componentWillUnmount() {
    this.handleDisconnect();
  }

  handleConnect = socket => {
    this._socketId = socket.id;
    this._socket = socket;
  };

  handleDisconnect() {
    this._socket.emit("manual-disconnection", this._socket.id);
    this._socket.close();
  }

  updateAvg(result: ITestResult) {
    this.props.performanceTesterActions.updateTestResult(result);
    this.props.performanceTesterActions.updateTableItemIsTesting(
      result.testId,
      false
    );
  }

  updateIteration(iter: IIterationResult) {
    let { paramErrors, testId, displayErrors, iterationNumber } = iter;
    this.updateParamErrors(paramErrors, testId, iterationNumber);
    this.updateDisplayErrors(displayErrors, testId);
    this.props.performanceTesterActions.updateIterationResult(iter);
    this.props.performanceTesterActions.updateOutput(
      "Iteration starting: " + iter.iterationNumber
    );
  }

  updateItemIsTesting(id, isItemTesting) {
    this.props.performanceTesterActions.updateTableItemIsTesting(
      id,
      isItemTesting
    );
  }

  updateParamErrors = (
    paramErrors: IParamError[],
    testId: string,
    iterationNumber: number
  ) => {
    let newParamErrors: IParamError[] = [];
    if (paramErrors.length > 0) {
      for (var i = 0; i < paramErrors.length; i++) {
        let paramError: IParamError = {
          testId,
          iterationNumber: iterationNumber,
          ...paramErrors[i]
        };
        if (
          !newParamErrors.find(
            paramErr => paramErr.errorMessage === paramError.errorMessage
          )
        ) {
          newParamErrors.push(paramError);
        }
      }
      this.props.performanceTesterActions.updateParamErrors(newParamErrors);
      this.props.performanceTesterActions.updateHasParamError(testId, true);
    }
  };

  updateDisplayErrors = (displayErrors: IDisplayError[], testId: string) => {
    if (displayErrors.length > 0) {
      this.props.performanceTesterActions.updateHasDisplayNameError(
        testId,
        true
      );
    }
  };

  isAtLeastOneItemInTable() {
    return this.props.performanceTableItems.length > 0;
  }

  isPerformanceTestRunning() {
    return this.props.isPerformanceTestRunning;
  }

  isAtLeastOneItemSelected() {
    for (var i = 0; i < this.props.performanceTableItems.length; i++) {
      if (this.props.performanceTableItems[i].isSelected) {
        return true;
      }
    }
    return false;
  }

  resetErrorStatus(itemId: string) {
    this.props.performanceTesterActions.updateHasParamError(itemId, false);
    this.props.performanceTesterActions.updateHasDisplayNameError(
      itemId,
      false
    );
  }

  getTestsToRun = () => {
    let tests = [];
    for (var i = 0; i < this.props.performanceTableItems.length; i++) {
      if (
        this.props.performanceTableItems[i].hasParamError ||
        this.props.performanceTableItems[i].hasDisplayNameError
      ) {
        this.resetErrorStatus(this.props.performanceTableItems[i].itemId);
        this.updateItemIsTesting(
          this.props.performanceTableItems[i].itemId,
          false
        );
      }
      if (this.props.performanceTableItems[i].isSelected) {
        let tableItem = this.props.performanceTableItems[i];
        let testItem = {
          displayName: tableItem.displayName,
          parameterDtos: tableItem.parameterDtos,
          id: tableItem.itemId
        };
        tests.push(testItem);
      }
    }
    return tests;
  };

  handleRunClick = async event => {
    event.preventDefault();
    this.props.performanceTesterActions.deleteOutputMessages();
    this.props.performanceTesterActions.deleteParamErrors();
    let tests = this.getTestsToRun();
    let settings = {
      numIterations: this.props.numIterations,
      iterationDelay: this.props.iterationDelay,
      testDelay: this.props.testDelay
    };
    let postBody = {
      settings,
      tests,
      socketId: this._socketId
    };
    try {
      let perfResp = await fetch(API_INIT_PERFORMANCE_TEST_ENDPOINT, {
        body: JSON.stringify(postBody),
        method: "POST",
        credentials: "include",
        headers: {
          Connection: "keep-alive",
          "Content-Type": "application/json"
        }
      });
      let result = await perfResp.json();
      this._performanceTestId = result.performanceTestId;
    } catch (error) {
      console.log(error);
      this.setIsTesterRunning(false);
    }
  };

  handleCancelClick = async event => {
    event.preventDefault();
    await fetch(API_CANCEL_PERFORMANCE_TEST_ENDPOINT(this._performanceTestId), {
      credentials: "include",
      headers: {
        Connection: "keep-alive"
      }
    });
    this.setIsTesterRunning(false);
  };

  setIsTesterRunning = isTestRunning => {
    this.props.performanceTesterActions.updateIsPerformanceTestRunning(
      isTestRunning
    );
  };

  renderRunButton() {
    if (!this.isPerformanceTestRunning()) {
      return (
        <Button
          variant="outline-success"
          onClick={this.handleRunClick}
          disabled={!this.isAtLeastOneItemSelected()}
        >
          Run Tests
        </Button>
      );
    } else {
      return (
        <Button variant="outline-success" onClick={this.handleCancelClick}>
          Cancel
        </Button>
      );
    }
  }

  render() {
    return <>{this.renderRunButton()}</>;
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
    isPerformanceTestRunning: state.performanceTester.isPerformanceTestRunning,
    numIterations: state.performanceTester.numIterations,
    iterationDelay: state.performanceTester.iterationDelay,
    testDelay: state.performanceTester.testDelay
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    performanceTesterActions: bindActionCreators(
      performanceTesterActions,
      dispatch
    )
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RunButton);
