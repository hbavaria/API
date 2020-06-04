import React from "react";
import { Form } from "react-bootstrap";

interface IParameterTextAreaProps {
  textArea: string;
  handleTextAreaChange: any;
  handleFileChange: any;
  fileName: string;
}

class ParameterTextArea extends React.Component<IParameterTextAreaProps> {
  getParameterCount() {
    if (this.props.textArea === "") {
      return 0;
    } else {
      return this.props.textArea.split(",").length;
    }
  }

  render() {
    return (
      <Form.Group>
        <Form.Label>Display Parameters</Form.Label>
        <Form.Text className="text-muted">
          parameter count: {this.getParameterCount()}
        </Form.Text>
        <Form.Control
          as="textarea"
          rows="5"
          placeholder="Enter parameters here (separated by comma)"
          value={this.props.textArea}
          onChange={this.props.handleTextAreaChange}
        />
        <Form.Control
          key={Date.now()} // adding a key refreshes the form input on re-render so that a new file can be loaded. This fixes a bug where the user cannot load a second file after loading one.
          type="file"
          accept=".csv"
          onChange={this.props.handleFileChange}
        />
        <Form.Text className="text-muted">{this.props.fileName}</Form.Text>
      </Form.Group>
    );
  }
}

export default ParameterTextArea;
