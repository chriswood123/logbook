import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";

export default function AddEntry({ entries, setEntries }) {
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

