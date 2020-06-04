import React from "react";
import { Button } from "react-bootstrap";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";
import { ISaveJsonStruct } from "../modal/SaveInputs";

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  isPerformanceTestRunning?: boolean;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

type Props = IStateProps & IDispatchProps;
class ImportButton extends React.Component<Props> {
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

  handleFile = async event => {
    let fileText = (await this.readDisplayItemsFromJsonFile(
      event.target.files[0]
    )) as string;
    let jsonStruct: ISaveJsonStruct = JSON.parse(fileText);
    this.updateSettings(jsonStruct.settings);
    this.updateTable(jsonStruct.tests);
  };

  updateTable(tableItems: IDisplayTestItem[]) {
    for (var i = 0; i < tableItems.length; i++) {
      this.props.performanceTesterActions.addTableItem(tableItems[i]);
    }
  }

  updateSettings(settings) {
    this.props.performanceTesterActions.updateIterationDelay(
      settings.iterationDelay
    );
    this.props.performanceTesterActions.updateTestDelay(settings.testDelay);
    this.props.performanceTesterActions.updateNumIterations(
      settings.numIterations
    );
  }

  readDisplayItemsFromJsonFile(jsonFile) {
    let fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException("Problem parsing input file"));
      };

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsText(jsonFile);
    });
  }

  //wrapper for file input, this is so we don't have to use the default browser 'choose file' button
  handleClick = () => {
    document.getElementById("openFile").click();
  };

  render() {
    return (
      <Button
        onClick={this.handleClick}
        variant="outline-primary"
        disabled={this.isPerformanceTestRunning()}
      >
        <input
          id="openFile"
          style={{ display: "none" }}
          key={Date.now()} // adding a key refreshes the form input on re-render so that a new file can be loaded. This fixes a bug where the user cannot load a second file after loading one.
          type="file"
          accept=".json"
          onChange={this.handleFile}
        />
        Import Config
      </Button>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
    isPerformanceTestRunning: state.performanceTester.isPerformanceTestRunning
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
)(ImportButton);
