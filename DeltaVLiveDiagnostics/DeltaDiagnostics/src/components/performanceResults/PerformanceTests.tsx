import React from "react";
import { Spinner, Button } from "react-bootstrap";
import { IApplicationState } from "../../store";
import { bindActionCreators, Dispatch } from "redux";
import * as performanceResultActions from "../../store/performanceResults/actions";
import { connect } from "react-redux";
import { AutoSizer, List } from "react-virtualized";
import { API_GET_PERFORMANCE_TESTS_ENDPOINT } from "../../appConstants";

interface IStateProps {
  performanceTestId: string;
}

interface IDispatchProps {
  performanceResultActions: typeof performanceResultActions;
}
type PerformanceTestProps = IDispatchProps & IStateProps;

class PerformanceTests extends React.Component<PerformanceTestProps> {
  listRef: any;
  state = {
    isLoading: true,
    testData: []
  };
  async componentDidMount() {
    let tests = await fetch(API_GET_PERFORMANCE_TESTS_ENDPOINT);
    let testsJson = await tests.json();
    if (tests.ok) {
      this.setState({ testData: testsJson, isLoading: false });
    }
  }

  handleClick = event => {
    let buttonText = event.target.textContent;
    let performanceTestId = buttonText.split("id:")[1].trim();
    this.props.performanceResultActions.updatePerformanceTestId(
      performanceTestId
    );
    this.listRef.forceUpdateGrid();
  };

  rowRenderer = ({ key, index, style }) => {
    return (
      <Button
        style={style}
        key={key}
        onClick={this.handleClick}
        active={this.state.testData[index]._id === this.props.performanceTestId}
      >
        {this.state.testData[index].displayName} <br /> id:
        {this.state.testData[index]._id}
      </Button>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <Spinner animation="border" />;
    } else {
      return (
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={ref => (this.listRef = ref)}
              width={width}
              height={height - 20}
              rowCount={this.state.testData.length}
              rowHeight={90}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      );
    }
  }
}
const mapStateToProps = (state: IApplicationState) => ({
  performanceTestId: state.performanceResults.performanceTestId
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  performanceResultActions: bindActionCreators(
    performanceResultActions,
    dispatch
  )
});

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceTests);
