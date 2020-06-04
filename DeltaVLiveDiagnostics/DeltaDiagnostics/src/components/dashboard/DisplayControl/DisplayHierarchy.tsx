import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import TreeView from "react-treeview";
import { NO_ACTIVE_DISPLAY_HIERARCHY_MESSAGE } from "../../../appConstants";
import * as displayActions from "../../../store/display/actions";
import * as responseTimeActions from "../../../store/responseTimes/actions";
import * as updateDisplayDetailsUtils from "../../../utils/display/updateDisplayDetailsUtils";
import { Button } from "react-bootstrap";
import { IApplicationState } from "../../../store";

interface IStateProps {
  selectedDisplay?: string;
  displayHierarchy?: any[];
  instanceId?: string;
}

interface IDispatchProps {
  displayActions: typeof displayActions;
}

type DisplayHierarchyProps = IStateProps & IDispatchProps;

class DisplayHierarchy extends React.Component<DisplayHierarchyProps> {
  handleClick = async event => {
    const chosenDisplay = event.target.textContent.trim();
    updateDisplayDetailsUtils.updateDetails(chosenDisplay, this.props);
  };

  createTreeViewLayer(node, i, nodeLabel) {
    let isTreeView = node.children.length !== 0;
    if (isTreeView) {
      return (
        <TreeView key={i} nodeLabel={nodeLabel}>
          {node.children.map((childNode, i) => {
            const childNodeLabel = (
              <div key={i} className="tree-view-element">
                <Button
                  block
                  onClick={this.handleClick}
                  active={this.props.selectedDisplay === childNode.name}
                >
                  {childNode.name}
                </Button>
              </div>
            );
            return this.createTreeViewLayer(childNode, i, childNodeLabel);
          })}
        </TreeView>
      );
    } else {
      return (
        <div key={i} className="tree-view-element">
          <Button
            block
            key={i}
            onClick={this.handleClick}
            active={this.props.selectedDisplay === node.name}
          >
            {node.name}
          </Button>
        </div>
      );
    }
  }

  renderTreeViews() {
    return (
      <div>
        {this.props.displayHierarchy.map((node, i) => {
          const nodeLabel = (
            <div key={i} className="tree-view-element">
              <Button
                block
                onClick={this.handleClick}
                active={this.props.selectedDisplay === node.name}
              >
                {node.name}
              </Button>
            </div>
          );
          return this.createTreeViewLayer(node, i, nodeLabel);
        })}
      </div>
    );
  }

  renderErrorMessage() {
    return <p> {NO_ACTIVE_DISPLAY_HIERARCHY_MESSAGE}</p>;
  }

  render() {
    let isHierarchyDataLoaded = this.props.displayHierarchy.length !== 0;
    if (isHierarchyDataLoaded) {
      return this.renderTreeViews();
    } else {
      return this.renderErrorMessage();
    }
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    displayHierarchy: state.displayHierarchy.displayHierarchy,
    instanceId: state.instanceId.instanceId,
    selectedDisplay: state.selectedDisplay.selectedDisplay
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    displayActions: bindActionCreators(displayActions, dispatch),
    responseTimeActions: bindActionCreators(responseTimeActions, dispatch)
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(DisplayHierarchy);
