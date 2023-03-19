import {
  Card,
  Grid,
  Typography,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Alert,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
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
  const [sortnoc, setSortNoc] = useState([]);
  const [fullnoc, setFullNoc] = useState([]);
  const [notif, setNotif] = useState("");
  const { addCartNocenja } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();
  const [idSelect, setIdSelect] = useState("");
  const [kapacitetSelect, setKapacitetSelect] = useState("");
  const [cijenaSelect, setCijenaSelect] = useState("");
  const [smjestajSelect, setSmjestajSelect] = useState("");
  const handleChangeSelectBroj = (event) => {
    setIdSelect(event.target.value);
    setSortNoc(
      fullnoc.filter(
        (soba) =>
          soba.ID_SOBA === event.target.value &&
          (kapacitetSelect !== ""
            ? kapacitetSelect === soba.KAPACITET_SOBA
            : true) &&
          (smjestajSelect !== "" ? smjestajSelect === soba.JEL_APARTMAN : true)
      )
    );
  };
  const handleChangeSelectSmjestaj = (event) => {
    setSmjestajSelect(event.target.value);
    setSortNoc(
      fullnoc.filter(
        (soba) =>
          soba.JEL_APARTMAN === event.target.value &&
          (idSelect !== "" ? idSelect === soba.ID_SOBA : true) &&
          (kapacitetSelect !== ""
            ? kapacitetSelect === soba.KAPACITET_SOBA
            : true)
      )
    );
  };
  const handleClickReset = () => {
    setIdSelect("");
    setCijenaSelect("");
    setKapacitetSelect("");
    setSmjestajSelect("");
    setSortNoc(fullnoc);
  };
  const handleChangeSelectCijene = (event) => {
    setCijenaSelect(event.target.value);
    if (event.target.value === 1) {
      setFullNoc(
        [...fullnoc].sort((a, b) => a.CIJENA_KM_SOBA - b.CIJENA_KM_SOBA)
      );
      setSortNoc(
        [...sortnoc].sort((a, b) => a.CIJENA_KM_SOBA - b.CIJENA_KM_SOBA)
      );
    } else {
      setFullNoc(
        [...fullnoc].sort((a, b) => b.CIJENA_KM_SOBA - a.CIJENA_KM_SOBA)
      );
      setSortNoc(
        [...sortnoc].sort((a, b) => b.CIJENA_KM_SOBA - a.CIJENA_KM_SOBA)
      );
    }
  };
  const handleChangeSelectKapacitet = (event) => {
    setKapacitetSelect(event.target.value);
    setSortNoc(
      fullnoc.filter(
        (soba) =>
          soba.KAPACITET_SOBA === event.target.value &&
          (idSelect !== "" ? idSelect === soba.ID_SOBA : true) &&
          (smjestajSelect !== "" ? smjestajSelect === soba.JEL_APARTMAN : true)
      )
    );
  };

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
          setFullNoc(res.data);
          setSortNoc(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [values[1]]);
  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("/nocenje");

        setSortNoc(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.JEL_ADMIN === 1) {
      fetchDataAdmin();
    }
  }, []);
  useEffect(() => {
    if (typeof values[0] !== "undefined") {
      setSortNoc([]);
    }
  }, [values[0]]);
  return (
    <Grid container spacing={2} rowSpacing={4} sx={{ overflow: "auto" }}>
      {notif === 1 && (
        <Grid item xs={12}>
          <Alert severity="success">Rezervacija je dodata na račun!</Alert>
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
          {typeof values[1] !== "undefined" && (
            <Grid
              item
              xs={12}
              style={{ display: "flex", alignItems: "center" }}
              justifyContent="center"
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Broj sobe
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={idSelect}
                    label="Broj sobe"
                    onChange={handleChangeSelectBroj}
                  >
                    {fullnoc.length > 0 ? (
                      fullnoc.map((n) => (
                        <MenuItem value={n.ID_SOBA}>{n.ID_SOBA}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value={0}>
                        Nema slobodnih soba u tom periodu
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 160 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Kapacitet sobe
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={kapacitetSelect}
                    label="Kapacitet sobe"
                    onChange={handleChangeSelectKapacitet}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 160 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Sortiranje cijena
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cijenaSelect}
                    label="Sortiranje cijena"
                    onChange={handleChangeSelectCijene}
                  >
                    <MenuItem value={1}>Od najvece do najmanje</MenuItem>
                    <MenuItem value={2}>Od najmanje do najvece</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Vrsta smještaja
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={smjestajSelect}
                    label="Vrsta smještaja"
                    onChange={handleChangeSelectSmjestaj}
                  >
                    <MenuItem value={1}>Apartman</MenuItem>
                    <MenuItem value={0}>Soba</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {(smjestajSelect !== "" ||
                cijenaSelect !== "" ||
                kapacitetSelect !== "" ||
                idSelect !== "") && (
                <Button variant="contained" onClick={handleClickReset}>
                  Resetuj sort
                </Button>
              )}
            </Grid>
          )}
        </>
      )}

      {sortnoc.length > 0 &&
        sortnoc.map((n) => (
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
                      setNotif(1);
                      setSortNoc([]);
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
