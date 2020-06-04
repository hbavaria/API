import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import * as appConstants from "../../../appConstants";
import MetaDataViewer from "../../common/MetaDataViewer";
import { getJsonSize, getFormattedByteString } from "../../../utils/json-size";

interface IStateProps {
  selectedDisplay?: string;
  preRenderDisplay?: any;
  preRenderDisplayResponseTime?: number;
}

class PreRenderDisplay extends React.Component<IStateProps> {
  renderHtml() {
    let isValidHtml = this.props.preRenderDisplay.renderedHtml !== undefined;
    if (isValidHtml) {
      return { __html: this.props.preRenderDisplay.renderedHtml };
    } else {
      return { __html: appConstants.NO_PRE_RENDER_MESSAGE };
    }
  }

  render() {
    return (
      <>
        <h2 className="text-center">Prerender Display</h2>
        <MetaDataViewer
          displayName={this.props.selectedDisplay}
          size={getFormattedByteString(
            getJsonSize(this.props.preRenderDisplay)
          )}
          responseTime={this.props.preRenderDisplayResponseTime}
        />
        <div
          className="pre-render-container"
          dangerouslySetInnerHTML={this.renderHtml()}
        />
      </>
    );
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    selectedDisplay: state.selectedDisplay.selectedDisplay,
    preRenderDisplay: state.displayPreRenderDisplay.displayPreRenderDisplay,
    preRenderDisplayResponseTime: state.responseTimes.displayPrerenderDisplay
  };
}

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(PreRenderDisplay);
