import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApiTesterDetailsView from "./ApiTesterDetailsView";
import AccountApiCards from "./ApiCards/AccountApiCards";
import GraphicsApiCards from "./ApiCards/GraphicsApiCards";
import LicenseApiCards from "./ApiCards/LicenseApiCards";
import ProcessApiCards from "./ApiCards/ProcessApiCards";
import * as appConstants from "../../appConstants";
import TabbedCard from "../common/TabbedCard";

class ApiTester extends React.Component {
  render() {
    return (
      <Row className="h-100">
        <Col md={{ span: 6 }} className="h-100">
          <TabbedCard
            defaultActiveKey={appConstants.EVENT_KEY_GRAPHICS_API_CARDS}
            componentsByEventKey={{
              [appConstants.EVENT_KEY_ACCOUNT_API_CARDS]: <AccountApiCards />,
              [appConstants.EVENT_KEY_GRAPHICS_API_CARDS]: <GraphicsApiCards />,
              [appConstants.EVENT_KEY_LICENSE_API_CARDS]: <LicenseApiCards />,
              [appConstants.EVENT_KEY_PROCESS_API_CARDS]: <ProcessApiCards />
            }}
          />
        </Col>
        <Col md={{ span: 6 }} className="h-100">
          <TabbedCard
            defaultActiveKey={appConstants.EVENT_KEY_API_TESTER_DETAILS_VIEW}
            componentsByEventKey={{
              [appConstants.EVENT_KEY_API_TESTER_DETAILS_VIEW]: (
                <ApiTesterDetailsView />
              )
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default ApiTester;
