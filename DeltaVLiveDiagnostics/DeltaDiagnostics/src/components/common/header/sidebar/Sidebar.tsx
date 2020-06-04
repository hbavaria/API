import React from "react";
import Sidebar from "react-sidebar";
import SessionControl from "../SessionControl";
import SessionInfo from "../SessionInfo";
import * as sidebarActions from "../../../../store/sidebar/actions";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import * as appConstants from "../../../../appConstants";
import { IApplicationState } from "../../../../store";

interface IStateProps {
  sidebarIsShowing: boolean;
}

interface IDispatchProps {
  sidebarActions: typeof sidebarActions;
}

type SidebarProps = IDispatchProps & IStateProps;

class SideBar extends React.Component<SidebarProps> {
  toggleSidebar(open: boolean): void {
    this.props.sidebarActions.toggleSidebar(open);
  }

  render(): JSX.Element {
    const activeStyle: object = { color: "#F15B2A" };
    return (
      <Sidebar
        onSetOpen={this.toggleSidebar.bind(this)}
        sidebar={
          <div className="sidebar-container h-100">
            <h1>
              <IoIosClose onClick={() => this.toggleSidebar(false)} />
            </h1>
            <SessionInfo />
            <br />
            <SessionControl />
            <br />
            <h4 className="text-center">Navigation</h4>
            <ButtonGroup vertical>
              <NavLink
                to={appConstants.DASHBOARD_PAGE_LINK}
                activeStyle={activeStyle}
                exact
              >
                {appConstants.DASHBOARD_PAGE_NAME}
              </NavLink>
              <NavLink
                to={appConstants.API_TESTER_PAGE_LINK}
                activeStyle={activeStyle}
              >
                {appConstants.API_TESTER_PAGE_NAME}
              </NavLink>
              <NavLink
                to={appConstants.PARAMETER_TESTER_PAGE_LINK}
                activeStyle={activeStyle}
              >
                {appConstants.PARAMETER_TESTER_PAGE_NAME}
              </NavLink>
              <NavLink
                to={appConstants.PERFORMANCE_TESTER_PAGE_LINK}
                activeStyle={activeStyle}
              >
                {appConstants.PERFORMANCE_TESTER_PAGE_NAME}
              </NavLink>
              <NavLink
                to={appConstants.PERFORMANCE_RESULTS_PAGE_LINK}
                activeStyle={activeStyle}
              >
                {appConstants.PERFORMANCE_RESULTS_PAGE_NAME}
              </NavLink>
              <NavLink
                to={appConstants.ABOUT_PAGE_LINK}
                activeStyle={activeStyle}
              >
                {appConstants.ABOUT_PAGE_NAME}
              </NavLink>
            </ButtonGroup>
          </div>
        }
        open={this.props.sidebarIsShowing}
        styles={{ sidebar: { background: "white" } }}
      >
        <div />
      </Sidebar>
    );
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    sidebarIsShowing: state.sidebar.sidebarIsShowing
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    sidebarActions: bindActionCreators(sidebarActions, dispatch)
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
