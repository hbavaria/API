import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import React from "react";
import { IApplicationState } from "../../../store";
import * as appConstants from "../../../appConstants";

interface IStateProps {
  instanceId?: string;
  sessionId?: string;
}

class SessionInfo extends React.Component<IStateProps> {
  render() {
    return (
      <div>
        <h4 className="text-center">Session Info</h4>
        <p>
          <b>{appConstants.SESSION_INFO_INSTANCE_ID_TITLE}</b>
          {this.props.instanceId}
        </p>
        <p>
          <b>{appConstants.SESSION_INFO_SESSION_ID_TITLE}</b>
          {this.props.sessionId}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    sessionId: state.sessionId.sessionId,
    instanceId: state.instanceId.instanceId
  };
}

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(SessionInfo);
