import React from "react";
import { Card, Tab, Nav } from "react-bootstrap";

export interface ITabbedCardProps {
  defaultActiveKey: string;
  componentsByEventKey: object;
}

class TabbedCard extends React.Component<ITabbedCardProps> {
  generateNavItems = () => {
    let navContentJsx: any[] = [];
    for (let eventKey of Object.keys(this.props.componentsByEventKey)) {
      navContentJsx.push(
        <Nav.Item key={eventKey}>
          <Nav.Link eventKey={eventKey}>{eventKey}</Nav.Link>
        </Nav.Item>
      );
    }

    return navContentJsx;
  };

  generateTabPanes = () => {
    let tabContentJsx: any[] = [];

    for (let [eventKey, component] of Object.entries(
      this.props.componentsByEventKey
    )) {
      tabContentJsx.push(
        <Tab.Pane key={eventKey} eventKey={eventKey} className="h-100">
          {component}
        </Tab.Pane>
      );
    }

    return tabContentJsx;
  };

  render() {
    return (
      <Tab.Container defaultActiveKey={this.props.defaultActiveKey}>
        <Card className="h-100 flex-grow-1">
          <Card.Header>
            <Nav variant="tabs">{this.generateNavItems()}</Nav>
          </Card.Header>
          <Card.Body className="card-body h-100">
            <Tab.Content className="h-100">
              {this.generateTabPanes()}
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    );
  }
}

export default TabbedCard;
