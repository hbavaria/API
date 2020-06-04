import React from "react";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import * as subscriptionApi from "../../../utils/api/subscriptionApi";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import { Form, Button } from "react-bootstrap";
import ParameterTextArea from "./ParameterTextArea";
import ParameterDefinitionDto from "../../../utils/web-sockets/interfaces/iParameterDefinitionDto";
import { getSanitizedParams } from "../../../utils/userInput";

export interface idToDisplayNameMap {
  [itemId: string]: string;
}

interface IModifyInputState {
  tableItems: IDisplayTestItem[];
  idToDisplayNameMap: idToDisplayNameMap;
  selectedId: string;
  textArea: string;
  fileName: string;
}

interface IStateProps {
  performanceTableItems: IDisplayTestItem[];
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

type Props = IStateProps & IDispatchProps;

class ModifyInputs extends React.Component<Props, IModifyInputState> {
  state = {
    tableItems: [],
    idToDisplayNameMap: {},
    selectedId: "",
    textArea: "",
    fileName: ""
  };

  componentDidMount() {
    if (this.isAtLeastOneItemInTable()) {
      this.initIdToNameMap();
      this.initTextArea();
    }
  }

  initIdToNameMap() {
    let idToNameMap = {};
    this.props.performanceTableItems.map(item => {
      idToNameMap[item.itemId] = item.displayName;
    });
    this.setState({ idToDisplayNameMap: idToNameMap });
  }

  initTextArea() {
    let idOfFirstTableItem = this.props.performanceTableItems[0].itemId;
    this.setState({ selectedId: idOfFirstTableItem });
    this.setTextArea(idOfFirstTableItem);
  }

  isAtLeastOneItemInTable() {
    return this.props.performanceTableItems.length > 0;
  }

  setTextArea(performanceItemId: string) {
    let parameterPaths = this.getPerformanceItemParameterPaths(
      performanceItemId
    ).join(",");
    this.setState({ textArea: parameterPaths });
  }

  handleOptionChange = event => {
    let performanceItemId = event.target.value;
    this.setState({ selectedId: performanceItemId });

    this.setTextArea(performanceItemId);
  };

  getPerformanceItemParameterPaths(itemId: string) {
    let itemIndex = this.props.performanceTableItems.findIndex(
      item => item.itemId === itemId
    );
    let parameterDtos = this.props.performanceTableItems[itemIndex]
      .parameterDtos;
    let parameterPaths = subscriptionApi.getFullParameterPathsFromDtos(
      parameterDtos
    );
    return parameterPaths;
  }

  handleTextAreaChange = event => {
    event.preventDefault();
    this.setState({ textArea: event.target.value });
  };

  handleFormSubmitAsync = async event => {
    event.preventDefault();
    let paramDtos: ParameterDefinitionDto[] = await subscriptionApi.getParameterDefinitionDtosFromString(
      getSanitizedParams(this.state.textArea)
    );
    this.props.performanceTesterActions.updateParameterDtos(
      this.state.selectedId,
      paramDtos
    );
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

  renderModifyForm() {
    if (this.isAtLeastOneItemInTable()) {
      return (
        <Form onSubmit={this.handleFormSubmitAsync}>
          <Form.Group>
            <Form.Label>Display Names:</Form.Label>
            <Form.Control as="select" onChange={this.handleOptionChange}>
              {this.props.performanceTableItems.map(item => {
                return <option value={item.itemId}>{item.displayName}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <ParameterTextArea
            textArea={this.state.textArea}
            handleTextAreaChange={this.handleTextAreaChange}
            handleFileChange={this.handleFileChange}
            fileName={this.state.fileName}
          />
          <Button type="submit">Modify Item</Button>
        </Form>
      );
    } else {
      return (
        <p>No items found to modify. Please add an item and try again. </p>
      );
    }
  }

  render() {
    return (
      <>
        <h4>Modify Display</h4>
        {this.renderModifyForm()}
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems
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
)(ModifyInputs);

// <Form.Group>
//   <Form.Label>Display Parameters</Form.Label>
//   <Form.Text className="text-muted">
//     parameter count: {this.getParameterCount()}
//   </Form.Text>
//   <Form.Control
//     as="textarea"
//     rows="5"
//     placeholder="Enter parameters here (separated by comma)"
//     value={this.state.textArea}
//     onChange={this.handleTextAreaChange}
//   />
//   <Form.Control
//     key={Date.now()} // adding a key refreshes the form input on re-render so that a new file can be loaded. This fixes a bug where the user cannot load a second file after loading one.
//     type="file"
//     accept=".csv"
//     onChange={this.handleFileChange}
//   />
//   <Form.Text className="text-muted">{this.state.fileName}</Form.Text>
// </Form.Group>
