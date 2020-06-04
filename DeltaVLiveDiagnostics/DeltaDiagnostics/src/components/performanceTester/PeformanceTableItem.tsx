import React from "react";
import { IoIosCheckboxOutline, IoIosSquareOutline } from "react-icons/io";
import * as performanceTesterActions from "../../store/performanceTester/actions";
import * as responseTimeActions from "../../store/responseTimes/actions";
import * as displayActions from "../../store/display/actions";
import * as displayUtils from "../../utils/display/updateDisplayDetailsUtils";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import ParameterDefinitionDto from "../../utils/web-sockets/interfaces/iParameterDefinitionDto";
import { IApplicationState } from "../../store";
import { Link } from "react-router-dom";
import { DASHBOARD_PAGE_LINK } from "../../appConstants";
import { Spinner, Badge, Button } from "react-bootstrap";

export interface IPerformanceTableItemProps {
  isItemTesting: boolean;
  itemId: string;
  index: number;
  displayName: string;
  parameterCount?: number;
  jsonSize?: string;
  getJsonElapsed?: number;
  parseJsonElapsed?: number;
  animationScriptSize?: string;
  eventScriptSize?: number;
  subscribeElapsed?: number;
  lowSubscribeElapsed?: number;
  highSubscribeElapsed?: number;
  isSelected: boolean;
  hasParamError?: boolean;
  hasDisplayNameError?: boolean;
  parameterDtos?: ParameterDefinitionDto[];
  setModalShow: any;
  setDisplayName: any;
  setDisplayTestId: any;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

interface IStateProps {
  isPerformanceTestRunning: boolean;
  instanceId: string;
}

type Props = IStateProps & IDispatchProps & IPerformanceTableItemProps;

class PerformanceTableItem extends React.Component<Props> {
  handleCheckboxClick = event => {
    event.preventDefault();
    this.props.performanceTesterActions.updatePerformanceTesterTableItemIsSelected(
      !this.props.isSelected,
      this.props.index
    );
  };

  renderCheckbox() {
    if (this.props.isSelected && !this.props.isPerformanceTestRunning) {
      return (
        <IoIosCheckboxOutline
          fontSize="42px"
          onClick={this.handleCheckboxClick}
        />
      );
    } else {
      return (
        <IoIosSquareOutline
          fontSize="42px"
          onClick={this.handleCheckboxClick}
        />
      );
    }
  }

  renderCheckBoxOrTestingArrow() {
    if (this.props.isPerformanceTestRunning && this.props.isItemTesting) {
      return <Spinner animation="border" variant="success" />;
    } else if (
      this.props.isPerformanceTestRunning &&
      !this.props.isItemTesting
    ) {
      return "";
    } else {
      return this.renderCheckbox();
    }
  }

  handleNavClick = () => {
    try {
      displayUtils.updateDetails(this.props.displayName, this.props);
    } catch (error) {
      console.log(error);
    }
  };

  renderDisplayName() {
    if (this.props.isPerformanceTestRunning) {
      return <td>{this.props.displayName}</td>;
    } else if (this.props.hasDisplayNameError) {
      return (
        <td>
          <Badge variant="danger">Invalid</Badge> {this.props.displayName}
        </td>
      );
    } else {
      return (
        <td>
          <Link to={DASHBOARD_PAGE_LINK} onClick={this.handleNavClick}>
            {this.props.displayName}
          </Link>
        </td>
      );
    }
  }

  renderErrorIndicator() {
    if (this.props.hasParamError) {
      return (
        <Button
          size="sm"
          variant="danger"
          onClick={() => this.initErrorModal()}
        >
          <Badge variant="danger">Error</Badge>
        </Button>
      );
    }
    return "";
  }

  initErrorModal() {
    this.props.setDisplayName(this.props.displayName);
    this.props.setDisplayTestId(this.props.itemId);
    this.props.setModalShow(true);
  }

  render() {
    return (
      <tr>
        <td>{this.renderCheckBoxOrTestingArrow()}</td>
        {this.renderDisplayName()}
        <td>{this.props.parameterCount}</td>
        <td>{this.props.jsonSize}</td>
        <td>{`${this.props.getJsonElapsed.toFixed(3)} ms`}</td>
        <td>{`${this.props.parseJsonElapsed.toFixed(3)} ms`}</td>
        <td>{this.props.animationScriptSize}</td>
        <td>{this.props.eventScriptSize}</td>
        <td style={{ whiteSpace: "pre" }}>
          {`avg: ${this.props.subscribeElapsed.toFixed(3)} ms \n`}
          {`low: ${this.props.lowSubscribeElapsed.toFixed(3)} ms \n`}
          {`high: ${this.props.highSubscribeElapsed.toFixed(3)} ms \n`}
          {this.renderErrorIndicator()}
        </td>
      </tr>
    );
  }
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    performanceTesterActions: bindActionCreators(
      performanceTesterActions,
      dispatch
    ),
    displayActions: bindActionCreators(displayActions, dispatch),
    responseTimeActions: bindActionCreators(responseTimeActions, dispatch)
  };
}

function mapStateToProps(state: IApplicationState) {
  return {
    isPerformanceTestRunning: state.performanceTester.isPerformanceTestRunning,
    instanceId: state.instanceId.instanceId
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceTableItem);
