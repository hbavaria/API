import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import * as subscriptionUpdateActions from "../../../store/subscriptionUpdates/actions";
import { Dispatch, bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import { IRuntimeDataPoint } from "../../../utils/web-sockets/interfaces/iRuntimeDataPoint";
import { IMetaData } from "../../../utils/web-sockets/interfaces/iMetaData";
import { ISubscribeTestTracker } from "../../../store/subscriptionUpdates/types";

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

  rowClassNameFormat = row => {
    let rowClass: string = "";

    if (row.parameterError !== null || row.parameterStatus !== 0) {
      rowClass = "bg-danger";
    } else if (row.parameterValue !== null) {
      rowClass = "bg-success";
    } else {
      rowClass = "bg-light";
    }

    return rowClass;
  };

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

  render(): JSX.Element {
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
        <BootstrapTable
          data={this.getSubscriptionTableItems(this.props.subscriptionUpdates)}
          height="auto"
          scrollTop={"Bottom"}
          version="4"
          trClassName={this.rowClassNameFormat}
        >
          <TableHeaderColumn
            dataField="parameterPath"
            filter={{ type: "TextFilter" }}
            isKey
          >
            Path
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="parameterValue"
            filter={{ type: "TextFilter" }}
          >
            Value
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="parameterMetaData"
            filter={{ type: "TextFilter" }}
          >
            Time
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="parameterError"
            filter={{ type: "TextFilter" }}
          >
            Error
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="parameterStatus"
            filter={{ type: "TextFilter" }}
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="parameterType"
            filter={{ type: "TextFilter" }}
          >
            Type
          </TableHeaderColumn>
        </BootstrapTable>
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
