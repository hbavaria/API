import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import * as appConstants from "../../appConstants";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  IoIosRemoveCircleOutline,
  IoIosCheckboxOutline,
  IoIosSend,
  IoIosTrash,
  IoIosSquareOutline
} from "react-icons/io";
import { IParameter } from "../../store/parameter/types";
import InputWithState from "../common/InputWithState";
import { getSanitizedParams } from "../../utils/userInput";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List
} from "react-virtualized";

export interface IProps {
  createItem: (arg0: string[]) => void;
  readItem: (arg0: number) => IParameter;
  updateItem: (arg0: number, arg1: IParameter) => void;
  deleteItem: (arg0: number[]) => void;
  renderItem: (arg0: number) => any;
  itemExists: (arg0: string) => boolean;
  listToString?: () => { text: string; filename: string };
  initProcessFunction: () => void;
  listLength: number;
  actionButtonTitle: string;
  listManagerClass: string;
  esigComponent?: any;
}

export interface IListManagerState {
  input: string;
  removeIconsHidden: boolean;
  checkboxesHidden: boolean;
}

class ListManager extends React.Component<IProps, IListManagerState> {
  _listRef: any;
  _cache = new CellMeasurerCache({
    fixedHeight: false,
    fixedWidth: true,
    defaultHeight: 200
  });
  state = {
    input: "",
    removeIconsHidden: true,
    checkboxesHidden: true
  };

  deleteSelectedItems = () => {
    let selectedIndices: number[] = [];

    for (
      let index: number = this.props.listLength - 1;
      index >= 0;
      index -= 1
    ) {
      if (this.props.readItem(index).selected) {
        selectedIndices.push(index);
      }
    }

    this.props.deleteItem(selectedIndices);
    this._cache.clearAll();
  };

  deleteAllItems = () => {
    let selectedIndices: number[] = [];

    for (
      let index: number = this.props.listLength - 1;
      index >= 0;
      index -= 1
    ) {
      selectedIndices.push(index);
    }

    this.props.deleteItem(selectedIndices);
    this._cache.clearAll();
  };

  toggleRemoveIconsHidden = async () => {
    await this.setState(prevState => ({
      removeIconsHidden: !prevState.removeIconsHidden
    }));
    this._listRef.forceUpdateGrid();
  };

  toggleCheckboxesHidden = async () => {
    await this.setState(prevState => ({
      checkboxesHidden: !prevState.checkboxesHidden
    }));
    this._listRef.forceUpdateGrid();
  };

  updateAllItemSelection = (selected: boolean) => {
    for (let index = 0; index < this.props.listLength; index += 1) {
      let param = this.props.readItem(index);
      let updatedParam: IParameter = { selected: selected, path: param.path };
      this.props.updateItem(index, updatedParam);
    }
    this._listRef.forceUpdateGrid();
  };

  toggleCheckbox = (index: number) => {
    let param = this.props.readItem(index);
    let updatedParam: IParameter = {
      selected: !param.selected,
      path: param.path
    };
    this.props.updateItem(index, updatedParam);
    this._listRef.forceUpdateGrid();
  };

  handleInput = (input: string) => {
    let cleanData: string[] = getSanitizedParams(input);
    let newValsAdded: string[] = [];
    let alertBadPath: boolean = false;
    let data: string;

    for (let index: number = 0; index < cleanData.length; index++) {
      data = cleanData[index];

      if (!data.includes("/")) {
        alertBadPath = true;
      } else if (!this.props.itemExists(data) && !newValsAdded.includes(data)) {
        newValsAdded.push(data);
      }
    }

    this.props.createItem(newValsAdded);
    this._listRef.forceUpdateGrid();
    this._cache.clearAll();
    if (alertBadPath) {
      alert(
        "One or more parameter paths will be ignored due to incorrect formatting"
      );
    }
    return "";
  };

  renderItemList = (checkboxesHidden: boolean, removeIconsHidden: boolean) => {
    let itemListJsx: any[] = [];

    for (let index: number = 0; index < this.props.listLength; index += 1) {
      let param: IParameter = this.props.readItem(index);
      let checkbox: any = param.selected ? (
        <IoIosCheckboxOutline />
      ) : (
        <IoIosSquareOutline />
      );
      itemListJsx.push(
        <ListGroup.Item
          key={index}
          className="d-flex justify-content-between align-items-center"
          variant={param.selected ? "primary" : "light"}
        >
          <div hidden={removeIconsHidden}>
            <IoIosRemoveCircleOutline
              onClick={() => this.props.deleteItem([index])}
              style={{ color: "red" }}
            />
          </div>
          <div>{this.props.renderItem(index)}</div>
          <div
            hidden={checkboxesHidden}
            onClick={() => this.toggleCheckbox(index)}
          >
            {checkbox}
          </div>
        </ListGroup.Item>
      );
    }
    return itemListJsx;
  };

  renderItem = (itemIndex, style, key, parent) => {
    let param: IParameter = this.props.readItem(itemIndex);
    let checkbox: any = param.selected ? (
      <IoIosCheckboxOutline />
    ) : (
      <IoIosSquareOutline />
    );
    return (
      <CellMeasurer
        key={key}
        parent={parent}
        cache={this._cache}
        columnIndex={0}
        rowIndex={itemIndex}
      >
        <ListGroup.Item
          key={itemIndex}
          className="d-flex justify-content-between align-items-center"
          style={style}
          variant={param.selected ? "primary" : "light"}
        >
          <div hidden={this.state.removeIconsHidden}>
            <IoIosRemoveCircleOutline
              onClick={() => this.props.deleteItem([itemIndex])}
              style={{ color: "red" }}
            />
          </div>
          <div>{this.props.renderItem(itemIndex)}</div>
          <div
            hidden={this.state.checkboxesHidden}
            onClick={() => this.toggleCheckbox(itemIndex)}
          >
            {checkbox}
          </div>
        </ListGroup.Item>
      </CellMeasurer>
    );
  };

  rowRenderer = ({ index, style, key, parent }) => {
    return this.renderItem(index, style, key, parent);
  };

  renderListHeader() {
    return (
      <InputWithState
        buttonText={appConstants.LIST_ADD_PARAMETER_BUTTON_TEXT}
        placeholder={"Parameter Path"}
        defaultValue={""}
        handleInput={this.handleInput}
        fileSelectionEnabled={true}
        listToString={this.props.listToString}
      />
    );
  }

  renderVirtualizedList() {
    return (
      <ListGroup className={this.props.listManagerClass}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={ref => (this._listRef = ref)}
              deferredMeasurementcache={this._cache}
              width={width}
              height={height}
              rowCount={this.props.listLength}
              rowHeight={this._cache.rowHeight}
              rowRenderer={this.rowRenderer}
              overscanRowCount={5}
            />
          )}
        </AutoSizer>
      </ListGroup>
    );
  }

  renderListFooter() {
    return (
      <div className="d-flex flex-column w-100">
        <ButtonGroup>
          <DropdownButton
            id={"button1"}
            as={ButtonGroup}
            title={<IoIosTrash fontSize="22px" />}
            drop="up"
            variant="outline-danger"
            className="w-100"
          >
            <Dropdown.Item eventKey="1" onClick={this.deleteSelectedItems}>
              {appConstants.LIST_MANAGER_REMOVE_SELECTED_BUTTON_TEXT}
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={this.deleteAllItems}>
              {appConstants.LIST_MANAGER_REMOVE_ALL_BUTTON_TEXT}
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={this.toggleRemoveIconsHidden}>
              {appConstants.LIST_MANAGER_TOGGLE_REMOVE_BUTTON_TEXT}
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id={"button2"}
            as={ButtonGroup}
            title={<IoIosCheckboxOutline fontSize="22px" />}
            drop="up"
            variant="outline-secondary"
            className="w-100"
          >
            <Dropdown.Item eventKey="1" onClick={this.toggleCheckboxesHidden}>
              {appConstants.LIST_MANAGER_TOGGLE_CHECKBOXES_BUTTON_TEXT}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => this.updateAllItemSelection(true)}
            >
              {appConstants.LIST_MANAGER_SELECT_ALL_BUTTON_TEXT}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              onClick={() => this.updateAllItemSelection(false)}
            >
              {appConstants.LIST_MANAGER_DESELECT_ALL_BUTTON_TEXT}
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id={"button3"}
            as={ButtonGroup}
            title={<IoIosSend fontSize="22px" />}
            drop="up"
            variant="outline-success"
            className="w-100"
          >
            <Dropdown.Item onClick={() => this.props.initProcessFunction()}>
              Start
            </Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="h-100">
        {this.props.esigComponent}
        {this.renderListHeader()}
        {this.renderVirtualizedList()}
        {this.renderListFooter()}
      </div>
    );
  }
}

export default ListManager;
