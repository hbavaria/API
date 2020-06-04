import React from "react";
import { Form } from "react-bootstrap";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  numIterations: number;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

interface IIterationFormState {
  numIterations: string;
}

type Props = IStateProps & IDispatchProps;
class IterationForm extends React.Component<Props, IIterationFormState> {
  state = {
    numIterations: ""
  };

  handleFormSubmitAsync = async event => {
    event.preventDefault();
    if (event.target.value !== "") {
      this.props.performanceTesterActions.updateNumIterations(
        Number.parseInt(this.state.numIterations)
      );
    }
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ numIterations: event.target.value });
  };

  renderIterationForm() {
    return (
      <>
        <h4>Number of Iterations</h4>
        <Form onSubmit={this.handleFormSubmitAsync}>
          <Form.Label>Test Iterations: {this.props.numIterations}</Form.Label>
          <Form.Text className="text-muted">
            Specify the number of test iterations for each display, the results
            of which will be averaged (default: 1)
          </Form.Text>
          <Form.Control
            type="text"
            title="Iterations must be an integer"
            pattern="\d*" // regex for a number
            value={this.state.numIterations}
            onChange={this.handleInputChange}
            onBlur={this.handleFormSubmitAsync}
            placeholder="Enter number of times to test each display"
            required
          />
        </Form>
      </>
    );
  }

  render() {
    return <>{this.renderIterationForm()}</>;
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
    numIterations: state.performanceTester.numIterations
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
)(IterationForm);
