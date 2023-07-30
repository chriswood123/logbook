import "./styles.css";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

function Port({ port, portKey }) {
  return(
    <li key={portKey}>{port}</li>
  )
}

function PortsVisited({ portsVisited }) {
  const ports = [];
  let i = 0;
  portsVisited.forEach((port) => {
    ports.push(<Port portKey={i} port={port} />);
    i = i + 1;
  })
  return (
    <ul>
      {ports}
    </ul>
  )
}

function Entry({ entry }) {
  let isTidal = ""
  if (entry["tidal"] === true) {
    isTidal = "Yes"
  } else {
    isTidal = "No"
  }

  return (
    <tr>
      <td>{entry["dateFrom"]}</td>
      <td>{entry["dateTo"]}</td>
      <td>{entry["vesselName"]}</td>
      <td>{entry["vesselLength"]}</td>
      <td>{entry["vesselMake"]}</td>
      <td>
        <PortsVisited portsVisited={entry["portsVisited"]} />
      </td>
      <td>{entry["daysOnBoard"]}</td>
      <td>{isTidal}</td>
      <td>{entry["maxWind"]}</td>
      <td>{entry["capacity"]}</td>
      <td>{entry["distanceLogged"]}</td>
      <td>{entry["nightHours"]}</td>
      <td>{entry["skipper"]}</td>
    </tr>
  );
}

function EntryTable({ entries }) {
  const entryRows = [];

  entries.forEach((entry) => {
    entryRows.push(<Entry entry={entry} />);
  });

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Date From</th>
          <th>Date To</th>
          <th>Vessel Name</th>
          <th>Vessel Make</th>
          <th>Vessel Length</th>
          <th>Ports Visited</th>
          <th>Days On Board</th>
          <th>Tidal</th>
          <th>Max Wind</th>
          <th>Capacity On Board</th>
          <th>Distance Logged</th>
          <th>Night Hours</th>
          <th>Skipper</th>
        </tr>
      </thead>
      <tbody>{entryRows}</tbody>
    </Table>
  );
}

function Prerequisites({ entries, prerequisites }) {
  return <div />;
}

function Summary({ entries }) {
  return <div />;
}

function AddEntry({ entries, setEntries }) {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    let isTidal = false;
    if (formJson.tidal === "on") {
      isTidal = true;
    }

    const newEntry = {
      dateFrom: formJson.dateFrom,
      dateTo: formJson.dateTo,
      vesselName: formJson.vesselName,
      vesselLength: formJson.vesselLength,
      vesselMake: formJson.vesselMake,
      tidal: isTidal,
      portsVisited: formJson.portsVisited.split(', '),
      daysOnBoard: formJson.daysOnBoard,
      maxWind: formJson.maxWind,
      capacity: formJson.capacityOnBoard,
      distanceLogged: formJson.distanceLogged,
      nightHours: formJson.nightHours,
      skipper: formJson.skipper
    };

    // Remove the example entry when adding
    // the first real entry
    if (entries.length === 1) {
      console.log('1');
      if (entries[0].example) {
        setEntries([newEntry]);
      } else {
        setEntries([...entries, newEntry]);
      }
    } else {
      setEntries([...entries, newEntry]);
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="dateFrom">
            <Form.Label>
              Date From
            </Form.Label>
            <Form.Control type="date" name="dateFrom" size="sm" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateTo">
            <Form.Label>
              Date To
            </Form.Label>
            <Form.Control type="date" name="dateTo" />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="vesselName">
            <Form.Label>
              Vessel Name
            </Form.Label>
            <Form.Control type="text" name="vesselName" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="vesselMake">
            <Form.Label>
              Vessel Make
            </Form.Label>
            <Form.Control type="text" name="vesselMake" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="vesselLength">
            <Form.Label>
              Vessel Length
            </Form.Label>
            <Form.Control type="text" name="vesselLength" />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="portsVisited">
            <Form.Label>
              Ports Visited
            </Form.Label>
            <Form.Control type="text" name="portsVisited" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tidal">
            <Form.Label>
              Tidal
            </Form.Label>
            <Form.Check type="checkbox" name="tidal" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="maxWind">
            <Form.Label>
              Max Wind
            </Form.Label>
            <Form.Control type="text" name="maxWind" />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="capacityOnBoard">
            <Form.Label>
              Capacity On Board
            </Form.Label>
            <Form.Control type="text" name="capacityOnBoard" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="distanceLogged">
            <Form.Label>
              Distance Logged
            </Form.Label>
            <Form.Control type="text" name="distanceLogged" />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="nightHours">
            <Form.Label>
              Night Hours
            </Form.Label>
            <Form.Control type="text" name="nightHours" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="skipper">
            <Form.Label>
              Skipper
            </Form.Label>
            <Form.Control type="text" name="skipper" />
          </Form.Group>
          <Form.Group>
            <button type="submit">Add Entry</button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
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
