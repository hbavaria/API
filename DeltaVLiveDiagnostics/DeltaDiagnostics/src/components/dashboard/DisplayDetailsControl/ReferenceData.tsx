import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import MetaDataViewer from "../../common/MetaDataViewer";
import { getFormattedByteString, getJsonSize } from "../../../utils/json-size";
import {
  API_GET_DISPLAY_REFERENCES_ENDPOINT,
  API_GET_INCLUDE_HEADER
} from "../../../appConstants";
import { handleFetchAsync } from "../../../utils/api/apiUtils";
import { Spinner, Container, Card } from "react-bootstrap";

interface IStateProps {
  match?: any;
}

interface IReferenceDataState {
  isLoading: boolean;
  responseTime: number;
  referenceData: any;
}

class ReferenceDataTable extends React.Component<
  IStateProps,
  IReferenceDataState
> {
  state = {
    isLoading: true,
    responseTime: 0,
    referenceData: []
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.formatReferenceData();
    this.setState({ isLoading: false });
  }

  async formatReferenceData() {
    let referenceData = await this.fetchReferenceDataAsync();
    let parsedRefData = JSON.parse(referenceData.data.referenceData);
    let newTargetMap = [];
    for (var name in parsedRefData.targetMap) {
      let newNode = { name, ...parsedRefData.targetMap[name] };
      newTargetMap.push(newNode);
    }
    this.setState({ responseTime: referenceData.responseTime });
    this.setState({ referenceData: newTargetMap });
  }

  async fetchReferenceDataAsync() {
    let referenceDataFetchResult = await handleFetchAsync(
      API_GET_DISPLAY_REFERENCES_ENDPOINT(
        this.props.match.params.displayName,
        this.props.match.params.instanceId
      ),
      API_GET_INCLUDE_HEADER
    );
    return referenceDataFetchResult;
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
              <div className="reference-data-container">
                <h2 className="text-center">Reference Data</h2>
                <MetaDataViewer
                  size={getFormattedByteString(
                    getJsonSize(this.state.referenceData)
                  )}
                  displayName={this.props.match.params.displayName}
                  responseTime={this.state.responseTime}
                />
                <BootstrapTable
                  data={this.state.referenceData}
                  height="auto"
                  scrollTop={"Bottom"}
                  version="4"
                >
                  <TableHeaderColumn
                    dataField="name"
                    filter={{ type: "TextFilter" }}
                    isKey
                  >
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="type"
                    filter={{ type: "TextFilter" }}
                  >
                    Type
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="sourceId"
                    filter={{ type: "TextFilter" }}
                  >
                    SourceID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="value"
                    filter={{ type: "TextFilter" }}
                  >
                    Value
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </Card.Body>
          </Card>
        </Container>
      );
    }
  }
}

export default ReferenceDataTable;
