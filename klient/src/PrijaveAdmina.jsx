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

function PrijaveAdmina() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("auth/getadmin");
        console.log(res.data);
        setInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const odbaci = async (username) => {
    try {
      await Axios.get("auth/deleteadmin/" + username);
      setInfo(info.filter((korisnik) => korisnik.USERNAME !== username));
    } catch (err) {
      console.log(err);
    }
  };
  const prijavi = async (korisnik) => {
    try {
      await Axios.post("auth/dodajadmina", korisnik);
    } catch (err) {
      console.log(err);
    }
    odbaci(korisnik.USERNAME);
  };
  var i;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Ime korisnika</TableCell>
            <TableCell align="right">Prezime korisnika</TableCell>
            <TableCell align="right">Titula</TableCell>
            <TableCell align="right">Datum rođenja</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
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
              <TableCell align="right">{row.TITULA_KOR}</TableCell>
              <TableCell align="right">
                {moment(row.DATUM_KOR).format("DD/MM/YYYY")}{" "}
              </TableCell>
              <TableCell align="right">{row.EMAIL_KOR}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    prijavi(row);
                  }}
                >
                  Prijavi
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  sx={{
                    backgroundColor: "red",
                  }}
                  variant="contained"
                  onClick={() => {
                    odbaci(row.USERNAME);
                  }}
                >
                  Odbaci
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default PrijaveAdmina;
