import React from "react";
import PerformanceTable from "./PerformanceTableVirtualized";
import Output from "./PerformanceTesterOutput";
import AddButton from "./buttons/AddButton";
import ModifyButton from "./buttons/ModifyButton";
import RemoveSelectedButton from "./buttons/RemoveSelectedButton";
import RunButton from "./buttons/RunButton";
import ExportButton from "./buttons/ExportButton";
import ImportButton from "./buttons/ImportButton";
import SettingsButton from "./buttons/SettingsButton";
import { ButtonGroup, Container, Card } from "react-bootstrap";
import SelectAllButton from "./buttons/SelectAllButton";
import DeselectAllButton from "./buttons/DeselectAllButton";

const PerformanceTesterPage = () => (
  <Container bsPrefix={"container-fluid"} className="page-body">
    <Card className="h-100 flex-grow-1">
      <Card.Body className="card-body h-100">
        <>
          <SettingsButton />
          <ButtonGroup>
            <RunButton />
            <AddButton />
            <ModifyButton />
            <RemoveSelectedButton />
            <SelectAllButton />
            <DeselectAllButton />
            <ExportButton />
            <ImportButton />
          </ButtonGroup>
          <br />
          <PerformanceTable />
          <Output />
        </>
      </Card.Body>
    </Card>
  </Container>
);

export default PerformanceTesterPage;
