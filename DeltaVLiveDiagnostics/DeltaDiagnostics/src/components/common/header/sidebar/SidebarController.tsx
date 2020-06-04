import { IoIosMenu } from "react-icons/io";
import React from "react";
import * as sidebarActions from "../../../../store/sidebar/actions";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

interface IDispatchProps {
  sidebarActions: typeof sidebarActions;
}

class SidebarController extends React.Component<IDispatchProps> {
  handleClick = () => this.props.sidebarActions.toggleSidebar(true);

  render() {
    return (
      <h2>
        <IoIosMenu onClick={this.handleClick} />
      </h2>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    sidebarActions: bindActionCreators(sidebarActions, dispatch)
  };
}

export default connect<null, IDispatchProps>(
  null,
  mapDispatchToProps
)(SidebarController);
