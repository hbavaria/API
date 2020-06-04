import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as writeUpdateActions from "../../../store/writeUpdates/actions";
import { Dispatch, bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import { IWriteTestTracker } from "../../../store/writeUpdates/types";
import {
  AutoSizer,
  Column,
  Table,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
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
  _tableRef: any;
  _cache = new CellMeasurerCache({
    fixedHeight: false,
    fixedWidth: true,
    defaultHeight: 50
  });

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
    console.log(cellData);
    let style = { color: "green" };
    if (!cellData) {
      style = { color: "red" };
    }
    return <div style={style}>{`${cellData}`}</div>;
  };

  pathRenderer = ({ cellData, rowData }) => {
    let style = { color: "green" };
    if (rowData.success !== true) {
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

  render() {
    this._cache.clearAll();
    return (
      <>
        <Button onClick={this.props.writeUpdateActions.deleteAllWriteData}>
          Clear Data
        </Button>
        <h2 className="text-center">Write Updates</h2>
        {this.getElapsedTime()}
        <AutoSizer>
          {({ height, width }) => (
            <Table
              ref={ref => (this._tableRef = ref)}
              width={width}
              height={height - 105}
              headerHeight={20}
              rowCount={this.props.writeUpdates.length}
              rowHeight={this._cache.rowHeight}
              gridStyle={{
                backgroundColor: "#fff"
              }}
              rowStyle={this.getRowStyle}
              rowGetter={({ index }) => this.props.writeUpdates[index]}
              overscanRowCount={10}
            >
              <Column
                label="Path"
                dataKey="path"
                width={200}
                flexGrow={1}
                flexShrink={0}
                cellRenderer={this.pathRenderer}
              />
              <Column
                label="Value"
                dataKey="valueWritten"
                width={100}
                maxWidth={200}
                flexGrow={1}
                flexShrink={0}
                height={this._cache.rowHeight}
                cellRenderer={this.dynamicHeightCellRenderer}
              />
              <Column
                label="Time"
                dataKey="metaData"
                width={100}
                flexGrow={1}
                flexShrink={0}
              />
              <Column
                label="Success"
                dataKey="success"
                width={100}
                flexGrow={1}
                flexShrink={0}
                cellRenderer={this.statusRenderer}
              />
              <Column
                label="Error"
                dataKey="message"
                width={100}
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
