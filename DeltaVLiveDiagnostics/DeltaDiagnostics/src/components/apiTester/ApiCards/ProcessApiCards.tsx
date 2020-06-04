import React from "react";
import ApiCard from "./ApiCard";
import * as appConstants from "../../../appConstants";
import { handleFetchAsync } from "../../../utils/api/apiUtils";

class ProcessApiCards extends React.Component {
  render() {
    return (
      <ApiCard
        apiCallFunction={moduleNameOrId =>
          handleFetchAsync(
            appConstants.API_GET_MODULE_INFO_ENDPOINT(moduleNameOrId),
            appConstants.API_GET_INCLUDE_HEADER
          )
        }
        endpointPrefix={appConstants.API_GET_MODULE_INFO_PREFIX}
        endpointDescription={appConstants.API_GET_MODULE_INFO_DESCRIPTION}
        numInputs={1}
        inputPlaceholder={[appConstants.DISPLAY_NAME_INPUT_PLACEHOLDER]}
      />
    );
  }
}

export default ProcessApiCards;
