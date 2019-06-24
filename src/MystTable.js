import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "auto",
    backgroundColor: "rgba(255,255,255,0)",
    maxWidth: 1000,
    minWidth: 0,
    display: "inline-block",
    marginTop: "50px"
  },
  tableHead: {
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  tableBody: {
    backgroundColor: "rgba(255,255,255,0.8)"
  },
  table: {
    minWidth: 0,
    size: "small"
  },
  tableCell: {
    minWidth: 0,
    width: "20%",
    padding: "dense"
  }
}));

export default function MystTable(props) {
  const classes = useStyles();
  const colors = {
    purple: "rgba(128, 0, 128, 0.5)",
    yellow: "rgba(255, 255, 0, 0.5)",
    blue: "rgba(0, 0, 255, 0.5)",
    black: "rgba(0, 0, 0, 0.5)",
    red: "rgba(255, 0, 0, 0.5)",
    white: "rgba(255, 255, 255, 0.5)"
  };

  return (
    <Paper className={classes.root} square={true}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCell}>Player</TableCell>
            <TableCell className={classes.tableCell} align="right">
              Suspect
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Location
            </TableCell>
            <TableCell className={classes.tableCell} align="left">
            {props.weaponsOrStories == "weapons" ? "Weapon" : "Story"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {props.rows.map(row => (
            <TableRow
              key={row.color}
              style={{ backgroundColor: colors[row.color], opacity: !row.murderer && props.showMurderer ? 0.2 : 1 }}
            >
              <TableCell component="th" scope="row">
                {row.color}
              </TableCell>
              <TableCell align="right">{row.suspect}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="left">{row.weapon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
