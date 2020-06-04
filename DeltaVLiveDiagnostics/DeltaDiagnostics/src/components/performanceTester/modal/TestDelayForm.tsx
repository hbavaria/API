import React from "react";
import { Form } from "react-bootstrap";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  testDelay: number;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

interface IDelayFormState {
  testDelay: string;
}

type Props = IStateProps & IDispatchProps;
class TestDelayForm extends React.Component<Props, IDelayFormState> {
  state = {
    testDelay: ""
  };

  handleFormSubmitAsync = async event => {
    event.preventDefault();
    if (event.target.value !== "") {
      this.props.performanceTesterActions.updateTestDelay(
        Number.parseInt(this.state.testDelay)
      );
    }
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ testDelay: event.target.value });
  };

  renderTestDelayForm() {
    return (
      <>
        <h4 style={{ paddingTop: "1.5rem" }}>Test Delay</h4>
        <Form onSubmit={this.handleFormSubmitAsync}>
          <Form.Label>Test Delay: {this.props.testDelay} ms</Form.Label>
          <Form.Text className="text-muted">
            Specify the delay (in ms) to wait between tests (default: 0)
          </Form.Text>
          <Form.Control
            type="text"
            title="Test delay must be a number"
            pattern="\d*" //regex for a number
            value={this.state.testDelay}
            onChange={this.handleInputChange}
            onBlur={this.handleFormSubmitAsync}
            placeholder="Enter test delay (in ms)"
            required
          />
        </Form>
      </>
    );
  }

  render() {
    return <>{this.renderTestDelayForm()}</>;
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
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
)(TestDelayForm);
