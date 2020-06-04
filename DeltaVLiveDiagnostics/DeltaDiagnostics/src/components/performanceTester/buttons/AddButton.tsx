import React from "react";
import { Button } from "react-bootstrap";
import PerformanceTesterModal from "../modal/PerformanceTesterModal";
import { IApplicationState } from "../../../store";
import { connect } from "react-redux";

interface IStateProps {
  isPerformanceTestRunning?: boolean;
}

class AddButton extends React.Component<IStateProps> {
  state = {
    modalIsShowing: false
  };

  setModalShow(modalIsShowing: boolean) {
    this.setState({ modalIsShowing: modalIsShowing });
  }

  render() {
    return (
      <>
        <Button
          variant="outline-primary"
          onClick={() => this.setModalShow(true)}
          disabled={this.props.isPerformanceTestRunning}
        >
          Add Test
        </Button>
        <PerformanceTesterModal
          show={this.state.modalIsShowing}
          onHide={() => this.setModalShow(false)}
          isAddModal={true}
        />
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    isPerformanceTestRunning: state.performanceTester.isPerformanceTestRunning
  };
}
export default connect<IStateProps, null>(mapStateToProps, null)(AddButton);
