import React from "react";
import TabbedCard from "../../common/TabbedCard";
import * as appConstants from "../../../appConstants";
import ParameterSubscriber from "./ParameterSubscriber";
import ParameterWriter from "./ParameterWriter";

class ParameterControl extends React.Component {
  render() {
    return (
      <TabbedCard
        defaultActiveKey={appConstants.EVENT_KEY_PARAMETER_SUBSCRIBER}
        componentsByEventKey={{
          [appConstants.EVENT_KEY_PARAMETER_SUBSCRIBER]: (
            <ParameterSubscriber />
          ),
          [appConstants.EVENT_KEY_PARAMETER_WRITER]: <ParameterWriter />
        }}
      />
    );
  }
}

export default ParameterControl;
