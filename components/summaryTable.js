import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SummaryContext from "./summaryContext";
import SelectionContext from "./selectionContext";

const styles = theme => ({
    root: {
        // width: "50%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        // minWidth: 700
    }
});

const SummaryTable = props => {
    const { classes } = props;
    const gunnarStyle = { height: "10px", padding: "0px" };
    return (
        <SummaryContext.Consumer>
            {summary => (
                <SelectionContext.Consumer>
                    {selection => (
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pattern</TableCell>
                                        <TableCell>Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {summary.map(row => (
                                        <TableRow style={gunnarStyle} hover key={row._id} onClick={event => props.handleClick(event, row._id)} selected={selection.includes(row._id)}>
                                            <TableCell>{row._id}</TableCell>
                                            <TableCell>{row.duration}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    )}
                </SelectionContext.Consumer>
            )}
        </SummaryContext.Consumer>
    );
};

export default withStyles(styles)(SummaryTable);
