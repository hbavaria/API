import DisplayControl from "./DisplayControl/DisplayControl";
import { Row, Col, Container } from "react-bootstrap";
import React from "react";
import DisplayDetailsControl from "./DisplayDetailsControl/DisplayDetailsControl";

const DashboardPage = () => {
  return (
    <Container bsPrefix={"container-fluid"} className="page-body">
      <Row className="h-100">
        <Col xs={3} className="h-100">
          <DisplayControl />
        </Col>
        <Col xs={9} className="h-100">
          <DisplayDetailsControl />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
