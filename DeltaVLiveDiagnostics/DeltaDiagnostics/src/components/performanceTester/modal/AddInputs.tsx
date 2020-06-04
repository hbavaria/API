import React from "react";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { Form, Button } from "react-bootstrap";
import * as subscriptionApi from "../../../utils/api/subscriptionApi";
import ParameterTextArea from "./ParameterTextArea";
import { getSanitizedParams } from "../../../utils/userInput";
import ParameterDefinitionDto from "../../../utils/web-sockets/interfaces/iParameterDefinitionDto";
import ObjectId from "bson-objectid";

interface IAddInputState {
  displayName: string;
  textArea: string;
  fileName: string;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

class AddInputs extends React.Component<IDispatchProps, IAddInputState> {
  state = {
    displayName: "",
    textArea: "",
    fileName: "No file chosen"
  };

  handleFormSubmitAsync = async event => {
    event.preventDefault();

    let paramDtos: ParameterDefinitionDto[] = await subscriptionApi.getParameterDefinitionDtosFromString(
      getSanitizedParams(this.state.textArea)
    );

    let newTableItem: IDisplayTestItem = {
      displayName: this.state.displayName,
      isSelected: false,
      itemId: new ObjectId().str,
      parameterDtos: paramDtos
    };
    this.props.performanceTesterActions.createPerformanceTesterTableItem(
      newTableItem
    );

    this.setState({ displayName: "" });
    this.setState({ textArea: "" });
  };

  handleDisplayInputChange = event => {
    event.preventDefault();
    this.setState({ displayName: event.target.value });
  };

  handleFileChange = async event => {
    this.setState({ fileName: event.target.files[0].name });
    event.preventDefault();
    if (event.target.files.length === 0) return;
    try {
      let text = (await this.readFileText(event.target.files[0])) as string;
      this.setState({ textArea: this.state.textArea + text });
    } catch (e) {
      console.log(e);
    }
  };

  handleTextAreaChange = event => {
    event.preventDefault();
    this.setState({ textArea: event.target.value });
  };

  readFileText = file => {
    let fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException("Problem parsing input file"));
      };
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsText(file);
    });
  };

  render() {
    return (
      <>
        <h4>Add New Display</h4>
        <Form onSubmit={this.handleFormSubmitAsync}>
          <Form.Group>
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.displayName}
              onChange={this.handleDisplayInputChange}
              placeholder="Enter display name"
              required
            />
          </Form.Group>
          <ParameterTextArea
            textArea={this.state.textArea}
            handleTextAreaChange={this.handleTextAreaChange}
            handleFileChange={this.handleFileChange}
            fileName={this.state.fileName}
          />
          <Button variant="primary" type="submit">
            Add Item
          </Button>
        </Form>
      </>
    );
  }
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    performanceTesterActions: bindActionCreators(
      performanceTesterActions,
      dispatch
    )
  };
}

export default connect<null, IDispatchProps>(
  null,
  mapDispatchToProps
)(AddInputs);
