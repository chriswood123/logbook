import Table from 'react-bootstrap/Table';

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

export default function EntryTable({ entries }) {
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