import DisplaySearch from "./DisplaySearch/DisplaySearch";
import DisplayNavigator from "./DisplayNavigator";
import DisplayHierarchy from "./DisplayHierarchy";
import React from "react";
import TabbedCard from "../../common/TabbedCard";
import * as appConstants from "../../../appConstants";

class DisplayControl extends React.Component {
  render() {
    return (
      <TabbedCard
        defaultActiveKey={appConstants.EVENT_KEY_DISPLAY_NAVIGATOR}
        componentsByEventKey={{
          [appConstants.EVENT_KEY_DISPLAY_NAVIGATOR]: <DisplayNavigator />,
          [appConstants.EVENT_KEY_DISPLAY_SEARCH]: <DisplaySearch />,
          [appConstants.EVENT_KEY_DISPLAY_HIERARCHY]: <DisplayHierarchy />
        }}
      />
    );
  }
}

export default DisplayControl;
