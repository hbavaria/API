import React from "react";
import { Button } from "react-bootstrap";
import { IDisplayTestItem } from "../../../store/performanceTester/types";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as performanceTesterActions from "../../../store/performanceTester/actions";
import { bindActionCreators, Dispatch } from "redux";
import PerformanceTesterModal from "../modal/PerformanceTesterModal";

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  isPerformanceTestRunning?: boolean;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

type Props = IStateProps & IDispatchProps;
class ExportButton extends React.Component<Props> {
  state = {
    modalIsShowing: false
  };

  setModalShow(modalIsShowing: boolean) {
    this.setState({ modalIsShowing: modalIsShowing });
  }

  isAtLeastOneItemInTable() {
    return this.props.performanceTableItems.length > 0;
  }

  isPerformanceTestRunning() {
    return this.props.isPerformanceTestRunning;
  }

  isAtLeastOneItemSelected() {
    for (var i = 0; i < this.props.performanceTableItems.length; i++) {
      if (this.props.performanceTableItems[i].isSelected) {
        return true;
      }
    }
    return false;
  }

  handleClick = async event => {
    event.preventDefault();
    this.setModalShow(true);
  };

  render() {
    return (
      <>
        <Button
          variant="outline-secondary"
          onClick={this.handleClick}
          disabled={
            !this.isAtLeastOneItemSelected() || this.isPerformanceTestRunning()
          }
        >
          Export Config
        </Button>
        <PerformanceTesterModal
          show={this.state.modalIsShowing}
          onHide={() => this.setModalShow(false)}
          isSaveModal={true}
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
)(ExportButton);
