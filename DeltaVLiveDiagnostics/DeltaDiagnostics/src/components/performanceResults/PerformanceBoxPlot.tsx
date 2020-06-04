import React from "react";
import { IApplicationState } from "../../store";
import { connect } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
HighchartsMore(Highcharts);
import { API_GET_PERFORMANCE_BOXPLOT_ENDPOINT } from "../../appConstants";

interface IStateProps {
  performanceTestId?: string;
}

interface IState {
  stats: any;
  chartOptions: any;
  days: string;
}
class PerformanceBoxPlot extends React.Component<IStateProps, IState> {
  state = {
    stats: {},
    days: "7",
    chartOptions: {
      chart: {
        type: "boxplot",
        zoomType: "y"
      },

      title: {
        text: "Box Plot"
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },

      xAxis: {
        categories: [
          "AvgSubscribeElapsed",
          "AvgGetJsonElapsed",
          "AvgParseJsonElapsed"
        ]
      },

      yAxis: {
        title: {
          text: "Time Elapsed (ms)"
        }
      },

      series: [
        {
          type: "boxplot",
          name: "Performance",
          data: [[], [], []],
          tooltip: {
            headerFormat: "<em>{point.key}</em><br/>",
            pointFormat:
              "High: {point.high:.3f} <br/> Median: {point.median:.3f} <br/> Low: {point.low:.3f} <br/>"
          }
        },
        {
          name: "Outliers",
          color: Highcharts.getOptions().colors[0],
          type: "scatter",
          data: [
            // x, y positions where 0 is the first category
            [],
            [],
            []
          ],
          marker: {
            fillColor: "white",
            lineWidth: 1,
            lineColor: Highcharts.getOptions().colors[0]
          },
          tooltip: {
            pointFormat: "{point.y:.3f}"
          }
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
      API_GET_PERFORMANCE_BOXPLOT_ENDPOINT(
        this.props.performanceTestId,
        this.state.days
      )
    );
    let result = await perfResults.json();
    let stats = this.getBoxPlotData(result);
    await this.setState({
      stats: result,
      chartOptions: {
        series: [{ data: stats.boxPlotData }, { data: stats.outlierData }]
      }
    });
  };

  getBoxPlotData = stats => {
    let boxPlotData = [];
    let outlierData = [];
    let { parseJsonElapsed, getJsonElapsed, subscribeElapsed } = stats;

    let subscribeArr = [
      subscribeElapsed.min,
      subscribeElapsed.q1,
      subscribeElapsed.median,
      subscribeElapsed.q3,
      subscribeElapsed.max
    ];
    for (var i = 0; i < subscribeElapsed.outliers.length; i++) {
      outlierData.push([0, subscribeElapsed.outliers[i]]);
    }

    let getJsonArr = [
      getJsonElapsed.min,
      getJsonElapsed.q1,
      getJsonElapsed.median,
      getJsonElapsed.q3,
      getJsonElapsed.max
    ];
    for (var i = 0; i < getJsonElapsed.outliers.length; i++) {
      outlierData.push([1, getJsonElapsed.outliers[i]]);
    }

    let parseJsonArr = [
      parseJsonElapsed.min,
      parseJsonElapsed.q1,
      parseJsonElapsed.median,
      parseJsonElapsed.q3,
      parseJsonElapsed.max
    ];
    for (var i = 0; i < parseJsonElapsed.outliers.length; i++) {
      outlierData.push([2, parseJsonElapsed.outliers[i]]);
    }
    boxPlotData.push(subscribeArr, getJsonArr, parseJsonArr);
    return { boxPlotData, outlierData };
  };

  handleClick = async event => {
    await this.setState({ days: event.target.id });
    this.fetchData();
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
)(PerformanceBoxPlot);
