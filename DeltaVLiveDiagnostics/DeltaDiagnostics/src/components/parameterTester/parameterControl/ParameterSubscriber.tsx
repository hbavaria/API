import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as appConstants from "../../../appConstants";
import ListManager from "../../common/ListManager";
import { IApplicationState } from "../../../store/index";
import * as parameterSubscriberActions from "../../../store/parameterSubscriber/actions";
import * as subscriptionUpdateActions from "../../../store/subscriptionUpdates/actions";
import { IParameter } from "../../../store/parameter/types";
import * as subscriptionApi from "../../../utils/api/subscriptionApi";
import {
  IWebSocketProcess,
  ISubscriptionDataChangedEventArgs
} from "../../../utils/web-sockets/webSocketProcess";
import { Observable, Subscription } from "rxjs";

interface IStateProps {
  parameters: IParameter[];
}

interface IDispatchProps {
  parameterSubscriberActions: typeof parameterSubscriberActions;
  subscriptionUpdateActions: typeof subscriptionUpdateActions;
}

type Props = IStateProps & IDispatchProps;

class ParameterSubscriber extends React.Component<Props> {
  _webSocketProcess: IWebSocketProcess; //subscribes/unsubscribes need to share the same webSocketProcess
  _subscriptionObservable: Observable<ISubscriptionDataChangedEventArgs>;
  _subscription: Subscription;

  //whenever the user leaves the page or freshes the page, make sure we unsubscribe and close the web socket connection
  componentCleanup() {
    this.unsubscribeAllParameters();
    this._webSocketProcess.closeSocketConnectionAsync();
  }

  componentDidMount() {
    window.addEventListener("onbeforeunload", this.componentCleanup);
    this._webSocketProcess = subscriptionApi.getWebSocketProcess();
    this._subscriptionObservable = subscriptionApi.getSubscriptionUpdatesObservable(
      this._webSocketProcess
    );
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("onbeforeunload", this.componentCleanup);
  }

  parameterExists = (parameterPath: string) => {
    for (let index = 0; index < this.props.parameters.length; index++) {
      if (this.props.parameters[index].path === parameterPath) {
        return true;
      }
    }

    return false;
  };

  createParameter = (items: string[]) => {
    this.props.parameterSubscriberActions.createParameter(items);
  };

  readParameter = (index: number) => this.props.parameters[index];

  updateParameter = (index: number, updatedParam: IParameter) =>
    this.props.parameterSubscriberActions.updateParameter(index, updatedParam);

  /**
   * When a parameter is deleted, we need to be sure to unsubscribe from it
   */
  deleteParameter = (indices: number[]) => {
    this.props.parameterSubscriberActions.deleteParameter(indices);
    indices.map(index => this.unsubscribe(index));
  };

  renderParameter = (index: number) => this.props.parameters[index].path;

  listToString = () => {
    let filename = "SubscribeParametersList.csv";
    let text = "";

    for (let index = 0; index < this.props.parameters.length; index++) {
      if (text !== "") {
        text += ",";
      }
      text += this.props.parameters[index].path;
    }

    return { text, filename };
  };

  populateSubscriptionData = params => {
    for (let index = 0; index < params.length; index++) {
      let currParam = params[index];
      let newSubUpdate = {
        subscriptionUpdate: {
          [currParam.path]: {
            value: null,
            timestamp: 0,
            error: null,
            status: null,
            type: null,
            subStatus: 0,
            targetId: null,
            serviceType: null
          }
        },
        metaData: {
          requestSentTimeStamp: 0,
          responseReceivedTimeStamp: 0,
          roundTripTime: 0
        }
      };
      this.props.subscriptionUpdateActions.updateSubscriptionData(newSubUpdate);
    }
  };

  unsubscribeAllParameters(): void {
    for (let index: number = 0; index < this.props.parameters.length; index++) {
      this.unsubscribe(index);
    }
  }

  /**
   * To initiate a subscription we need to:
   * 1) Get the parameter paths the user has entered
   * 2) Convert those parameter paths to parameterPathDtos so that the server can parse them
   * 3) Get an observable so we can get notification updates asynchronously and do things like update the redux store with these udpates
   * 4) Finally, send the subscribe request with the parameters the user has specified to the oeweb server
   */
  initSubscription = () => {
    // clean up any previous subscriptions
    this.clearPreviousObservableSubscription();

    // unsubscribe from all parameters to avoid double subscriptions
    this.unsubscribeAllParameters();

    let selectedParams = subscriptionApi.getSelectedParameters(
      this.props.parameters
    );

    this.isAtLeastOneParameterSelected(selectedParams);

    let selectedParamDtos = subscriptionApi.getParameterDefinitionDtos(
      selectedParams
    );

    //get and subscribe to the observable so that we can see subscription updates
    this._subscription = this._subscriptionObservable.subscribe(
      notification => {
        //store the subscription update in redux
        this.props.subscriptionUpdateActions.updateSubscriptionData(
          notification
        );
      },
      error => {
        console.log(error);
      }
    );

    this.props.subscriptionUpdateActions.deleteAllSubscriptionData();

    this.populateSubscriptionData(selectedParams);

    //finally, send a subscribe request for the parameters the user has specified
    subscriptionApi.subscribe(this._webSocketProcess, selectedParamDtos);
  };

  /**
   * Helper function for when a parameter is deleted from the list
   * Unsubscribes to a parameter, given a parameterIndex
   * @param parameterIndex
   */
  private unsubscribe(parameterIndex: number) {
    let parameterPath = this.props.parameters[parameterIndex];
    let parameterPathDto = subscriptionApi.getParameterDefinitionDtos([
      parameterPath
    ]);

    if (this._webSocketProcess === undefined) return;

    subscriptionApi.unsubscribe(this._webSocketProcess, parameterPathDto);
    this._subscriptionObservable = subscriptionApi.getSubscriptionUpdatesObservable(
      this._webSocketProcess
    );

    this.clearPreviousObservableSubscription();
    //get and subscribe to the observable so that we can see subscription updates
    this._subscription = this._subscriptionObservable.subscribe(
      notification => {
        //store the subscription update in redux
        this.props.subscriptionUpdateActions.updateSubscriptionData(
          notification
        );
      },
      error => {
        console.log(error);
      }
    );
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

  /**
   * Whenever the user initiates a new subscription request, or unsubscribes from a parameter,
   * we need to clear any old/lingering subscriptions by unsubscribing from the observable subscription
   */
  private clearPreviousObservableSubscription() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

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
        actionButtonTitle={
          appConstants.LIST_SUBSCRIBE_TO_PARAMETERS_BUTTON_TEXT
        }
        initProcessFunction={this.initSubscription}
        listManagerClass={"paramPathList"}
      />
    );
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    parameters: state.parameterSubscriber.parameters
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    parameterSubscriberActions: bindActionCreators(
      parameterSubscriberActions,
      dispatch
    ),
    subscriptionUpdateActions: bindActionCreators(
      subscriptionUpdateActions,
      dispatch
    )
  };
}

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ParameterSubscriber);
