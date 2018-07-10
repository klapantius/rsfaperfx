import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SummaryContext from "./summaryContext";
import SelectionContext from "./selectionContext";

const SummaryTable = props => (
    <SummaryContext.Consumer>
        {summary => (
            <SelectionContext.Consumer>
                {selection => (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Pattern</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {summary.map(row => (
                                <TableRow
                                    hover
                                    key={row._id}
                                    onClick={event =>
                                        props.handleClick(event, row._id)
                                    }
                                    selected={selection.includes(row._id)}
                                >
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.duration}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </SelectionContext.Consumer>
        )}
    </SummaryContext.Consumer>
);

export default SummaryTable;
