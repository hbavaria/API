import * as displayActions from "../../../../store/display/actions";
import * as responseTimeActions from "../../../../store/responseTimes/actions";
import * as updateDisplayDetailsUtils from "../../../../utils/display/updateDisplayDetailsUtils";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import { IApplicationState } from "../../../../store";

interface IStateProps {
  displayName?: string;
  instanceId?: string;
  sessionId?: string;
}

interface IDispatchProps {
  displayActions: typeof displayActions;
}

interface IDisplayDetailsSearchState {
  displayName: string;
}

type DisplayDeatailsSearchProps = IStateProps & IDispatchProps;

class DetailsForm extends React.Component<
  DisplayDeatailsSearchProps,
  IDisplayDetailsSearchState
> {
  inputTimer: any;
  state = {
    displayName: ""
  };

  componentDidMount() {
    this.setState({ displayName: this.props.displayName });
  }

  handleSubmitAsync = async event => {
    event.preventDefault(); //prevent the default browser behavior of clearing form input
    updateDisplayDetailsUtils.updateDetails(this.state.displayName, this.props);
  };

  handleInputChange = event => {
    event.persist();
    this.setState({ displayName: event.target.value });
    var timeoutDuration = 300;
    clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.updateDisplaySearch(event.target.value);
    }, timeoutDuration);
  };

  updateDisplaySearch = displayName => {
    this.props.displayActions.updateDisplaySearch(displayName);
  };

  render() {
    return (
      <div className="display-details-search">
        <h4>Display Details Search</h4>
        <form onSubmit={this.handleSubmitAsync}>
          <input
            className="form-control"
            type="text"
            value={this.state.displayName}
            onChange={this.handleInputChange}
            placeholder="Enter display name"
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    instanceId: state.instanceId.instanceId,
    sessionId: state.sessionId.sessionId,
    displayName: state.displaySearch.displayName
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    displayActions: bindActionCreators(displayActions, dispatch),
    responseTimeActions: bindActionCreators(responseTimeActions, dispatch)
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(DetailsForm);
