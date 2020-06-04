import React from "react";
import { IApplicationState } from "../../store";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as performanceTesterActions from "../../store/performanceTester/actions";

interface IStateProps {
  output: string[];
}

interface IDispatchProps {
  performanceTesterActions: typeof performanceTesterActions;
}

type Props = IStateProps & IDispatchProps;

class Output extends React.Component<Props> {
  state = {
    output: []
  };
  //clear output messages periodically to reduce UI lag
  componentDidUpdate(prevProps) {
    if (prevProps.output.length > 700) {
      this.props.performanceTesterActions.deleteOutputMessages();
    }
    this.scrollPerformanceOutput(20);
  }

  scrollPerformanceOutput(scrollY) {
    var performanceOutput = document.getElementById("performanceOutput");
    performanceOutput.scrollBy(0, -scrollY);
  }
  render() {
    return (
      <div className="performanceOutput">
        <h1>Output</h1>
        <textarea
          id="performanceOutput"
          style={{ width: "100%", height: "100%" }}
          name="textarea"
          value={this.props.output.join("\n")}
          readOnly={true}
        />
      </div>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    output: state.performanceTester.output
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    performanceTesterActions: bindActionCreators(
      performanceTesterActions,
      dispatch
    )
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Output);
