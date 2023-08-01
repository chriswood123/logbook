import { Table } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Collapse } from "react-bootstrap";

function calculateMiles(entries, asSkipper=false) {
    let totalMiles = 0;
    entries.forEach((entry) => {
        if (asSkipper) {
            // console.log('skipper')
            // console.log('capacity' + entry["capacity"].toLowerCase)
            // if (entry["capacity"].toLowerCase === "skipper") {
            if (entry["capacity"] === "skipper") {
                totalMiles = totalMiles + parseInt(entry["distanceLogged"]);
            }
        } else {
            totalMiles = totalMiles + parseInt(entry["distanceLogged"]);
        }
    });

    return totalMiles;
}

function calculateNightHours(entries) {
    let totalNightHours = 0;
    entries.forEach((entry) => {
        totalNightHours = totalNightHours + parseInt(entry["nightHours"])
    });

    return totalNightHours;
}

export default function Summary({ entries }) {
    const [open, setOpen] = useState(false);

    const totalMiles = calculateMiles(entries);
    const totalMilesAsSkipper = calculateMiles(entries, true);
    const totalNightHours = calculateNightHours(entries);

    return(
        <>
            <Button
                variant="light"
                onClick={() => setOpen(!open)}
                aria-controls="summary-table"
                aria-expanded={open}
            >
            Toggle Summary
            </Button>
            <Collapse in={open}>
                <Table bordered id="summary-table">
                    <thead>
                        <tr>
                            <th class="text-end"></th>
                            <th class="text-center">Total Miles</th>
                            <th class="text-center">Total Miles as Skipper</th>
                            <th class="text-center">Total Night Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" class="text-end">Total</th>
                            <td class="text-center">{totalMiles}</td>
                            <td class="text-center">{totalMilesAsSkipper}</td>
                            <td class="text-center">{totalNightHours}</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-end">Tidal</th>
                            <td class="text-center">{totalMiles}</td>
                            <td class="text-center">{totalMilesAsSkipper}</td>
                            <td class="text-center">{totalNightHours}</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-end">Non-Tidal</th>
                            <td class="text-center">{totalMiles}</td>
                            <td class="text-center">{totalMilesAsSkipper}</td>
                            <td class="text-center">{totalNightHours}</td>
                        </tr>
                    </tbody>
                </Table>
            </Collapse>
        </>
    )
}