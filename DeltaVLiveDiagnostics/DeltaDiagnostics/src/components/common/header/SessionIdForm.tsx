import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store/index";
import * as sessionIdActions from "../../../store/sessionIdForm/actions";

//based on https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d

// export interface IOwnProps {
//   propFromParent: number;
// }

interface IStateProps {
  sessionId?: string;
}

interface IDispatchProps {
  sessionIdActions: typeof sessionIdActions;
}

type SessionIdFormProps = IStateProps & IDispatchProps;

interface ISessionIdState {
  sessionId: string;
}

class SessionIdForm extends React.Component<
  SessionIdFormProps,
  ISessionIdState
> {
  state = {
    sessionId: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.sessionIdActions.updateSessionId(this.state.sessionId);
  };

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
        <label>SessionID: </label>
        <input
          className="form-control"
          type="text"
          value={this.state.sessionId}
          onChange={event => this.setState({ sessionId: event.target.value })}
          onBlur={() =>
            this.props.sessionIdActions.updateSessionId(this.state.sessionId)
          }
          placeholder="Please enter session id"
          required
        />
      </form>
    );
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    sessionId: state.sessionId.sessionId
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    sessionIdActions: bindActionCreators(sessionIdActions, dispatch)
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SessionIdForm);
