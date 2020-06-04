import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddInputs from "./AddInputs";
import ModifyInputs from "./ModifyInputs";
import SettingInputs from "./SettingInputs";
import SaveInputs from "./SaveInputs";

interface ModalProps {
  show?: any;
  onHide?: any;
  isAddModal?: boolean;
  isModifyModal?: boolean;
  isSettingsModal?: boolean;
  isSaveModal?: boolean;
}

class PerformanceTesterModal extends React.Component<ModalProps> {
  renderModalBody() {
    if (this.props.isModifyModal) {
      return <ModifyInputs />;
    } else if (this.props.isSettingsModal) {
      return <SettingInputs />;
    } else if (this.props.isSaveModal) {
      return <SaveInputs />;
    } else {
      return <AddInputs />;
    }
  }

  renderModalTitle() {
    if (this.props.isModifyModal) {
      return "Modify Performance Item";
    } else if (this.props.isSettingsModal) {
      return "Performance Tester Settings";
    } else if (this.props.isSaveModal) {
      return "Save Performance Tester";
    } else {
      return "Add Performance Item";
    }
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

export default PerformanceTesterModal;
