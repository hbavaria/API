import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IStateProps {
  selectedDisplay?: string;
  instanceId?: string;
}

class DisplayDetailsView extends React.Component<IStateProps> {
  renderSelectDisplayMessage() {
    return <p>Please select a display to view its details</p>;
  }

  renderDetailCards() {
    return (
      <>
        <Card>
          <Card.Header>Display Details</Card.Header>
          <Card.Body>
            <Card.Text>View details for {this.props.selectedDisplay}</Card.Text>
            <Link to={`/DisplayDetails/${this.props.selectedDisplay}`}>
              <Button variant="primary">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Reference Data</Card.Header>
          <Card.Body>
            <Card.Text>
              View Reference Data for {this.props.selectedDisplay}
            </Card.Text>
            <Link
              to={`/ReferenceData/${this.props.selectedDisplay}/${
                this.props.instanceId
              }`}
            >
              <Button variant="primary">View Reference Data</Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  }

  render() {
    if (this.props.selectedDisplay === "") {
      return this.renderSelectDisplayMessage();
    } else {
      return this.renderDetailCards();
    }
  }
}

function mapStateToProps(state: IApplicationState) {
  return {
    selectedDisplay: state.selectedDisplay.selectedDisplay,
    instanceId: state.instanceId.instanceId
  };
}

export default connect<IStateProps, null>(
  mapStateToProps,
  null
)(DisplayDetailsView);
