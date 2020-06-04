import React from "react";
import { IApplicationState } from "../../../store";
import { IoIosSettings } from "react-icons/io";
import { connect } from "react-redux";
import PerformanceTesterModal from "../modal/PerformanceTesterModal";

interface IStateProps {
  isPerformanceTestRunning?: boolean;
}

interface ISaveButtonState {
  isModalShowing: boolean;
}

class SettingsButton extends React.Component<IStateProps, ISaveButtonState> {
  state = {
    isModalShowing: false
  };

  setModalShow(isModalShowing: boolean) {
    this.setState({ isModalShowing: isModalShowing });
  }

  renderSettingsButton() {
    if (!this.props.isPerformanceTestRunning) {
      return (
        <IoIosSettings
          style={{ cursor: "hand" }}
          fontSize="32px"
          onClick={() => this.setModalShow(true)}
        />
      );
    } else {
      return <IoIosSettings fontSize="32px" />;
    }
  }

  render() {
    return (
      <>
        {this.renderSettingsButton()}
        <PerformanceTesterModal
          show={this.state.isModalShowing}
          onHide={() => this.setModalShow(false)}
          isSettingsModal={true}
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

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(SettingsButton);
