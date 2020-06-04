import InstanceIdDropdown from "./InstanceIdDropdown";
import SessionIdForm from "./SessionIdForm";
import React from "react";

class SessionControl extends React.Component {
  render() {
    return (
      <div>
        <h4 className="text-center">Session Control</h4>
        <InstanceIdDropdown />
        <br />
        <SessionIdForm />
      </div>
    );
  }
}

export default SessionControl;
