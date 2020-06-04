import Inspector from "react-json-inspector";
import Col from "react-bootstrap/Col";
import React from "react";
import { connect } from "react-redux";
import { getJsonSize, getFormattedByteString } from "../../utils/json-size";
import { IApplicationState } from "../../store";

interface IJsonViewerProps {
  data: any;
  title: string;
  responseTimeKey?: string;
  responseTime?: number;
  currentDataItemName: string;
  currentDataItem: string;
}

interface IStateProps {
  responseTimes?: any;
}

type JsonViewerProps = IStateProps & IJsonViewerProps;

class JsonViewer extends React.Component<JsonViewerProps> {
  renderJsonSize = () => {
    const jsonSizeInBytes: number = getJsonSize(this.props.data);
    const jsonSizeFormatted: string = getFormattedByteString(jsonSizeInBytes);
    return <p>JSON Size: {jsonSizeFormatted}</p>;
  };

  renderResponseTime = () => {
    const { responseTimes, responseTimeKey, responseTime } = this.props;
    let time = responseTime;
    if (responseTimeKey) {
      time = responseTimes[responseTimeKey];
    }
    return <p>API Response Time: {time.toFixed(3)} ms</p>;
  };

  renderCurrentDataItemAndName = () => {
    let isCurrentDataItemName = this.props.currentDataItemName !== "";
    if (isCurrentDataItemName) {
      return (
        <p>
          {`${this.props.currentDataItemName}: ${this.props.currentDataItem}`}
        </p>
      );
    }
    return "";
  };

  render() {
    return (
      <Col>
        <div className="json-viewer-container">
          <h2 className="text-center">{this.props.title}</h2>
          <div className="json-viewer">
            {this.renderCurrentDataItemAndName()}
            {this.renderResponseTime()}
            {this.renderJsonSize()}
            <Inspector
              data={this.props.data}
              // configuration for json inspector, for more details see: https://github.com/Lapple/react-json-inspector
              searchOptions={{ debounceTime: 500 }}
              filterOptions={{ cacheResults: false }}
            />
          </div>
        </div>
      </Col>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    responseTimes: state.responseTimes
  };
}

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(JsonViewer);
