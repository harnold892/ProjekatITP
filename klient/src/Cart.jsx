import { useContext, useEffect, useState } from "react";
import { Button, Grid, Alert } from "@mui/material";
import { CartContext } from "./cartContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { AuthContext } from "./authContext";
import Axios from "axios";
import moment from "moment";

function Cart() {
  const { cartSpa, cartSport, cartNocenje, deleteCart } =
    useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const [cijena, setCijena] = useState(0);
  const [notif, setNotif] = useState();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  var i = 0;

  useEffect(() => {
    let num = 0;
    let days = 0;
    cartSpa.map((sp) => {
      num += sp.CIJENA_SPA;
    });
    cartSport.map((sp) => {
      num += sp.CIJENA_SPORT;
    });
    cartNocenje.map((sp) => {
      let start = sp.DATUM_DOLASKA;
      let end = sp.DATUM_ODLASKA;

      days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      while (days > -1) {
        num += sp.CIJENA_KM_SOBA;
        days--;
      }
    });
    setCijena(num.toFixed(2));
  }, [cartSpa, cartNocenje, cartSport]);
  const handleClick = async () => {
    datumic = new Date();
    datumMejl = moment(datumic).format("DD/MM/YYYY");
    var mail = {
      to: currentUser.EMAIL_KOR,
      datum: datumMejl,
      nocenja: cartNocenje,
      sport: cartSport,
      spa: cartSpa,
      cijena_rac: cijena,
    };
    try {
      let racun = {
        id_kor: currentUser.ID_KOR,
        datum: new Date(),
        cijena_rac: cijena,
      };
      await Axios.post("/cart/racun", racun);
    } catch (err) {
      console.log(err);
    }
    if (cartSpa.length > 0) {
      try {
        await Axios.post("/cart/spa", cartSpa);
      } catch (err) {
        console.log(err);
      }
    }
    if (cartSport.length > 0) {
      try {
        await Axios.post("/cart/sport", cartSport);
      } catch (err) {
        console.log(err);
      }
    }
    if (cartNocenje.length > 0) {
      try {
        await Axios.post("/cart/nocenje", cartNocenje);
      } catch (err) {
        console.log(err);
      }
    }
    deleteCart();
    try {
      await Axios.post("/mail", mail);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container spacing={3}>
      {notif && (
        <Grid item xs={12}>
          <Alert severity="success">{notif}</Alert>
        </Grid>
      )}
      {!(
        cartSpa.length > 0 ||
        cartSport.length > 0 ||
        cartNocenje.length > 0
      ) && (
        <Grid item xs={12}>
          <Typography variant="h2">Korpa je prazna</Typography>
        </Grid>
      )}
      {cartSpa.length > 0 && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Typography variant="h2">Spa</Typography>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Naziv spa aktivnosti</StyledTableCell>
                  <StyledTableCell align="right">
                    Datum početka aktivnosti
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Datum završetka aktivnosti
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Cijena&nbsp;(KM)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartSpa.map((spa) => (
                  <StyledTableRow key={i++}>
                    <StyledTableCell component="th" scope="row">
                      {spa.NAZIV_SPA}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {moment(spa.DATUM_POCETKA_SPA).format("DD/MM/YYYY")}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {moment(spa.DATUM_ZAVRSETKA_SPA).format("DD/MM/YYYY")}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {spa.CIJENA_SPA}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {cartSport.length > 0 && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Typography variant="h2">Sport</Typography>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Vrsta sportske aktivnosti</StyledTableCell>
                  <StyledTableCell align="right">Kapacitet</StyledTableCell>
                  <StyledTableCell align="right">
                    Datum početka aktivnosti
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Datum završetka aktivnosti
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Cijena&nbsp;(KM)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartSport.map((sport) => (
                  <StyledTableRow key={i++}>
                    <StyledTableCell component="th" scope="row">
                      {sport.VRSTA_SPORT}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sport.KAPACITET_SPORT}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {moment(sport.DATUM_POCETKA_SPORT).format("DD/MM/YYYY")}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {moment(sport.DATUM_ZAVRSETKA_SPORT).format("DD/MM/YYYY")}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sport.CIJENA_SPORT}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {cartNocenje.length > 0 && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Typography variant="h2">Nocenje</Typography>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Broj sobe</StyledTableCell>
                  <StyledTableCell align="right">Apartman</StyledTableCell>
                  <StyledTableCell align="right">Kapacitet</StyledTableCell>

                  <StyledTableCell align="right">Datum dolaska</StyledTableCell>
                  <StyledTableCell align="right">Datum odlaska</StyledTableCell>
                  <StyledTableCell align="right">
                    Cijena&nbsp;(€)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Cijena&nbsp;(KM)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartNocenje.map((noc) => (
                  <StyledTableRow key={i++}>
                    <StyledTableCell component="th" scope="row">
                      {noc.ID_SOBA}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {noc.JEL_APARTMAN ? (
                        <Typography>Da</Typography>
                      ) : (
                        <Typography>Ne</Typography>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {noc.KAPACITET_SOBA}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {moment(noc.DATUM_DOLASKA).format("DD/MM/YYYY")}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {moment(noc.DATUM_ODLASKA).format("DD/MM/YYYY")}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {noc.CIJENA_E_SOBA}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {noc.CIJENA_KM_SOBA}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {(cartSpa.length > 0 ||
        cartSport.length > 0 ||
        cartNocenje.length > 0) && (
        <>
          <Grid item xs={6}>
            <Typography variant="h3">Ukupna cijena</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h3"
              sx={{
                float: "right",
              }}
            >
              {cijena} KM
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => {
                setNotif("Uspjesna narudžba!");
                handleClick();
              }}
            >
              Potvrdi narudzbu
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              sx={{
                float: "right",
              }}
              onClick={() => {
                setNotif("Uspjesno ste obrisali korpu!");
                deleteCart();
              }}
            >
              Obrisi cijelu korpu
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
export default Cart;
