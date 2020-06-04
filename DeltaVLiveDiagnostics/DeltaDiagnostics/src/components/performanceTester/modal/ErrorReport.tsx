import React from "react";
import {
  IDisplayTestItem,
  IParamError
} from "../../../store/performanceTester/types";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import Guid from "../../../utils/web-sockets/utility/guid";

interface IErrorReportstate {
  erroredParameters: string[];
  totalErrors: number;
  isValidDisplay: boolean;
}

interface ErrorProps {
  displayName: string;
  displayTestId: string;
}

interface IStateProps {
  performanceTableItems: IDisplayTestItem[];
  errors: IParamError[];
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

type Props = IStateProps & IDispatchProps & ErrorProps;

class ErrorReport extends React.Component<Props, IErrorReportstate> {
  state = {
    erroredParameters: [],
    totalErrors: 0,
    isValidDisplay: true
  };

  async componentDidMount() {
    await this.getErroredParameters();
  }

  getParameterErrorsForTestId() {
    let errorParams = [];
    for (var i = 0; i < this.props.errors.length; i++) {
      if (this.props.errors[i].testId === this.props.displayTestId) {
        errorParams.push(this.props.errors[i]);
      }
    }
    return errorParams;
  }

  async getErroredParameters() {
    let display = await this.props.performanceTableItems.find(display => {
      return display.itemId === this.props.displayTestId;
    });
    if (display) {
      let paramErrors = this.getParameterErrorsForTestId();
      this.setState({
        totalErrors: paramErrors.length,
        erroredParameters: paramErrors,
        isValidDisplay: !display.hasDisplayNameError
      });
    }
  }

  renderDisplayNameIsValid() {
    if (!this.state.isValidDisplay) {
      return <p>Display name is invalid</p>;
    } else {
      return "";
    }
  }

  render() {
    return (
      <>
        {this.renderDisplayNameIsValid()}
        <p>
          {`Showing ${this.state.erroredParameters.length} out of ${this.state.totalErrors}
          errored parameters.`}
        </p>
        {this.state.erroredParameters.map(param => {
          return <p key={Guid.newGuid()}>{`${param.errorMessage}`}</p>;
        })}
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
    errors: state.performanceTester.paramErrors
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
)(ErrorReport);
