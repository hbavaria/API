import { Row, Col, Container } from "react-bootstrap";
import React from "react";
import ParameterControl from "./parameterControl/ParameterControl";
import ParameterResults from "./parameterResults/ParameterResults";

const ParameterTesterPage = () => {
  return (
    <Container bsPrefix={"container-fluid"} className="page-body">
      <Row className="h-100">
        <Col xs={3} className="h-100">
          <ParameterControl />
        </Col>
        <Col xs={9} className="h-100">
          <ParameterResults />
        </Col>
      </Row>
    </Container>
  );
};

export default ParameterTesterPage;
