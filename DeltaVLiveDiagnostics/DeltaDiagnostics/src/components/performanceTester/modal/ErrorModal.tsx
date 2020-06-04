import React from "react";
import { Modal, Button } from "react-bootstrap";
import ErrorReport from "./ErrorReport";
interface ModalProps {
  show?: any;
  onHide?: any;
  displayName: string;
  displayTestId: string;
}

class ErrorModal extends React.Component<ModalProps> {
  renderModalBody() {
    return (
      <>
        <ErrorReport
          displayName={this.props.displayName}
          displayTestId={this.props.displayTestId}
        />
      </>
    );
  }

  renderModalTitle() {
    return `Error Report: ${this.props.displayName}`;
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.renderModalTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderModalBody()}</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ErrorModal;
