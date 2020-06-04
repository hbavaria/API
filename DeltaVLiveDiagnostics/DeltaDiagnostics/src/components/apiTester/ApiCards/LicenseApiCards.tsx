import React from "react";
import ApiCard from "./ApiCard";
import { handleFetchAsync } from "../../../utils/api/apiUtils";
import * as appConstants from "../../../appConstants";

class LicenseApiCards extends React.Component {
  render() {
    return (
      <ApiCard
        apiCallFunction={() =>
          handleFetchAsync(
            appConstants.API_GET_APPLICATION_LICENSE_INFO,
            appConstants.API_GET_INCLUDE_HEADER
          )
        }
        endpointPrefix={appConstants.API_GET_APPLICATION_LICENSE_INFO_PREFIX}
        endpointDescription={
          appConstants.API_GET_APPLICATION_LICENSE_INFO_DESCRIPTION
        }
      />
    );
  }
}

export default LicenseApiCards;
