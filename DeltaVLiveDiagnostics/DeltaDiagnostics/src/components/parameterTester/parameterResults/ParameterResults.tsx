import React from "react";
import TabbedCard from "../../common/TabbedCard";
import * as appConstants from "../../../appConstants";
import SubscriptionResults from "./SubscriptionResultsVirtualized";
import WriteResults from "./WriteResultsVirtualized";

class ParameterResults extends React.Component {
  render() {
    return (
      <TabbedCard
        defaultActiveKey={appConstants.EVENT_KEY_SUBSCRIPTIONS_VIEWER}
        componentsByEventKey={{
          [appConstants.EVENT_KEY_SUBSCRIPTIONS_VIEWER]: (
            <SubscriptionResults />
          ),
          [appConstants.EVENT_KEY_WRITES_VIEWER]: <WriteResults />
        }}
      />
    );
  }
}

export default ParameterResults;
