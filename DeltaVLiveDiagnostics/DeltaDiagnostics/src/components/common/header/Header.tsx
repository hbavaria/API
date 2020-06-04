import { Row, Col, Container } from "react-bootstrap";
import React from "react";
import * as appConstants from "../../../appConstants";
import Sidebar from "./sidebar/Sidebar";
import SidebarController from "./sidebar/SidebarController";

const Header = () => {
  return (
    <Container
      bsPrefix={"container-fluid"}
      id="header"
      className="border-bottom border-dark flex-shrink-1"
    >
      <Sidebar />
      <Row>
        <Col md={{ span: 1 }}>
          <SidebarController />
        </Col>
        <Col md={{ span: 10 }} className="text-center">
          <h1>{appConstants.APP_TITLE}</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
