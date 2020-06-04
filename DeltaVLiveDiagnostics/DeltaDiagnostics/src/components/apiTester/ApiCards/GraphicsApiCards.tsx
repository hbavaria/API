import React from "react";
import ApiCard from "./ApiCard";
import { handleFetchAsync } from "../../../utils/api/apiUtils";
import { connect } from "react-redux";
import * as appConstants from "../../../appConstants";
import { IApplicationState } from "../../../store";

export interface IStateProps {
  instanceId?: string;
}

type Props = IStateProps;

class GraphicsApiCards extends React.Component<Props> {
  static defaultProps = {
    instanceId: ""
  };

  render() {
    return (
      <>
        <ApiCard
          apiCallFunction={() =>
            handleFetchAsync(
              appConstants.API_GET_ALL_DISPLAYS_ENDPOINT,
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          endpointPrefix={appConstants.API_GET_ALL_DISPLAYS_ENDPOINT_SHORT}
          endpointDescription={appConstants.API_GET_ALL_DISPLAYS_DESCRIPTION}
        />
        <br />

        <ApiCard
          apiCallFunction={displayNameOrId =>
            handleFetchAsync(
              appConstants.API_GET_DISPLAY_DETAILS_ENDPOINT(displayNameOrId),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          endpointPrefix={appConstants.API_GET_DISPLAY_ENDPOINT_SHORT}
          endpointDescription={appConstants.API_GET_DISPLAY_DESCRIPTION}
          numInputs={1}
          inputPlaceholder={[appConstants.DISPLAY_NAME_INPUT_PLACEHOLDER]}
        />
        <br />

        <ApiCard
          apiCallFunction={controlTagName =>
            handleFetchAsync(
              appConstants.API_GET_CONTEXTUAL_DISPLAY_ENDPOINT(
                "Primary",
                controlTagName
              ),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          parameters={[appConstants.DISPLAY_TYPE_PRIMARY]}
          endpointPrefix={
            appConstants.API_GET_CONTROL_TAG_PRIMARY_DISPLAY_ENDPOINT_SHORT
          }
          endpointDescription={
            appConstants.API_GET_CONTROL_TAG_PRIMARY_DISPLAY_DESCRIPTION
          }
          numInputs={1}
          inputPlaceholder={[appConstants.CONTROL_TAG_INPUT_PLACEHOLDER]}
        />
        <br />

        <ApiCard
          apiCallFunction={controlTagName =>
            handleFetchAsync(
              appConstants.API_GET_CONTEXTUAL_DISPLAY_ENDPOINT(
                "Faceplate",
                controlTagName
              ),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          parameters={[appConstants.DISPLAY_TYPE_FACEPLATE]}
          endpointPrefix={
            appConstants.API_GET_CONTROL_TAG_FACEPLATE_DISPLAY_ENDPOINT_SHORT
          }
          endpointDescription={
            appConstants.API_GET_CONTROL_TAG_FACEPLATE_DISPLAY_DESCRIPTION
          }
          numInputs={1}
          inputPlaceholder={[appConstants.CONTROL_TAG_INPUT_PLACEHOLDER]}
        />
        <br />

        <ApiCard
          apiCallFunction={controlTagName =>
            handleFetchAsync(
              appConstants.API_GET_CONTEXTUAL_DISPLAY_ENDPOINT(
                "Detail",
                controlTagName
              ),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          parameters={[appConstants.DISPLAY_TYPE_DETAIL]}
          endpointPrefix={
            appConstants.API_GET_CONTROL_TAG_DETAIL_DISPLAY_ENDPOINT_SHORT
          }
          endpointDescription={
            appConstants.API_GET_CONTROL_TAG_DETAIL_DISPLAY_DESCRIPTION
          }
          numInputs={1}
          inputPlaceholder={[appConstants.CONTROL_TAG_INPUT_PLACEHOLDER]}
        />
        <br />

        <ApiCard
          apiCallFunction={(nameOrId, instanceId) =>
            handleFetchAsync(
              appConstants.API_GET_DISPLAY_REFERENCES_ENDPOINT(
                nameOrId,
                instanceId
              ),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          parameters={[this.props.instanceId]}
          endpointPrefix={appConstants.API_GET_REFERENCE_ENDPOINT_SHORT}
          endpointDescription={appConstants.API_GET_REFERENCE_DESCRIPTION}
          numInputs={1}
          inputPlaceholder={[appConstants.DISPLAY_NAME_INPUT_PLACEHOLDER]}
        />
        <br />

        <ApiCard
          apiCallFunction={(standardName, instanceId) =>
            handleFetchAsync(
              appConstants.API_GET_STANDARD_VALUE_ENDPOINT(
                standardName,
                instanceId
              ),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          parameters={[this.props.instanceId]}
          endpointPrefix={appConstants.API_GET_STANDARD_VALUE_ENDPOINT_SHORT}
          endpointDescription={appConstants.API_GET_STANDARD_VALUE_DESCRIPTION}
          numInputs={1}
          inputPlaceholder={[appConstants.STANDARD_NAME_INPUT_PLACEHOLDER]}
        />
        <br />

        <ApiCard
          apiCallFunction={instanceId =>
            handleFetchAsync(
              appConstants.API_GET_ACTIVE_DISPLAY_HIERARCHY_ENDPOINT(
                instanceId
              ),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          parameters={[this.props.instanceId]}
          endpointPrefix={
            appConstants.API_GET_ACTIVE_DISPLAY_HIERARCHY_ENDPOINT_SHORT
          }
          endpointDescription={
            appConstants.API_GET_ACTIVE_DISPLAY_HIERARCHY_DESCRIPTION
          }
        />
        <br />

        <ApiCard
          apiCallFunction={displayNameOrId =>
            handleFetchAsync(
              appConstants.API_GET_PRERENDER_DISPLAY_ENDPOINT(displayNameOrId),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          endpointPrefix={appConstants.API_GET_PRERENDER_DISPLAY_ENDPOINT_SHORT}
          endpointDescription={
            appConstants.API_GET_PRERENDER_DISPLAY_DESCRIPTION
          }
          numInputs={1}
          inputPlaceholder={[appConstants.DISPLAY_NAME_INPUT_PLACEHOLDER]}
        />
        <br />

        <ApiCard
          apiCallFunction={(displayNameOrId, ctxString) =>
            handleFetchAsync(
              appConstants.API_GET_PRERENDER_DISPLAY_PARAMETERS_ENDPOINT(
                displayNameOrId,
                ctxString
              ),
              appConstants.API_GET_INCLUDE_HEADER
            )
          }
          endpointPrefix={
            appConstants.API_GET_PRERENDER_DISPLAY_PARAMETERS_ENDPOINT_SHORT
          }
          endpointDescription={
            appConstants.API_GET_PRERENDER_DISPLAY_PARAMETERS_DESCRIPTION
          }
          numInputs={2}
          inputPlaceholder={[
            appConstants.DISPLAY_NAME_INPUT_PLACEHOLDER,
            appConstants.CTX_STRING_INPUT_PLACEHOLDER
          ]}
        />
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    instanceId: state.instanceId.instanceId
  };
}

export default connect(mapStateToProps)(GraphicsApiCards);
