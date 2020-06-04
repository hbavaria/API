import React from "react";
import { connect } from "react-redux";
import "../../../index.css";
import { bindActionCreators, Dispatch } from "redux";
import * as appConstants from "../../../appConstants";
import ListManager from "../../common/ListManager";
import { IApplicationState } from "../../../store/index";
import * as parameterWriterActions from "../../../store/parameterWriter/actions";
import { IParameter } from "../../../store/parameter/types";
import InputWithState from "../../common/InputWithState";
import * as subscriptionApi from "../../../utils/api/subscriptionApi";
import * as writeUpdateActions from "../../../store/writeUpdates/actions";
import ParameterDefinitionDto from "../../../utils/web-sockets/interfaces/iParameterDefinitionDto";
import {
  IWebSocketProcess,
  ESigType
} from "../../../utils/web-sockets/webSocketProcess";
import { IoIosCheckboxOutline, IoIosSquareOutline } from "react-icons/io";
import { Subscription } from "rxjs";
import IESigData from "../../../utils/web-sockets/interfaces/iEsigData";
import {
  getESigInput,
  getConfirmerInputs,
  getVerifierInputs
} from "../../../utils/parameterWriterUtils";

interface IStateProps {
  parameters: IParameter[];
}

export interface IParameterWriterState {
  isESigModeEnabled: boolean;
}

interface IDispatchProps {
  parameterWriterActions: typeof parameterWriterActions;
  writeUpdateActions: typeof writeUpdateActions;
}

type Props = IStateProps & IDispatchProps;

class ParameterWriter extends React.Component<Props, IParameterWriterState> {
  _subscription: Subscription;
  _webSocketProcess: IWebSocketProcess;

  state = {
    isESigModeEnabled: false
  };

  componentDidMount() {
    this._webSocketProcess = subscriptionApi.getWebSocketProcess();
  }
  componentWillUnmount() {
    this._webSocketProcess.closeSocketConnectionAsync();
  }

  parameterExists = (parameterData: string) => {
    let parameterPath = parameterData.split(":")[0];
    for (let index = 0; index < this.props.parameters.length; index++) {
      if (this.props.parameters[index].path === parameterPath) {
        return true;
      }
    }

    return false;
  };

  createParameter = async (parameterDataSeparatedByColon: string[]) => {
    // parameter path should always be the first part of the input string
    let parameterPath: string;

    if (this.state.isESigModeEnabled) {
      let eSigPromises: Promise<ESigType>[] = new Array<Promise<ESigType>>();

      for (let paramData of parameterDataSeparatedByColon) {
        parameterPath = paramData.split(":")[0];
        eSigPromises.push(
          subscriptionApi.getEsigRequirementsAsync(
            parameterPath,
            this._webSocketProcess
          )
        );
      }

      let eSigRequirements: ESigType[] = await Promise.all(eSigPromises);

      this.props.parameterWriterActions.createParameter(
        parameterDataSeparatedByColon,
        eSigRequirements
      );
      console.log(eSigRequirements);
    } else {
      this.props.parameterWriterActions.createParameter(
        parameterDataSeparatedByColon
      );
    }
  };

  readParameter = (index: number) => this.props.parameters[index];

  updateParameter = async (index: number, updatedParam: IParameter) => {
    this.props.parameterWriterActions.updateParameterSelected(
      index,
      updatedParam.selected
    );
    if (this.state.isESigModeEnabled) {
      let eSigRequirementHasNotBeenFetched =
        this.props.parameters[index].eSigRequirement === -1;
      if (eSigRequirementHasNotBeenFetched) {
        this.props.parameterWriterActions.updateESigRequirement([
          ...this.props.parameters.splice(0, index),
          updatedParam,
          ...this.props.parameters.splice(index + 1)
        ]);
      }
    }
  };

  deleteParameter = (indices: number[]) => {
    this.props.parameterWriterActions.deleteParameter(indices);
  };

  /**
   * Gets the additional electronic signature inputs so that the user can provide the necessary data to perform esig writes
   * @param index
   * @param eSigRequirement
   */
  private getEsigInputs(index: number, eSigRequirement: number) {
    let eSigInputs = [];
    if (eSigRequirement === ESigType.Comment) {
      let eSigDataKey = "Comment";
      eSigInputs.push(getESigInput(index, eSigDataKey, this.props));
    } else if (eSigRequirement === ESigType.Confirm) {
      let confirmerInputs = getConfirmerInputs(index, this.props);
      confirmerInputs.forEach(confirmerInput => {
        eSigInputs.push(confirmerInput);
      });
    } else if (eSigRequirement === ESigType.ConfirmAndVerify) {
      let confirmerInputs = getConfirmerInputs(index, this.props);
      confirmerInputs.forEach(confirmerInput => {
        eSigInputs.push(confirmerInput);
      });
      let verifierInputs = getVerifierInputs(index, this.props);
      verifierInputs.forEach(verifierInput => {
        eSigInputs.push(verifierInput);
      });
    }
    return eSigInputs;
  }

  /**
   * Gets the value input element for a given parameter so that it can be rendered in the list manager
   * @param index
   */
  private getValueInput(index: number) {
    let jsx = (
      <InputWithState
        key={this.props.parameters[index].path}
        defaultValue={this.props.parameters[index].value}
        placeholder={"Value"}
        fileSelectionEnabled={false}
        handleInput={input => {
          this.props.parameterWriterActions.updateParameterValue(index, input);
          return input;
        }}
      />
    );
    return jsx;
  }

  renderParameter = (index: number) => {
    let parameterElements = [];
    parameterElements.push(this.props.parameters[index].path);
    if (this.state.isESigModeEnabled) {
      let eSigRequirement = this.props.parameters[index].eSigRequirement;
      let eSigInputs = this.getEsigInputs(index, eSigRequirement);
      let valueInput = this.getValueInput(index);
      parameterElements.push(valueInput);
      eSigInputs.forEach(eSigInput => {
        parameterElements.push(eSigInput);
      });
    } else {
      parameterElements.push(this.getValueInput(index));
    }
    return parameterElements;
  };

  listToString = () => {
    let filename = "WriteParametersList.csv";
    let text = "";

    for (let index = 0; index < this.props.parameters.length; index++) {
      if (text !== "") {
        text += ",";
      }
      text += this.props.parameters[index].path;
      text += ":" + this.props.parameters[index].value;
    }

    return { text, filename };
  };

  populateWriteData = params => {
    for (let index = 0; index < params.length; index++) {
      let currParam = params[index];
      let newWriteUpdate = {
        path: currParam.path,
        valueWritten: currParam.value,
        metaData: null,
        success: null,
        message: null
      };

      this.props.writeUpdateActions.addWriteData(newWriteUpdate);
    }
  };

  /**
   * To initiate a write we need to:
   * 1) Get the parameter paths the user has entered and has selected
   * 2) Convert those parameter paths to parameterPathDtos so that the server can parse them
   * 3) Get an observable so we can get notification updates asynchronously and do things like update the redux store with these udpates
   * 4) Finally, send the write request with the parameters and values the user has specified to the oeweb server
   */
  initWrite = async () => {
    this.clearPreviousObservableSubscription();
    this.props.writeUpdateActions.deleteAllWriteData();
    let selectedParams = subscriptionApi.getSelectedParameters(
      this.props.parameters
    );
    this.populateWriteData(selectedParams);
    this.isAtLeastOneParameterSelected(selectedParams);

    let selectedParamDtos = subscriptionApi.getParameterDefinitionDtos(
      selectedParams
    );

    let writeObservable = subscriptionApi.getWriteCompleteObservable(
      this._webSocketProcess
    );

    this._subscription = writeObservable.subscribe(notification => {
      this.props.writeUpdateActions.updateWriteData(notification);
    });

    if (this.state.isESigModeEnabled) {
      let parameterPaths = subscriptionApi.getSelectedParameterPaths(
        this.props.parameters
      );
      let valuesToWrite = this.getValues(selectedParams);
      let eSigData = this.getESigData(selectedParams);
      this.writeESigValuesAsync(
        valuesToWrite,
        parameterPaths,
        eSigData,
        this._webSocketProcess
      );
    } else {
      let valuesToWrite = this.getValues(selectedParams);
      this.writeValuesToParametersAsync(
        valuesToWrite,
        selectedParamDtos,
        this._webSocketProcess
      );
    }
  };

  /**
   * Helper function for writing values to parameters
   * @param valuesToWrite
   * @param selectedParamDtos
   * @param webSocketProcess
   */
  private async writeValuesToParametersAsync(
    valuesToWrite: string[],
    selectedParamDtos: ParameterDefinitionDto[],
    webSocketProcess: IWebSocketProcess
  ) {
    for (var i = 0; i < selectedParamDtos.length; i++) {
      console.log("writing value:" + valuesToWrite[i]);
      await subscriptionApi.writeValueAsync(
        webSocketProcess,
        selectedParamDtos[i],
        valuesToWrite[i]
      );
    }
  }

  private async writeESigValuesAsync(
    valuesToWrite: string[],
    selectedParameterPaths: string[],
    eSigData: IESigData[],
    webSocketProcess: IWebSocketProcess
  ) {
    for (var i = 0; i < selectedParameterPaths.length; i++) {
      console.log("writing esig value:" + valuesToWrite[i]);
      await subscriptionApi.writeEsigAsync(
        selectedParameterPaths[i],
        valuesToWrite[i],
        eSigData[i],
        webSocketProcess
      );
    }
  }

  /**
   * Helper function for writing to parameters
   * Given an array of parameters, extracts the values and pushes them to new array
   * @param parameters
   */
  private getValues(parameters: IParameter[]) {
    let valuesToWrite = [];
    for (var i = 0; i < parameters.length; i++) {
      valuesToWrite.push(parameters[i].value);
    }
    return valuesToWrite;
  }

  /**
   * Helper function for writing to Esig parameters
   * Given an array of parameters, extracts the eSigData and pushes them to new array
   * @param parameters
   */
  private getESigData(parameters: IParameter[]) {
    let eSigData: IESigData[] = [];
    for (var i = 0; i < parameters.length; i++) {
      eSigData.push(parameters[i].eSigData);
    }
    return eSigData;
  }

  private isAtLeastOneParameterSelected(parameters: IParameter[]) {
    if (parameters.length === 0) {
      alert(
        "Must select at least one parameter to subscribe to before initiating a subscribe request"
      );
      throw Error(
        "Must select at least one parameter to subscribe to before initiating a subscribe request"
      );
    }
  }

  async getEsigRequirements(): Promise<ESigType[]> {
    let eSigPromises: Promise<ESigType>[] = [];

    for (let index: number = 0; index < this.props.parameters.length; index++) {
      if (this.props.parameters[index].eSigRequirement !== -1) {
        eSigPromises.push(new Promise(() => -2));
      } else {
        eSigPromises.push(
          subscriptionApi.getEsigRequirementsAsync(
            this.props.parameters[index].path,
            this._webSocketProcess
          )
        );
      }
    }

    return await Promise.all(eSigPromises);
  }

  async toggleEsigMode(): Promise<void> {
    await this.setState(prevState => ({
      isESigModeEnabled: !prevState.isESigModeEnabled
    }));

    let eSigRequirements: ESigType[] = await this.getEsigRequirements();
    let updatedParameters: IParameter[] = [];

    for (let index: number = 0; index < eSigRequirements.length; index++) {
      if (eSigRequirements[index] === -2) {
        updatedParameters.push(this.props.parameters[index]);
      } else {
        updatedParameters.push({
          ...this.props.parameters[index],
          eSigRequirement: eSigRequirements[index]
        });
      }
    }

    this.props.parameterWriterActions.updateESigRequirement(updatedParameters);
  }

  private clearPreviousObservableSubscription() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  esigComponent = () => {
    return (
      <div className="eSig">
        <p>Esig mode: </p>
        {this.state.isESigModeEnabled ? (
          <IoIosCheckboxOutline
            fontSize="22px"
            onClick={() => this.toggleEsigMode()}
          />
        ) : (
          <IoIosSquareOutline
            fontSize="22px"
            onClick={() => this.toggleEsigMode()}
          />
        )}
      </div>
    );
  };

  render() {
    return (
      <ListManager
        createItem={this.createParameter}
        readItem={this.readParameter}
        updateItem={this.updateParameter}
        deleteItem={this.deleteParameter}
        renderItem={this.renderParameter}
        itemExists={this.parameterExists}
        listToString={this.listToString}
        listLength={this.props.parameters.length}
        actionButtonTitle={appConstants.LIST_WRITE_TO_PARAMETERS_BUTTON_TEXT}
        initProcessFunction={this.initWrite}
        listManagerClass={"paramPathListAndEsig"}
        esigComponent={this.esigComponent()}
      />
    );
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    parameters: state.parameterWriter.parameters
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    parameterWriterActions: bindActionCreators(
      parameterWriterActions,
      dispatch
    ),
    writeUpdateActions: bindActionCreators(writeUpdateActions, dispatch)
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ParameterWriter);
