import React from "react";
import { Form } from "react-bootstrap";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  isPerformanceTestRunning?: boolean;
  iterationDelay: number;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

interface IDelayFormState {
  iterationDelay: string;
}

type Props = IStateProps & IDispatchProps;
class IterationForm extends React.Component<Props, IDelayFormState> {
  state = {
    iterationDelay: ""
  };
  isPerformanceTestRunning() {
    return this.props.isPerformanceTestRunning;
  }

  handleFormSubmitAsync = async event => {
    event.preventDefault();
    if (event.target.value !== "") {
      this.props.performanceTesterActions.updateIterationDelay(
        Number.parseInt(this.state.iterationDelay)
      );
    }
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ iterationDelay: event.target.value });
  };

  renderIterationDelayForm() {
    return (
      <>
        <h4 style={{ paddingTop: "1.5rem" }}>Iteration Delay</h4>
        <Form onSubmit={this.handleFormSubmitAsync}>
          <Form.Label>
            Iteration Delay: {this.props.iterationDelay} ms
          </Form.Label>
          <Form.Text className="text-muted">
            Specify the delay (in ms) to wait between iterations (default: 0)
          </Form.Text>
          <Form.Control
            type="text"
            title="Iteration delay must be a number"
            pattern="\d*" //regex for a number
            value={this.state.iterationDelay}
            onChange={this.handleInputChange}
            onBlur={this.handleFormSubmitAsync}
            placeholder="Enter iteration delay (in ms)"
            required
          />
        </Form>
      </>
    );
  }

  render() {
    return <>{this.renderIterationDelayForm()}</>;
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
    isPerformanceTestRunning: state.performanceTester.isPerformanceTestRunning,
    iterationDelay: state.performanceTester.iterationDelay
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
