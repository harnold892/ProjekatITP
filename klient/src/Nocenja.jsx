import {
  Card,
  Grid,
  Typography,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Alert,
} from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import slika from "./img/soba.jpg";
import Popup from "./Popup";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import { Calendar } from "react-multi-date-picker";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
function Nocenja() {
  const { currentUser } = useContext(AuthContext);
  const [values, setValues] = useState([]);
  const [noc, setNoc] = useState([]);
  const [notif, setNotif] = useState(false);
  const { addCartNocenja } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();
  const handleClickOpen = (id) => {
    setID(id);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if (typeof values[1] !== "undefined") {
      const fetchData = async () => {
        var start = new Date(values[0]);
        var end = new Date(values[1]);
        start = moment(start).format("YYYY-MM-DD");
        end = moment(end).format("YYYY-MM-DD");
        try {
          const res = await Axios.get("/nocenje/" + start + "/" + end);
          console.log(res.data);
          setNoc(res.data);
        } catch (err) {
          console.log(err);
        }
        fetchData();
      };
    }
  }, [values[1]]);
  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("/nocenje");
        console.log(res.data);
        setNoc(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.JEL_ADMIN === 1) {
      fetchDataAdmin();
    }
  }, []);
  return (
    <Grid container spacing={2} rowSpacing={4} sx={{ overflow: "auto" }}>
      {notif && (
        <Grid item xs={12}>
          <Alert severity="success">Artikal je uspješno dodat u korpu!</Alert>
        </Grid>
      )}
      {currentUser.JEL_ADMIN === 0 && (
        <>
          <Grid item xs={12}>
            <Typography variant="h2" textAlign="center">
              Izaberite datum dolaska i odlaska
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", alignItems: "center" }}
            justifyContent="center"
          >
            <Calendar
              value={values}
              onChange={setValues}
              minDate={new Date()}
              range
              rangeHover
            />
          </Grid>
        </>
      )}

      {noc.length > 0 &&
        noc.map((n) => (
          <Grid item xs={3} key={n.ID_SOBA}>
            <Card sx={{ maxWidth: 345 }} key="{n.ID_SOBA}">
              <CardMedia
                component="img"
                height="140"
                image={slika}
                alt="green iguana"
              />
              <CardContent>
                <Typography textAlign="center" variant="h4">
                  {n.ID_SOBA}
                </Typography>
                {n.JEL_APARTMAN === 1 ? (
                  <Typography variant="h6" color="text.secondary">
                    Apartman
                  </Typography>
                ) : (
                  <Typography variant="h6" color="text.secondary">
                    Soba
                  </Typography>
                )}

                <Typography variant="h6" color="text.secondary">
                  Cijena={n.CIJENA_KM_SOBA}KM ili {n.CIJENA_E_SOBA}€
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kapacitet:{n.KAPACITET_SOBA}
                </Typography>
              </CardContent>
              {currentUser.JEL_ADMIN === 1 ? (
                <CardActions>
                  <Button
                    onClick={() => {
                      handleClickOpen(n.ID_SOBA);
                    }}
                    size="small"
                  >
                    Pregledaj istoriju
                  </Button>
                </CardActions>
              ) : (
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      addCartNocenja({
                        ID_SOBA: n.ID_SOBA,
                        JEL_APARTMAN: n.JEL_APARTMAN,
                        KAPACITET_SOBA: n.KAPACITET_SOBA,
                        CIJENA_KM_SOBA: n.CIJENA_KM_SOBA,
                        CIJENA_E_SOBA: n.CIJENA_E_SOBA,
                        DATUM_DOLASKA: new Date(values[0]),
                        DATUM_ODLASKA: new Date(values[1]),
                      });
                      setValues([]);
                      setNotif(true);
                      setNoc([]);
                    }}
                  >
                    dodaj u korpu
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      {open && (
        <Popup open={open} id={id} vrsta="nocenje" onClose={handleClose} />
      )}
    </Grid>
  );
}
export default Nocenja;
