import { Table } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Collapse } from "react-bootstrap";

function calculateNonTidalMiles(entries, asSkipper=false) {
    let totalMiles = 0;
    entries.forEach((entry) => {
        if (entry["tidal"] === false) {
            if (asSkipper) {
                if (entry["capacity"].toLowerCase() === "skipper") {
                    totalMiles = totalMiles + parseInt(entry["distanceLogged"]);
                }
            } else {
                totalMiles = totalMiles + parseInt(entry["distanceLogged"]);
            }
        }
    });

    return totalMiles;
}

function calculateTidalMiles(entries, asSkipper=false) {
    let totalMiles = 0;
    entries.forEach((entry) => {
        if (entry["tidal"] === true) {
            if (asSkipper) {
                if (entry["capacity"].toLowerCase() === "skipper") {
                    totalMiles = totalMiles + parseInt(entry["distanceLogged"]);
                }
            } else {
                totalMiles = totalMiles + parseInt(entry["distanceLogged"]);
            }
        }
    });

    return totalMiles;
}

function calculateNightHours(entries, tidal=false) {
    let totalNightHours = 0;
    entries.forEach((entry) => {
        if (tidal) {
            if (entry["tidal"] === true) {
                totalNightHours = totalNightHours + parseInt(entry["nightHours"]);
            }
        } else {
            if (entry["tidal"] === false) {
                totalNightHours = totalNightHours + parseInt(entry["nightHours"]);
            }
        }
    });

    return totalNightHours;
}

export default function Summary({ entries }) {
    const [open, setOpen] = useState(false);

    const totalMilesAsSkipperNonTidal = calculateNonTidalMiles(entries, true);
    const totalMilesAsSkipperTidal = calculateTidalMiles(entries, true);
    const totalMilesAsSkipper = totalMilesAsSkipperNonTidal + totalMilesAsSkipperTidal;

    const totalNightHoursNonTidal = calculateNightHours(entries, false);
    const totalNightHoursTidal = calculateNightHours(entries, true);
    const totalNightHours = totalNightHoursNonTidal + totalNightHoursTidal;

    const totalMilesNonTidal = calculateNonTidalMiles(entries, false);
    const totalMilesTidal = calculateTidalMiles(entries, false);
    const totalMiles = totalMilesNonTidal + totalMilesTidal;

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
                            <td class="text-center">{totalMilesTidal}</td>
                            <td class="text-center">{totalMilesAsSkipperTidal}</td>
                            <td class="text-center">{totalNightHoursTidal}</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-end">Non-Tidal</th>
                            <td class="text-center">{totalMilesNonTidal}</td>
                            <td class="text-center">{totalMilesAsSkipperNonTidal}</td>
                            <td class="text-center">{totalNightHoursNonTidal}</td>
                        </tr>
                    </tbody>
                </Table>
            </Collapse>
        </>
    )
}