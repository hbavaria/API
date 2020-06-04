import * as displayActions from "../../../store/display/actions";
import * as responseTimeActions from "../../../store/responseTimes/actions";
import * as updateDisplayDetailsUtils from "../../../utils/display/updateDisplayDetailsUtils";
import * as appConstants from "../../../appConstants";
import { ButtonGroup, Button } from "react-bootstrap";
import { bindActionCreators, Dispatch } from "redux";
import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store/";
import { handleFetchAsync } from "../../../utils/api/apiUtils";
import { AutoSizer, List } from "react-virtualized";

interface IStateProps {
  instanceId?: string;
  allDisplays?: any[];
  selectedDisplay?: string;
}

interface IDispatchProps {
  displayActions: typeof displayActions;
}

type DisplayNavigatorProps = IStateProps & IDispatchProps;

class Displays extends React.Component<DisplayNavigatorProps> {
  listRef: any;
  componentDidUpdate(prevProps) {
    if (prevProps.instanceId !== this.props.instanceId) {
      this.loadDisplays();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.instanceId !== this.props.instanceId) {
      return true;
    }
    return false;
  }

  async componentDidMount() {
    this.loadDisplays();
  }

  async loadDisplays() {
    let allDisplaysEndpoint = appConstants.API_GET_ALL_DISPLAYS_ENDPOINT;
    const allDisplaysFetchResult = await handleFetchAsync(
      allDisplaysEndpoint,
      appConstants.API_GET_INCLUDE_HEADER
    );
    this.props.displayActions.updateAllDisplays(
      allDisplaysFetchResult.data.sort((display1, display2) => {
        display1.name.localeCompare(display2.name);
      })
    );
  }

  extractDisplayName = text => {
    return text.split("id:")[0].trim();
  };

  handleChangeAsync = async event => {
    const buttonText = event.target.textContent;
    const chosenDisplay = this.extractDisplayName(buttonText);
    updateDisplayDetailsUtils.updateDetails(chosenDisplay, this.props);
    this.listRef.forceUpdateGrid(); //force react virtualized to re-render row so that the button is highlighted
  };

  rowRenderer = ({ key, index, style }) => {
    return (
      <Button
        style={style}
        key={key}
        onClick={this.handleChangeAsync}
        active={
          this.props.allDisplays[index].name === this.props.selectedDisplay
        }
      >
        {this.props.allDisplays[index].name} <br /> id:{" "}
        {this.props.allDisplays[index].id}
      </Button>
    );
  };

  renderAllDisplaysVirtualized() {
    return (
      <>
        <h4 className="text-center">Display Navigator</h4>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={ref => (this.listRef = ref)}
              width={width}
              height={height - 20}
              rowCount={this.props.allDisplays.length}
              rowHeight={90}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      </>
    );
  }

  renderAllDisplays() {
    return (
      <div className="display-list-container">
        <h4 className="text-center">Display Navigator</h4>
        <div className="display-buttons-container">
          <ButtonGroup vertical className="d-flex">
            {this.props.allDisplays.map(display => {
              return (
                <Button
                  key={display.id}
                  onClick={this.handleChangeAsync}
                  active={display.name === this.props.selectedDisplay}
                >
                  {display.name} <br /> id: {display.id}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
      </div>
    );
  }

  render() {
    let isInstanceIDSelected = this.props.instanceId !== "";
    if (isInstanceIDSelected) {
      {
        return this.renderAllDisplaysVirtualized();
      }
    } else {
      return <p>{appConstants.DISPLAY_NAVIGATOR_MESSAGE}</p>;
    }
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  instanceId: state.instanceId.instanceId,
  allDisplays: state.allDisplays.allDisplays,
  selectedDisplay: state.selectedDisplay.selectedDisplay
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  displayActions: bindActionCreators(displayActions, dispatch),
  responseTimeActions: bindActionCreators(responseTimeActions, dispatch)
});

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Displays);
