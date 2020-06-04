import { Row, Col, Container } from "react-bootstrap";
import React from "react";
import PerformanceLineGraph from "./PerformanceLineGraph";
import PerformanceTests from "./PerformanceTests";
import PerformanceTable from "./PerformanceTable";
import TabbedCard from "../common/TabbedCard";
import PerformanceBoxPlot from "./PerformanceBoxPlot";
const PerformanceResultsPage = () => {
  return (
    <Container bsPrefix={"container-fluid"} className="page-body">
      <Row className="h-100">
        <Col xs={3} className="h-100">
          <TabbedCard
            defaultActiveKey={"Tests"}
            componentsByEventKey={{
              ["Tests"]: <PerformanceTests />
            }}
          />
        </Col>
        <Col xs={9} className="h-100">
          <TabbedCard
            defaultActiveKey={"Box Plot"}
            componentsByEventKey={{
              ["Box Plot"]: <PerformanceBoxPlot />,
              ["Line Graph"]: <PerformanceLineGraph />,
              ["Table"]: <PerformanceTable />
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PerformanceResultsPage;
