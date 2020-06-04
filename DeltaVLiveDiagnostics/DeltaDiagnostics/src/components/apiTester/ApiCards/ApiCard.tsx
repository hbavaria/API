import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import "../../../index.css";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as apiTesterActions from "../../../store/apiTester/actions";
import * as responseTimeActions from "../../../store/responseTimes/actions";

export interface IProps {
  apiCallFunction: (...args: any[]) => any;
  parameters?: any[];
  endpointPrefix: string;
  endpointDescription: string;
  numInputs?: number;
  inputPlaceholder?: string[];
}

export interface IDispatchProps {
  apiTesterActions: typeof apiTesterActions;
  responseTimeActions: typeof responseTimeActions;
}

type Props = IProps & IDispatchProps;

export interface IState {
  args: any[];
}

type State = IState;

class ApiCard extends React.Component<Props, State> {
  static defaultProps = {
    parameters: [],
    numInputs: 0,
    inputPlaceholder: []
  };

  state = {
    args: [""]
  };

  componentDidMount() {
    let inputArgArray = [];

    for (let i = 0; i < this.props.numInputs; i++) inputArgArray.push("");

    this.setState({ args: inputArgArray });
  }

  makeApiCallAsync = async event => {
    event.preventDefault();
    const result = await this.props.apiCallFunction(
      ...this.state.args,
      ...this.props.parameters
    );
    this.updateApiDetailsView(result);
  };

  updateApiDetailsView(result) {
    const endpoint =
      this.props.endpointPrefix +
      this.state.args
        .map(arg => {
          return arg;
        })
        .join("/");
    this.props.apiTesterActions.updateJson(result.data);
    this.props.apiTesterActions.updateEndpoint(endpoint);
    this.props.responseTimeActions.updateApiTesterResponseTime(
      result.responseTime
    );
  }

  inputs = () => {
    let inputJsx = [];

    for (let i = 0; i < this.props.numInputs; i++) {
      if (i > 0) inputJsx.push(<InputGroup.Text>/</InputGroup.Text>);
      inputJsx.push(
        <FormControl
          className="form-control"
          type="text"
          key={i}
          value={this.state.args[i]}
          onChange={event => {
            let newArgs = [...this.state.args];
            newArgs[i] = event.target.value;
            this.setState({ args: newArgs });
          }}
          placeholder={this.props.inputPlaceholder[i]}
        />
      );
    }

    return inputJsx;
  };

  render() {
    return (
      <Card border="secondary">
        <Card.Header>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                {this.props.endpointPrefix}
              </InputGroup.Text>
            </InputGroup.Prepend>
            {this.inputs()}
            <Button className="float-right" onClick={this.makeApiCallAsync}>
              GET!
            </Button>
          </InputGroup>
        </Card.Header>
        <Card.Body>{this.props.endpointDescription}</Card.Body>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    apiTesterActions: bindActionCreators(apiTesterActions, dispatch),
    responseTimeActions: bindActionCreators(responseTimeActions, dispatch)
  };
}

export default connect<null, IDispatchProps>(
  null,
  mapDispatchToProps
)(ApiCard);
