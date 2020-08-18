import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import myConfig from "./config.json";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, name, username, email) {
  return { id, name, username, email };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const updateData = (item) => {
  console.log(item, "is updated");
  console.log(myConfig.config.base_url);
};

const delData = (item) => {
  console.log(item, "is deleted");
  // const data = this.state.data.filter(i => i.id !== item.id)
  // this.setState({data})
};

const addData = () => {
  console.log("adding data is requested");
};

export default function Simpletable() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  const axios = require("axios").default;
  axios
    .get(myConfig.config.base_url)
    .then(function (response) {
      // handle success
      createData(response);
      setData(...response);
      console.log(createData(response));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  const rows = [
    createData(1, "Leanne Graham", "Bret", "Sincere@april.biz"),
    createData(2, "Leanne Graham", "ali", "Sincere@april.biz"),
    createData(3, "Leanne Graham", "reza", "Sincere@april.biz"),
    createData(4, "Leanne Graham", "jamal", "Sincere@april.biz"),
  ];

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.username}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => updateData(row.val5)}
                >
                  <Button color="primary">Update</Button>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => delData(row.val5)}
                >
                  <Button color="secondary">Delete</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Button color="primary" onClick={() => addData()}>
          Add data
        </Button>
      </TableContainer>
    </Container>
  );
}
