import React from "react";
import { connect } from "react-redux";
import JsonViewer from "../common/JsonViewer";
import { IApplicationState } from "../../store";

interface IStateProps {
  json?: object;
  endpoint?: string;
}

type Props = IStateProps;

class ApiTesterDetailsView extends React.Component<Props> {
  mergeJson() {
    const mergedJson = {
      response: this.props.json
    };
    return mergedJson;
  }

  render() {
    return (
      <JsonViewer
        data={this.mergeJson()}
        title="API Details"
        responseTimeKey="apiTester"
        currentDataItem={this.props.endpoint}
        currentDataItemName="API Endpoint"
      />
    );
  }
}

function mapStateToProps(state: IApplicationState): IStateProps {
  return {
    json: state.apiTester.json,
    endpoint: state.apiTester.endpoint
  };
}

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(ApiTesterDetailsView);
