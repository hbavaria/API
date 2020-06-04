import React from "react";
import DisplayDetailsSearch from "./DisplayDetailsSearch";
import ControlTagDisplaySearch from "./ControlTagDisplaySearch";

class DisplaySearch extends React.Component {
  render() {
    return (
      <div className="search-container">
        <ControlTagDisplaySearch />
        <DisplayDetailsSearch />
      </div>
    );
  }
}

export default DisplaySearch;
