import * as displayActions from "../../../../store/display/actions";
import * as responseTimeActions from "../../../../store/responseTimes/actions";
import { Button, ButtonGroup } from "react-bootstrap";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import {
  CONTROL_TAG_MESSAGE,
  CONTROL_TAG_DISPLAY_SEARCH_TITLE
} from "../../../../appConstants";
import * as updateDisplayDetailsUtils from "../../../../utils/display/updateDisplayDetailsUtils";
import { IApplicationState } from "../../../../store";
import { getAllDisplaysForControlTagAsync } from "../../../../utils/api/apiUtils";

interface IStateProps {
  instanceId?: string;
  selectedDisplay?: string;
  controlTag?: string;
  controlTagDisplays?: Object;
}

interface IDispatchProps {
  displayActions: typeof displayActions;
}

type ControlTagDisplaySearchProps = IStateProps & IDispatchProps;

interface IControlTagDisplaySearchState {
  displayNames: Object;
  displaysAreLoaded: boolean;
  contextualDisplayName: string;
  controlTag: string;
}

class ControlTagForm extends React.Component<
  ControlTagDisplaySearchProps,
  IControlTagDisplaySearchState
> {
  inputTimer: any;
  state = {
    displaysAreLoaded: false,
    displayNames: {},
    contextualDisplayName: "",
    controlTag: ""
  };

  componentDidMount() {
    this.setState({ controlTag: this.props.controlTag });
  }

  handleDisplayNotFound = () => {
    let displayNamesArray = Object.values(this.state.displayNames);
    for (let displayName in displayNamesArray) {
      if (displayNamesArray[displayName] !== "") {
        this.setState({ displaysAreLoaded: true });
      }
    }
    if (!this.state.displaysAreLoaded) {
      alert(
        `Display name not found for control tag: "${
          this.state.controlTag
        }". Please double check your input.`
      );
    }
  };

  extractDisplayName = text => {
    return text
      .split(":")
      .pop()
      .trim();
  };

  handleClickAsync = async event => {
    const buttonText = event.target.textContent;
    const chosenDisplay = this.extractDisplayName(buttonText);
    this.setState({ contextualDisplayName: chosenDisplay });
    updateDisplayDetailsUtils.updateDetails(chosenDisplay, this.props);
  };

  handleSubmitAsync = async event => {
    event.preventDefault(); //prevent the default browser behavior of clearing form input and refreshing page
    this.setState({ displaysAreLoaded: false });
    let results = await getAllDisplaysForControlTagAsync(this.state.controlTag);

    this.setState({ displayNames: results });

    this.props.displayActions.updateControlTagDisplays(this.state.displayNames);
    this.handleDisplayNotFound();
  };

  handleInputChange = event => {
    event.persist();
    this.setState({ controlTag: event.target.value });
    var timeoutDuration = 300;
    clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.updateControlTagSearch(event.target.value);
    }, timeoutDuration);
  };

  handleValue = () => {
    if (this.state.controlTag === "") {
      return this.props.controlTag;
    } else {
      return this.state.controlTag;
    }
  };

  updateControlTagSearch = controlTag => {
    this.props.displayActions.updateControlTagSearch(controlTag);
  };

  renderDisplayButtons() {
    if (Object.keys(this.props.controlTagDisplays).length !== 0) {
      return (
        <ButtonGroup vertical className="d-flex">
          {Object.entries(this.props.controlTagDisplays).map(
            ([displayKey, displayValue]) => {
              let isValidDisplay = displayValue !== "";
              if (isValidDisplay) {
                return (
                  <Button
                    key={displayKey}
                    onClick={this.handleClickAsync}
                    block
                    active={displayValue === this.props.selectedDisplay}
                  >
                    {`${displayKey}: `}
                    {displayValue}
                  </Button>
                );
              } else {
                return null;
              }
            }
          )}
        </ButtonGroup>
      );
    } else {
      return <p>{CONTROL_TAG_MESSAGE}</p>;
    }
  }

  renderControlTagForm() {
    return (
      <div className="control-tag-form">
        <h4>{CONTROL_TAG_DISPLAY_SEARCH_TITLE}</h4>
        <form onSubmit={this.handleSubmitAsync}>
          <input
            onChange={this.handleInputChange}
            className="form-control"
            type="text"
            value={this.state.controlTag}
            placeholder="Enter control tag"
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
  render() {
    return (
      <>
        <div className="control-tag-search">
          {this.renderControlTagForm()}
          {this.renderDisplayButtons()}
        </div>
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    instanceId: state.instanceId.instanceId,
    selectedDisplay: state.selectedDisplay.selectedDisplay,
    controlTagDisplays: state.controlTagDisplays.controlTagDisplays,
    controlTag: state.controlTagSearch.controlTag
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
)(ControlTagForm);
