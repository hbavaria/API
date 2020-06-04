import React from "react";

interface IMetaDataViewerProps {
  responseTime?: number;
  size?: string;
  displayName?: string;
}

class MetaDataViewer extends React.Component<IMetaDataViewerProps> {
  render() {
    return (
      <>
        <p>Display: {this.props.displayName}</p>
        <p>API Response Time: {this.props.responseTime.toFixed(3)} ms</p>
        <p>JSON Size: {this.props.size}</p>
      </>
    );
  }
}

export default MetaDataViewer;
