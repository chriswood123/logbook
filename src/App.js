import "./styles.css";
import Table from 'react-bootstrap/Table';
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
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Date From: <input name="dateFrom" />
      </label>
      <br />
      <label>
        Date To: <input name="dateTo" />
      </label>
      <br />
      <label>
        Vessel Name: <input name="vesselName" />
      </label>
      <br />
      <label>
        Vessel Make: <input name="vesselMake" />
      </label>
      <br />
      <label>
        Vessel Length: <input name="vesselLength" />
      </label>
      <br />
      <label>
        Ports Visited: <input name="portsVisited" />
      </label>
      <br />
      <label>
        Days On Board: <input name="daysOnBoard" />
      </label>
      <br />
      <label>
        Tidal: <input type="checkbox" name="tidal" defaultChecked={false} />
      </label>
      <br />
      <label>
        Max Wind: <input name="maxWind" />
      </label>
      <br />
      <label>
        Capacity On Board: <input name="capacityOnBoard" />
      </label>
      <br />
      <label>
        Distance Logged: <input name="distanceLogged" />
      </label>
      <br />
      <label>
        Night Hours: <input name="nightHours" />
      </label>
      <br />
      <label>
        Skipper: <input name="skipper" />
      </label>
      <br />
      <button type="submit">Add Entry</button>
    </form>
  )
}

function LogBook({ initialEntries, prerequisites }) {
  const [entries, setEntries] = useState(initialEntries);

  return (
    <>
      <AddEntry entries={entries} setEntries={setEntries}/>
      <Summary entries={entries} />
      <Prerequisites entries={entries} prerequisites={prerequisites} />
      <EntryTable entries={entries} />
    </>
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
