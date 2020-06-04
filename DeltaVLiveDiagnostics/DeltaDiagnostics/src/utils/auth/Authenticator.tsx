import React from "react";
import { Redirect } from "react-router-dom";
import auth from "./auth";
import {
  DASHBOARD_PAGE_LINK,
  API_AUTH_LOGIN_ENDPOINT,
  API_AUTH_TOKEN_ENDPOINT
} from "../../appConstants";
import { Spinner } from "react-bootstrap";
class Authenticator extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true
  };
  async componentDidMount() {
    let loginInfo = await fetch(API_AUTH_TOKEN_ENDPOINT); //fetches auth token so that subsequent requests can authenticate
    let loginJson = await loginInfo.json();
    let loginResp = await fetch(API_AUTH_LOGIN_ENDPOINT, {
      //logs in to OeWeb and sets a cookie in the browser
      credentials: "include",
      method: "POST",
      body: JSON.stringify(loginJson),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (loginResp.status === 200) {
      auth.login();
      this.setState({ isLoggedIn: true, isLoading: false });
    }
  }
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to={DASHBOARD_PAGE_LINK} />;
    } else if (this.state.isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner animation="border" />
        </div>
      );
    } else {
      return <p>Error - could not authenticate to OeWeb.</p>;
    }
  }
}

export default Authenticator;
