import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import AddEntry from './AddEntry';
import EntryTable from './EntryTable';

function Prerequisites({ entries, prerequisites }) {
  return <div />;
}

function Summary({ entries }) {
  return <div />;
}

function LogBook({ initialEntries, prerequisites }) {
  const [entries, setEntries] = useState(initialEntries);

  return (
    <Container>
      <Row>
        <Col>
          <AddEntry entries={entries} setEntries={setEntries}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Summary entries={entries} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Prerequisites entries={entries} prerequisites={prerequisites} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EntryTable entries={entries} />
        </Col>
      </Row>
    </Container>
  );
}

export default function App() {
  const exampleEntires = [
    {
      dateFrom: "19/07/2014",
      dateTo: "27/07/2014",
      vesselName: "Wave Glider",
      vesselLength: "38",
      vesselMake: "Farr",
      tidal: true,
      portsVisited: [
        "Namley Harbour",
        "Port Fraser",
        "Rozelle Cove",
        "Dawson Harbour",
        "Namley Harbour"
      ],
      daysOnBoard: 6,
      maxWind: 5,
      capacity: "Crew",
      distanceLogged: 150,
      nightHours: 6,
      skipper: "Graham Huvans",
      example: true
    }
  ];

  const PREREQUISITES = [{}];

  return <LogBook initialEntries={exampleEntires} prerequisites={PREREQUISITES} />;
}
