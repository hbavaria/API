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
class SelectAllButton extends React.Component<Props> {
  handleClick = async () => {
    let { performanceTableItems, performanceTesterActions } = this.props;
    for (var i = 0; i < performanceTableItems.length; i++) {
      if (!performanceTableItems[i].isSelected) {
        performanceTesterActions.updatePerformanceTesterTableItemIsSelected(
          true,
          i
        );
      }
    }
  };

  render() {
    return (
      <Button
        variant="outline-secondary"
        onClick={this.handleClick}
        disabled={this.props.isPerformanceTestRunning}
      >
        Select All
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
)(SelectAllButton);
