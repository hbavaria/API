import React from "react";
import DisplayDetailsView from "./DisplayDetailsView";
import PreRenderDisplay from "./PreRenderDisplay";
import TabbedCard from "../../common/TabbedCard";
import * as appConstants from "../../../appConstants";

class DisplayDetailsControl extends React.Component {
  render() {
    return (
      <TabbedCard
        defaultActiveKey={appConstants.EVENT_KEY_DISPLAY_DETAILS_VIEW}
        componentsByEventKey={{
          [appConstants.EVENT_KEY_DISPLAY_DETAILS_VIEW]: <DisplayDetailsView />,
          [appConstants.EVENT_KEY_PRERENDER_DISPLAY]: <PreRenderDisplay />
        }}
      />
    );
  }
}

export default DisplayDetailsControl;
