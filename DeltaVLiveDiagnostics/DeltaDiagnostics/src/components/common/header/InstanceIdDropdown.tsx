import * as instanceIdActions from "../../../store/instanceId/actions";
import * as displayActions from "../../../store/display/actions";
import { handleFetchAsync } from "../../../utils/api/apiUtils";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import * as appConstants from "../../../appConstants";
import { IApplicationState } from "../../../store";

interface IStateProps {
  instanceId?: string;
  sessionId?: string;
}

interface IDispatchProps {
  instanceIdActions: typeof instanceIdActions;
  displayActions: typeof displayActions;
}

type InstanceIdDropdownProps = IStateProps & IDispatchProps;

interface IInstanceIdState {
  instanceIds: string[];
  id?: string;
}

class InstanceIdDropdown extends React.Component<
  InstanceIdDropdownProps,
  IInstanceIdState
> {
  state = {
    instanceIds: []
  };

  async componentDidMount() {
    let allInstanceIdsFetchResult = await handleFetchAsync(
      appConstants.API_GET_ALL_IDS_ENDPOINT
    );
    this.setState({ instanceIds: allInstanceIdsFetchResult.data });
  }

  /* Update the Op Hub ID being used to authenticate requests */
  handleChangeAsync = async event => {
    const { sessionId, instanceIdActions } = this.props;
    const selectedInstanceId = event.target.text;
    let changeServerSessionEndpoint = appConstants.API_CHANGE_SERVER_SESSION_ENDPOINT(
      selectedInstanceId,
      sessionId
    );
    await handleFetchAsync(
      changeServerSessionEndpoint,
      appConstants.API_GET_INCLUDE_HEADER
    );
    instanceIdActions.changeInstanceId(selectedInstanceId);
    this.updateDisplayHierarchyAsync(selectedInstanceId);
  };

  async updateDisplayHierarchyAsync(instanceId: string) {
    let displayHierarchyEndpoint = appConstants.API_GET_ACTIVE_DISPLAYNAME_HIERARCHY_ENDPOINT(
      instanceId
    );
    let displayHierarchyFetchResult = await handleFetchAsync(
      displayHierarchyEndpoint,
      appConstants.API_GET_INCLUDE_HEADER
    );
    this.props.displayActions.updateDisplayHierarchy(
      JSON.parse(displayHierarchyFetchResult.data)
    );
  }

  render() {
    if (this.state.instanceIds.length !== 0) {
      return (
        <DropdownButton
          id="instanceIdDropdown"
          title={appConstants.INSTANCE_ID_DROPDOWN_TITLE}
        >
          {this.state.instanceIds.map(id => (
            <Dropdown.Item
              key={id}
              onClick={this.handleChangeAsync}
              active={id === this.props.instanceId}
            >
              {id}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      );
    } else {
      return <p>{appConstants.NO_IDS_ERROR_MESSAGE}</p>;
    }
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    instanceId: state.instanceId.instanceId,
    sessionId: state.sessionId.sessionId
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    instanceIdActions: bindActionCreators(instanceIdActions, dispatch),
    displayActions: bindActionCreators(displayActions, dispatch)
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(InstanceIdDropdown);
