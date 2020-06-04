import React from "react";
import { IApplicationState } from "../../store";
import { connect } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { API_GET_PERFORMANCE_DATA_ENDPOINT } from "../../appConstants";

interface IStateProps {
  performanceTestId?: string;
}

interface IState {
  iterations: any;
  isDataFetched: boolean;
  chartOptions: any;
  days: string;
}
class PerformanceLineGraph extends React.Component<IStateProps, IState> {
  state = {
    iterations: [],
    isDataFetched: false,
    days: "7",
    chartOptions: {
      chart: {
        type: "spline",
        zoomType: "x"
      },
      title: {
        text: "Line Graph"
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          // don't display the dummy year
          month: "%e. %b",
          year: "%b"
        },
        title: {
          text: "Date"
        }
      },
      yAxis: {
        title: {
          text: "Time Elapsed (ms)"
        },
        min: 0
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br>",
        pointFormat: "{point.x:%e. %b}: {point.y:.2f} ms"
      },

      plotOptions: {
        series: {
          marker: {
            enabled: true
          },
          cursor: "pointer"
        }
      },
      colors: ["#6CF", "#39F", "#06C", "#036", "#000"],
      series: [
        {
          type: "spline",
          name: "AvgSubscribeElapsed",
          data: [[]]
        },
        {
          type: "spline",
          name: "AvgGetJsonElapsed",
          data: [[]]
        },
        {
          type: "spline",
          name: "AvgParseJsonElapsed",
          data: [[]]
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              plotOptions: {
                series: {
                  marker: {
                    radius: 2.5
                  }
                }
              }
            }
          }
        ]
      }
    }
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
    let graphData = this.getLineGraphData(result);
    await this.setState({
      chartOptions: {
        series: [
          { data: graphData.subscribeElapsedData },
          { data: graphData.getJsonElapsedData },
          { data: graphData.parseJsonElapsedData }
        ]
      }
    });
  };

  getLineGraphData = arr => {
    let avgSubscribeElapsedArr = [];
    let avgParseJsonElapsedArr = [];
    let avgGetJsonElapsedArr = [];
    for (var i = 0; i < arr.length; i++) {
      let startDate = new Date(arr[i].startDate);
      // All series have a dummy year of 1970/71 in order to be compared on the same x axis.
      let utc = Date.UTC(
        1970,
        startDate.getUTCMonth(),
        startDate.getUTCDay(),
        startDate.getUTCHours(),
        startDate.getUTCMinutes(),
        startDate.getUTCSeconds(),
        startDate.getUTCMilliseconds()
      );
      avgSubscribeElapsedArr.push([utc, arr[i].avgSubscribeElapsed]);
      avgParseJsonElapsedArr.push([utc, arr[i].avgParseJsonElapsed]);
      avgGetJsonElapsedArr.push([utc, arr[i].avgGetJsonElapsed]);
    }
    return {
      subscribeElapsedData: avgSubscribeElapsedArr.sort(),
      parseJsonElapsedData: avgParseJsonElapsedArr.sort(),
      getJsonElapsedData: avgGetJsonElapsedArr.sort()
    };
  };

  handleClick = async event => {
    await this.setState({ days: event.target.id });
    await this.fetchData();
  };

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button
            id="7"
            onClick={this.handleClick}
            variant="primary"
            active={this.state.days === "7"}
          >
            Week
          </Button>
          <Button
            id="30"
            onClick={this.handleClick}
            variant="primary"
            active={this.state.days === "30"}
          >
            Month
          </Button>
          <Button
            id="365"
            onClick={this.handleClick}
            variant="primary"
            active={this.state.days === "365"}
          >
            Year
          </Button>
        </ButtonGroup>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartOptions as Highcharts.Options}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: IApplicationState) => ({
  performanceTestId: state.performanceResults.performanceTestId
});

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(PerformanceLineGraph);
