import React from "react";
import { Table, Column, AutoSizer, SortDirection } from "react-virtualized";
import { IApplicationState } from "../../store";
import { connect } from "react-redux";
import { API_GET_PERFORMANCE_DATA_ENDPOINT } from "../../appConstants";
interface IStateProps {
  performanceTestId?: string;
}

interface IState {
  isDataFetched: boolean;
  days: string;
  sortedData: any;
  sortBy: string;
  sortDirection: any;
}

class PerformanceTable extends React.Component<IStateProps, IState> {
  state = {
    isDataFetched: true,
    days: "365",
    sortedData: [],
    sortBy: "startDate",
    sortDirection: SortDirection.ASC
  };
  async componentDidMount() {
    if (this.props.performanceTestId) {
      await this.fetchData();
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.performanceTestId !== this.props.performanceTestId) {
      await this.fetchData();
    }
  }

  fetchData = async () => {
    let perfResults = await fetch(
      API_GET_PERFORMANCE_DATA_ENDPOINT(
        this.props.performanceTestId,
        this.state.days
      )
    );
    let result = await perfResults.json();
    await this.setState({
      sortedData: result,
      isDataFetched: true
    });
  };

  sort = ({ sortBy, sortDirection }) => {
    let data = this.state.sortedData;
    let sortedData;
    if (sortBy === "startDate") {
      sortedData = data.sort(
        (a, b) => new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
      );
    } else {
      sortedData = data.sort((a, b) => a[sortBy] - b[sortBy]);
    }
    if (sortDirection === SortDirection.DESC) {
      data.reverse();
    }
    this.setState({ sortBy, sortDirection, sortedData });
  };

  render() {
    if (this.state.isDataFetched) {
      return (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              sortBy={this.state.sortBy}
              sortDirection={this.state.sortDirection}
              sort={this.sort}
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.state.sortedData.length}
              rowGetter={({ index }) => this.state.sortedData[index]}
              overscanRowCount={10}
            >
              <Column
                label="Date"
                dataKey="startDate"
                width={200}
                flexGrow={1}
                flexShrink={1}
                cellRenderer={({ cellData }) => {
                  return cellData.split("T")[0];
                }}
              />
              <Column
                label="Avg Get JSON Elapsed"
                dataKey="avgGetJsonElapsed"
                cellRenderer={({ cellData }) => {
                  return cellData.toFixed(3);
                }}
                width={200}
                flexGrow={1}
                flexShrink={1}
              />
              <Column
                label="Avg Parse JSON Elapsed"
                dataKey="avgParseJsonElapsed"
                cellRenderer={({ cellData }) => {
                  return cellData.toFixed(3);
                }}
                width={200}
                flexGrow={1}
                flexShrink={1}
              />
              <Column
                label="Avg Subscribe Elapsed"
                dataKey="avgSubscribeElapsed"
                cellRenderer={({ cellData }) => {
                  return cellData.toFixed(3);
                }}
                width={200}
                flexGrow={1}
                flexShrink={1}
              />
            </Table>
          )}
        </AutoSizer>
      );
    } else {
      return <p>none</p>;
    }
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  performanceTestId: state.performanceResults.performanceTestId
});

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(PerformanceTable);
