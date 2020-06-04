import React from "react";
import { IApplicationState } from "../../store";
import { connect } from "react-redux";
import { IDisplayTestItem } from "../../store/performanceTester/types";
import { Prompt } from "react-router-dom";
import ErrorModal from "./modal/ErrorModal";
import { AutoSizer, Column, Table } from "react-virtualized";
import * as performanceTesterActions from "../../store/performanceTester/actions";
import * as displayActions from "../../store/display/actions";
import * as responseTimeActions from "../../store/responseTimes/actions";
import { DASHBOARD_PAGE_LINK } from "../../appConstants";
import { Link } from "react-router-dom";
import * as displayUtils from "../../utils/display/updateDisplayDetailsUtils";
import { bindActionCreators, Dispatch } from "redux";
import { IoIosCheckboxOutline, IoIosSquareOutline } from "react-icons/io";
import { Spinner, Badge } from "react-bootstrap";

interface IPerformanceTableState {
  tests: IDisplayTestItem[];
  isModalShowing?: boolean;
  displayName: string;
  displayTestId: string;
}

interface IStateProps {
  performanceTableItems?: IDisplayTestItem[];
  isPerformanceTestRunning?: boolean;
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
  displayActions: typeof displayActions;
}

type PerfTableProps = IDispatchProps & IStateProps;

class PeformanceTable extends React.Component<
  PerfTableProps,
  IPerformanceTableState
> {
  state = {
    tests: [],
    isModalShowing: false,
    displayName: "",
    displayTestId: ""
  };
  componentDidMount() {
    this.setState({ tests: this.props.performanceTableItems });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.performanceTableItems !== this.props.performanceTableItems) {
      this.setState({
        tests: this.props.performanceTableItems
      });
    }
  }

  setModalShow = (isModalShowing: boolean) => {
    this.setState({ isModalShowing: isModalShowing });
  };

  renderDisplayName = ({ cellData, rowData }) => {
    if (rowData.hasDisplayNameError) {
      return cellData;
    } else {
      return (
        <Link
          to={DASHBOARD_PAGE_LINK}
          onClick={() => displayUtils.updateDetails(cellData, this.props)}
        >
          {cellData}
        </Link>
      );
    }
  };

  renderCheckBox = ({ cellData, rowIndex }) => {
    let isSelected = cellData;
    if (isSelected) {
      return (
        <IoIosCheckboxOutline
          fontSize="32px"
          onClick={event =>
            this.handleCheckboxClick(event, isSelected, rowIndex)
          }
        />
      );
    } else {
      return (
        <IoIosSquareOutline
          fontSize="32px"
          onClick={event =>
            this.handleCheckboxClick(event, isSelected, rowIndex)
          }
        />
      );
    }
  };

  renderSpinner = ({ cellData }) => {
    let isItemTesting = cellData;
    if (isItemTesting && this.props.isPerformanceTestRunning) {
      return <Spinner animation="border" size="sm" variant="success" />;
    } else {
      return "";
    }
  };

  renderDataPoint = ({ cellData }) => {
    return cellData.toFixed(3);
  };

  renderParamCount = ({ cellData }) => {
    return cellData.length;
  };

  renderError = ({ rowData }) => {
    let hasDisplayNameError = rowData.hasDisplayNameError;
    let hasParamError = rowData.hasParamError;
    if (hasDisplayNameError || hasParamError) {
      return (
        <Badge
          style={{ cursor: "pointer" }}
          onClick={() =>
            this.initErrorModal(rowData.displayName, rowData.itemId)
          }
          variant="danger"
        >
          !
        </Badge>
      );
    }
    return "";
  };
  handleCheckboxClick = (event, isSelected, index) => {
    event.preventDefault();
    this.props.performanceTesterActions.updatePerformanceTesterTableItemIsSelected(
      !isSelected,
      index
    );
  };

  initErrorModal = (displayName, itemId) => {
    this.setState({ displayName: displayName, displayTestId: itemId });
    this.setModalShow(true);
  };

  render() {
    return (
      <div className="performanceTable">
        <AutoSizer>
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.props.performanceTableItems.length}
              rowGetter={({ index }) => this.props.performanceTableItems[index]}
              overscanRowCount={10}
            >
              <Column
                label=""
                dataKey="isItemTesting"
                cellRenderer={this.renderSpinner}
                width={25}
                flexGrow={0}
                flexShrink={0}
              />
              <Column
                label=""
                dataKey="isSelected"
                cellRenderer={this.renderCheckBox}
                width={32}
                flexGrow={0}
                flexShrink={0}
              />
              <Column
                label=""
                dataKey=""
                cellRenderer={this.renderError}
                width={18}
                flexGrow={0}
                flexShrink={0}
              />
              <Column
                label="Name"
                dataKey="displayName"
                cellRenderer={this.renderDisplayName}
                width={100}
                flexGrow={1}
                flexShrink={1}
              />
              <Column
                label="#Params"
                dataKey="parameterDtos"
                cellRenderer={this.renderParamCount}
                width={50}
                flexGrow={1}
                flexShrink={1}
              />
              <Column
                label="Get JSON (ms)"
                dataKey="getJsonElapsed"
                width={100}
                flexGrow={1}
                flexShrink={1}
                cellRenderer={this.renderDataPoint}
              />
              <Column
                label="Parse JSON (ms)"
                dataKey="parseJsonElapsed"
                width={100}
                flexGrow={1}
                flexShrink={1}
                cellRenderer={this.renderDataPoint}
              />
              <Column
                label="Animation Script"
                dataKey="animationScriptSize"
                width={100}
                flexGrow={1}
                flexShrink={1}
              />
              <Column
                label="Event Script"
                dataKey="eventScriptSize"
                width={100}
                flexGrow={1}
                flexShrink={1}
              />
              <Column
                label="Subscribe Avg (ms)"
                dataKey="subscribeElapsed"
                width={100}
                flexGrow={1}
                flexShrink={1}
                cellRenderer={this.renderDataPoint}
              />
              <Column
                label="Subscribe Low (ms)"
                dataKey="lowSubscribeElapsed"
                width={100}
                flexGrow={1}
                flexShrink={1}
                cellRenderer={this.renderDataPoint}
              />
              <Column
                label="Subscribe High (ms)"
                dataKey="highSubscribeElapsed"
                width={100}
                flexGrow={1}
                flexShrink={1}
                cellRenderer={this.renderDataPoint}
              />
            </Table>
          )}
        </AutoSizer>
        <Prompt
          when={this.props.isPerformanceTestRunning}
          message="Performance test is still running. Are you sure you want to leave? Test will be cancelled."
        />
        <ErrorModal
          show={this.state.isModalShowing}
          onHide={() => this.setModalShow(false)}
          displayName={this.state.displayName}
          displayTestId={this.state.displayTestId}
        />
      </div>
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
    ),
    displayActions: bindActionCreators(displayActions, dispatch),
    responseTimeActions: bindActionCreators(responseTimeActions, dispatch)
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PeformanceTable);
