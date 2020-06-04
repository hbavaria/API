import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as subscriptionUpdateActions from "../../../store/subscriptionUpdates/actions";
import { Dispatch, bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import { IRuntimeDataPoint } from "../../../utils/web-sockets/interfaces/iRuntimeDataPoint";
import { IMetaData } from "../../../utils/web-sockets/interfaces/iMetaData";
import { ISubscribeTestTracker } from "../../../store/subscriptionUpdates/types";
import {
  AutoSizer,
  Column,
  Table,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";

interface IStateProps {
  subscriptionUpdates?: {};
  testTracker?: ISubscribeTestTracker;
}

interface IDispatchProps {
  subscriptionUpdateActions: typeof subscriptionUpdateActions;
}

interface ISubscriptionUpdateTableItem {
  parameterPath: string;
  parameterValue: any;
  parameterMetaData: string;
  parameterError: any;
  parameterStatus: any;
  parameterType: any;
}

type Props = IStateProps & IDispatchProps;

class SubscriptionResults extends React.Component<Props> {
  _tableRef: any;
  _cache = new CellMeasurerCache({
    fixedHeight: false,
    fixedWidth: true,
    defaultHeight: 50
  });
  /**
   * Given an array of subscriptionUpdates, for each subscriptionUpdate in the array,
   * creates a new table item and pushes to new array. We need to have the data in a certain format
   * so that our table can display it.
   * @param subscriptionUpdates
   */
  getSubscriptionTableItems(
    subscriptionUpdates
  ): ISubscriptionUpdateTableItem[] {
    let tableItems = [];
    let metaData = {
      requestSentTimeStamp: this.props.testTracker.startTime,
      responseReceivedTimeStamp: 0,
      roundTripTime: 0
    };

    for (let key in subscriptionUpdates) {
      let parameterData = subscriptionUpdates[key];
      let parameterPath = key;
      metaData.responseReceivedTimeStamp = parameterData.timestamp;
      metaData.roundTripTime =
        metaData.responseReceivedTimeStamp - metaData.requestSentTimeStamp;
      let tableItem = this.getSubscriptionTableItem(
        parameterData,
        parameterPath,
        metaData
      );
      tableItems.push(tableItem);
    }
    return tableItems;
  }
  /**
   * Helper function for creating subscriptionUpdate table items
   * @param parameterData
   * @param parameterPath
   */
  getSubscriptionTableItem(
    parameterData: IRuntimeDataPoint,
    parameterPath: string,
    metaData: IMetaData
  ): ISubscriptionUpdateTableItem {
    let subscriptionTableItem: ISubscriptionUpdateTableItem = {
      parameterPath: parameterPath,
      parameterValue: parameterData.value,
      parameterMetaData:
        metaData.responseReceivedTimeStamp === 0
          ? ""
          : `round trip: ${metaData.roundTripTime} ms`,
      parameterError: parameterData.error,
      parameterStatus: parameterData.status,
      parameterType: parameterData.type
    };
    return subscriptionTableItem;
  }

  getElapsedTime(): JSX.Element {
    let elapsedTimeMessage: string = "Elapsed Time: ";

    if (
      this.props.testTracker === undefined ||
      !this.props.testTracker.testIsDone
    ) {
      elapsedTimeMessage += "N/A";
    } else {
      elapsedTimeMessage +=
        this.props.testTracker.endTime -
        this.props.testTracker.startTime +
        "ms";
    }

    return <p>{elapsedTimeMessage}</p>;
  }

  dynamicHeightCellRenderer = ({
    columnIndex,
    key,
    parent,
    rowIndex,
    cellData
  }) => {
    let cell = (
      <CellMeasurer
        cache={this._cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word"
          }}
        >
          {cellData}
        </div>
      </CellMeasurer>
    );
    return cell;
  };

  statusRenderer = ({ cellData }) => {
    let style = { color: "green" };
    if (cellData !== 0) {
      style = { color: "red" };
    }
    return <div style={style}>{cellData}</div>;
  };

  pathRenderer = ({ cellData, rowData }) => {
    let style = { color: "green" };
    if (rowData.parameterStatus !== 0) {
      style = { color: "red" };
    }
    return <div style={style}>{cellData}</div>;
  };

  getRowStyle = ({ index }) => {
    if (index !== -1) {
      return { border: "1px solid #dadada" };
    }
    return {};
  };

  render(): JSX.Element {
    let subscriptionData = this.getSubscriptionTableItems(
      this.props.subscriptionUpdates
    );
    this._cache.clearAll();
    return (
      <>
        <Button
          onClick={
            this.props.subscriptionUpdateActions.deleteAllSubscriptionData
          }
        >
          Clear Data
        </Button>
        <h2 className="text-center">Subscription Updates</h2>
        {this.getElapsedTime()}
        <AutoSizer>
          {({ height, width }) => (
            <Table
              ref={ref => (this._tableRef = ref)}
              width={width}
              height={height - 105}
              headerHeight={20}
              rowCount={subscriptionData.length}
              rowHeight={this._cache.rowHeight}
              gridStyle={{
                backgroundColor: "#fff"
              }}
              rowStyle={this.getRowStyle}
              rowGetter={({ index }) => subscriptionData[index]}
              overscanRowCount={10}
            >
              <Column
                label="Path"
                dataKey="parameterPath"
                width={200}
                flexGrow={1}
                flexShrink={0}
                cellRenderer={this.pathRenderer}
              />
              <Column
                label="Value"
                dataKey="parameterValue"
                width={100}
                maxWidth={200}
                flexGrow={1}
                flexShrink={0}
                height={this._cache.rowHeight + 50}
                cellRenderer={this.dynamicHeightCellRenderer}
              />
              <Column
                label="Time"
                dataKey="parameterMetaData"
                width={100}
                flexGrow={1}
                flexShrink={0}
              />
              <Column
                label="Type"
                dataKey="parameterType"
                width={100}
                flexGrow={1}
                flexShrink={0}
                cellRenderer={this.dynamicHeightCellRenderer}
              />
              <Column
                label="Status"
                dataKey="parameterStatus"
                width={100}
                flexGrow={1}
                flexShrink={0}
                cellRenderer={this.statusRenderer}
              />
              <Column
                label="Error"
                dataKey="parameterError"
                width={50}
                flexGrow={1}
                flexShrink={0}
                cellRenderer={this.dynamicHeightCellRenderer}
              />
            </Table>
          )}
        </AutoSizer>
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    subscriptionUpdates: state.subscriptionUpdates.subscriptionUpdates,
    testTracker: state.subscriptionUpdates.testTracker
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    subscriptionUpdateActions: bindActionCreators(
      subscriptionUpdateActions,
      dispatch
    )
  };
}
export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionResults);
