import React from "react";
import { Button } from "react-bootstrap";
import PerformanceTesterModal from "../modal/PerformanceTesterModal";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";

interface IModifyButtonState {
  isModalShowing: boolean;
}

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  isPerformanceTestRunning?: boolean;
}

class ModifyButton extends React.Component<IStateProps, IModifyButtonState> {
  state = {
    isModalShowing: false
  };

  setModalShow(isModalShowing: boolean) {
    this.setState({ isModalShowing: isModalShowing });
  }

  isAtLeastOneItemInTable() {
    return this.props.performanceTableItems.length > 0;
  }

  render() {
    return (
      <>
        <Button
          variant="outline-secondary"
          onClick={() => this.setModalShow(true)}
          disabled={
            !this.isAtLeastOneItemInTable() ||
            this.props.isPerformanceTestRunning
          }
        >
          Modify Test
        </Button>
        <PerformanceTesterModal
          show={this.state.isModalShowing}
          onHide={() => this.setModalShow(false)}
          isModifyModal={true}
        />
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    performanceTableItems: state.performanceTester.performanceTableItems,
    isPerformanceTestRunning: state.performanceTester.isPerformanceTestRunning
  };
}

export default connect<IStateProps, null>(mapStateToProps, null)(ModifyButton);
