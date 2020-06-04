import React from "react";
import { Button } from "react-bootstrap";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { IApplicationState } from "../../../store";

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

interface IStateProps {
  performanceTableItems: IDisplayTestItem[];
  isPerformanceTestRunning: boolean;
}

type Props = IDispatchProps & IStateProps;
class RemoveSelectedButton extends React.Component<Props> {
  handleClick = async () => {
    for (var i = 0; i < this.props.performanceTableItems.length; i++) {
      if (this.props.performanceTableItems[i].isSelected) {
        this.props.performanceTesterActions.deletePerformanceTesterTableItem(
          this.props.performanceTableItems[i].itemId
        );
      }
    }
  };

  isAtLeastOneItemSelected() {
    for (var i = 0; i < this.props.performanceTableItems.length; i++) {
      if (this.props.performanceTableItems[i].isSelected) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <Button
        variant="outline-danger"
        onClick={this.handleClick}
        disabled={
          !this.isAtLeastOneItemSelected() ||
          this.props.isPerformanceTestRunning
        }
      >
        Remove Selected
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

export function mapDispatchToProps(dispatch: Dispatch) {
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
)(RemoveSelectedButton);
