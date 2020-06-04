import React from "react";
import ApiCard from "./ApiCard";
import { handleFetchAsync } from "../../../utils/api/apiUtils";
import * as appConstants from "../../../appConstants";

class AccountApiCards extends React.Component {
  render() {
    return (
      <ApiCard
        apiCallFunction={() =>
          handleFetchAsync(appConstants.API_GET_ALL_IDS_ENDPOINT)
        }
        endpointPrefix={appConstants.API_GET_ALL_IDS_ENDPOINT_SHORT}
        endpointDescription={appConstants.API_GET_ALL_IDS_DESCRIPTION}
      />
    );
  }
}

export default AccountApiCards;
