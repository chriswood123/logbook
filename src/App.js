import "./styles.css";

const ENTRIES = [
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
    skipper: "Graham Huvans"
  }
];

const PREREQUISITES = [{}];

function Entry({ entry }) {
  return (
    <tr>
      <td>{entry["dateFrom"]}</td>
      <td>{entry["dateTo"]}</td>
      <td>{entry["vesselName"]}</td>
      <td>{entry["vesselLength"]}</td>
      <td>{entry["vesselMake"]}</td>
      <td>{entry["portsVisited"]}</td>
      <td>{entry["daysOnBoard"]}</td>
      <td>{entry["tidal"]}</td>
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
    <table>
      <thead>
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
      </thead>
      <tbody>{entryRows}</tbody>
    </table>
  );
}

function Prerequisites({ entries, prerequisites }) {
  return <div />;
}

function Summary({ entries }) {
  return <div />;
}

function AddEntry() {
  return <div />;
}

function LogBook({ entries, prerequisites }) {
  return (
    <>
      <AddEntry />
      <Summary entries={entries} />
      <Prerequisites entries={entries} prerequisites={prerequisites} />
      <EntryTable entries={entries} />
    </>
  );
}

export default function App() {
  return <LogBook entries={ENTRIES} prerequisites={PREREQUISITES} />;
}
