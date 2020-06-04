import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import * as writeUpdateActions from "../../../store/writeUpdates/actions";
import { Dispatch, bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import { IWriteTestTracker } from "../../../store/writeUpdates/types";

interface IStateProps {
  writeUpdates?: INewWriteUpdateTableItem[];
  testTracker?: IWriteTestTracker;
}

interface IDispatchProps {
  writeUpdateActions: typeof writeUpdateActions;
}

export interface INewWriteUpdateTableItem {
  path: string;
  valueWritten: any;
  metaData: string;
  success: boolean;
  message: any;
}

type Props = IStateProps & IDispatchProps;

class WriteResults extends React.Component<Props> {
  rowClassNameFormat = row => {
    let rowClass: string = "";

    if (row.success === false) {
      rowClass = "bg-danger";
    } else if (row.success) {
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

  render() {
    return (
      <>
        <Button onClick={this.props.writeUpdateActions.deleteAllWriteData}>
          Clear Data
        </Button>
        <h2 className="text-center">Write Updates</h2>
        {this.getElapsedTime()}
        <BootstrapTable
          data={this.props.writeUpdates}
          height="auto"
          scrollTop={"Bottom"}
          version="4"
          trClassName={this.rowClassNameFormat}
        >
          <TableHeaderColumn
            dataField="path"
            filter={{ type: "TextFilter" }}
            isKey
          >
            Path
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="valueWritten"
            filter={{ type: "TextFilter" }}
          >
            Value to Write
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="metaData"
            filter={{ type: "TextFilter" }}
          >
            Time
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="success"
            filter={{ type: "TextFilter" }}
          >
            Success
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="message"
            filter={{ type: "TextFilter" }}
          >
            Error Message
          </TableHeaderColumn>
        </BootstrapTable>
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    writeUpdates: state.writeUpdates.writeUpdates,
    testTracker: state.writeUpdates.testTracker
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    writeUpdateActions: bindActionCreators(writeUpdateActions, dispatch)
  };
}
export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WriteResults);
