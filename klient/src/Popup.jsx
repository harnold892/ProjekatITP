import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
function SimpleDialog(props) {
  const { onClose, id, vrsta, open } = props;
  const [info, setInfo] = useState([]);
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    const fetchData = async () => {
      var string = "";
      if (vrsta === "spa") {
        string = "/pregled/spa/" + id;
      }
      if (vrsta === "sport") {
        string = "/pregled/sport/" + id;
      }
      if (vrsta === "nocenje") {
        string = "/pregled/nocenje/" + id;
      }
      try {
        const res = await Axios.get(string);
        console.log(res.data);
        setInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  var i = 0;
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Istorija</DialogTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Ime korisnika</TableCell>
              <TableCell align="right">Prezime korisnika</TableCell>
              <TableCell align="right">Datum izdavanja racuna</TableCell>
              {vrsta === "nocenje" && (
                <>
                  <TableCell align="right">Datum dolaska</TableCell>
                  <TableCell align="right">Datum odlaska</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {info.map((row) => (
              <TableRow
                key={i++}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.USERNAME}
                </TableCell>
                <TableCell align="right">{row.IME_KOR}</TableCell>
                <TableCell align="right">{row.PREZIME_KOR}</TableCell>
                <TableCell align="right">
                  {moment(row.DATUM_IZD_RACUN).format("DD/MM/YYYY")}{" "}
                </TableCell>
                {vrsta === "nocenje" && (
                  <>
                    <TableCell align="right">
                      {moment(row.DATUM_DOLASKA).format("DD/MM/YYYY")}{" "}
                    </TableCell>
                    <TableCell align="right">
                      {moment(row.DATUM_ODLASKA).format("DD/MM/YYYY")}{" "}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="text" onClick={handleClose}>
        Zatvori
      </Button>
    </Dialog>
  );
}
export default SimpleDialog;
