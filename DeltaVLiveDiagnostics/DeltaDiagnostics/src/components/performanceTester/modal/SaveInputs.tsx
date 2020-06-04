import React from "react";
import { Button, Form } from "react-bootstrap";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";

export interface ISaveJsonStruct {
  settings: {
    numIterations: number;
    iterationDelay: number;
    testDelay: number;
  };
  tests: IDisplayTestItem[];
}

interface ISaveInputsState {
  filename: string;
}

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  numIterations?: number;
  iterationDelay?: number;
  testDelay?: number;
}

class SaveInputs extends React.Component<IStateProps, ISaveInputsState> {
  state = {
    filename: ""
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ filename: event.target.value });
  };

  handleFormSubmitAsync = event => {
    event.preventDefault();
    let selectedTableItems: IDisplayTestItem[] = [];
    for (var i = 0; i < this.props.performanceTableItems.length; i++) {
      if (this.props.performanceTableItems[i].isSelected) {
        selectedTableItems.push(this.props.performanceTableItems[i]);
      }
    }
    this.saveDisplayItemsToJsonFile(selectedTableItems, this.state.filename);
  };

  getJsonStruct(tests: IDisplayTestItem[]): ISaveJsonStruct {
    let settings = {
      numIterations: this.props.numIterations,
      iterationDelay: this.props.iterationDelay,
      testDelay: this.props.testDelay
    };
    let jsonStruct: ISaveJsonStruct = {
      settings,
      tests
    };

    return jsonStruct;
  }

  saveDisplayItemsToJsonFile(
    displayTestItems: IDisplayTestItem[],
    filename: string
  ) {
    let json: ISaveJsonStruct = this.getJsonStruct(displayTestItems);
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(json)], {
      type: "application/json"
    });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  }
  render() {
    return (
      <>
        <Form onSubmit={this.handleFormSubmitAsync}>
          <Form.Text className="text-muted">
            Save the state of the selected items in the performance tester table
            so you can open and run again at another time.
          </Form.Text>
          <Form.Text className="text-muted">
            {`Your settings will be saved as well: iterations: ${this.props.numIterations}, iteration delay: ${this.props.iterationDelay}
          , test delay: ${this.props.testDelay}`}
          </Form.Text>
          <Form.Control
            type="text"
            value={this.state.filename}
            onChange={this.handleInputChange}
            placeholder="Enter filename"
            required
          />
          <Button variant="primary" type="submit">
            Download
          </Button>
        </Form>
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
    numIterations: state.performanceTester.numIterations,
    iterationDelay: state.performanceTester.iterationDelay,
    testDelay: state.performanceTester.testDelay
  };
}

export default connect<IStateProps, null>(mapStateToProps, null)(SaveInputs);
