import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FormControl,
  Button,
  InputGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import "../../index.css";
import { IoIosDocument } from "react-icons/io";

export interface IProps {
  defaultValue: any;
  handleInput: (arg1) => string;
  placeholder: string;
  buttonText?: string;
  fileSelectionEnabled: boolean;
  listToString?: () => { text: string; filename: string };
}

type Props = IProps;

export interface IState {
  input: string;
}

type State = IState;

class InputWithState extends React.Component<Props, State> {
  state = {
    input: this.props.defaultValue === undefined ? "" : this.props.defaultValue
  };

  saveList = () => {
    let listToStringObj = this.props.listToString();
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(listToStringObj.text)
    );
    element.setAttribute("download", listToStringObj.filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  readFileText = file => {
    let fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException("Problem parsing input file"));
      };

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsText(file);
    });
  };

  handleFile = async event => {
    if (event.target.files.length === 0) return;

    let file = event.target.files[0];
    event.target.value = null;

    try {
      let text = await this.readFileText(file);
      this.props.handleInput(text);
    } catch (e) {
      console.log(e);
    }
  };

  setValue = (): void => {
    if (!this.state.input) {
      alert("No input detected!");
      this.setState({ input: this.props.defaultValue });
      return;
    }
    let newDefault = this.props.handleInput(this.state.input);
    this.setState({ input: newDefault });
  };

  render() {
    let conditionalJsx: JSX.Element = this.props.fileSelectionEnabled ? (
      <DropdownButton
        className="zIndex1"
        as={InputGroup.Prepend}
        id="dropdownid"
        title={<IoIosDocument />}
        tooltip="Select a file to import Parameter Paths from"
        variant="outline-secondary"
        data-toggle="dropdown"
      >
        <Dropdown.Item eventKey="1" as="div" className="upload-btn-wrapper">
          Load List
          <input type="file" accept=".csv" onChange={e => this.handleFile(e)} />
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" as="button" onClick={this.saveList}>
          Save List
        </Dropdown.Item>
      </DropdownButton>
    ) : null;

    let conditionalButton: JSX.Element =
      this.props.buttonText !== undefined ? (
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={event => {
              event.preventDefault();
              this.setValue();
            }}
            disabled={this.props.defaultValue === this.state.input}
          >
            {this.props.buttonText}
          </Button>
        </InputGroup.Append>
      ) : null;
    return (
      <InputGroup className="mb-3">
        {conditionalJsx}
        <FormControl
          placeholder={this.props.placeholder}
          value={this.state.input}
          onChange={event => {
            this.setState({ input: event.target.value });
          }}
          onBlur={this.props.buttonText === undefined ? this.setValue : null}
        />
        {conditionalButton}
      </InputGroup>
    );
  }
}

export default InputWithState;
