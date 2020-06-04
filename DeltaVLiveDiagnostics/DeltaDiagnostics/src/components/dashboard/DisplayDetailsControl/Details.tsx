import React from "react";
import { handleFetchAsync } from "../../../utils/api/apiUtils";
import {
  API_GET_DISPLAY_DETAILS_ENDPOINT,
  API_GET_INCLUDE_HEADER,
  API_GET_PRERENDER_DISPLAY_PARAMETERS_ENDPOINT
} from "../../../appConstants";
import JsonViewer from "../../common/JsonViewer";
import { Spinner, Card, Container } from "react-bootstrap";

interface IDetailsProps {
  match: any; //prop from react-router-dom which contains the json key
}

interface IDetailsState {
  jsonKey: string;
  json: any;
  isLoading: boolean;
  responseTime: number;
}

class Details extends React.Component<IDetailsProps, IDetailsState> {
  state = {
    jsonKey: null,
    isLoading: true,
    json: null,
    responseTime: 0
  };

  async getJsonAsync() {
    let displayDetailsFetchResult = await handleFetchAsync(
      API_GET_DISPLAY_DETAILS_ENDPOINT(this.props.match.params.displayName),
      API_GET_INCLUDE_HEADER
    );
    let preRenderParamsFetchResult = await handleFetchAsync(
      API_GET_PRERENDER_DISPLAY_PARAMETERS_ENDPOINT(
        this.props.match.params.displayName,
        null
      ),
      API_GET_INCLUDE_HEADER
    );
    let displayDetails = displayDetailsFetchResult.data;
    let preRenderParams = preRenderParamsFetchResult.data;
    let combinedJson = {
      displayDetails,
      preRenderParams
    };
    await this.setState({
      responseTime: displayDetailsFetchResult.responseTime
    });
    await this.setState({ json: combinedJson });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.getJsonAsync();
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <Spinner animation="border" />
        </div>
      );
    } else {
      return (
        <Container bsPrefix={"container-fluid"} className="page-body">
          <Card className="h-100 flex-grow-1">
            <Card.Body className="card-body h-100">
              <JsonViewer
                data={this.state.json}
                title={this.state.jsonKey}
                responseTime={this.state.responseTime}
                currentDataItem={this.props.match.params.displayName}
                currentDataItemName={"Display"}
              />
            </Card.Body>
          </Card>
        </Container>
      );
    }
  }
}

export default Details;
