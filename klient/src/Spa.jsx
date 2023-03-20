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
  Paper,
} from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import slika from "./img/spa.jpg";
import moment from "moment";
import { AuthContext } from "./authContext";
import { CartContext } from "./cartContext";
import { useContext } from "react";
import plus from "./img/plus.png";
import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
function Spa() {
  const { currentUser } = useContext(AuthContext);
  const { addCartSpa } = useContext(CartContext);
  const [notif, setNotif] = useState(false);
  const [sortspa, setSortSpa] = useState([]);
  const [fullspa, setFullSpa] = useState([]);
  const [open, setOpen] = useState(false);
  const [vrstaSelect, setVrstaSelect] = useState("");
  const [cijenaSelect, setCijenaSelect] = useState("");
  const [datumSelect, setDatumSelect] = useState("");
  const [uniqueNames, setUniqueNames] = useState("");
  const [id, setID] = useState();
  const handleChangeSelectVrsta = (event) => {
    setVrstaSelect(event.target.value);
    setSortSpa(
      fullspa.filter(
        (spa) =>
          spa.NAZIV_SPA === event.target.value &&
          (datumSelect !== "" ? datumSelect === spa.DATUM_POCETKA_SPA : true)
      )
    );
  };
  const handleChangeSelectDatum = (event) => {
    setDatumSelect(event.target.value);
    setSortSpa(
      fullspa.filter(
        (spa) =>
          spa.DATUM_POCETKA_SPA === event.target.value &&
          (vrstaSelect !== "" ? vrstaSelect === spa.NAZIV_SPA : true)
      )
    );
  };
  const handleClickReset = () => {
    setDatumSelect("");
    setCijenaSelect("");
    setVrstaSelect("");
    setSortSpa(fullspa);
  };
  const handleChangeSelectCijene = (event) => {
    setCijenaSelect(event.target.value);
    if (event.target.value === 1) {
      setFullSpa([...fullspa].sort((a, b) => a.CIJENA_SPA - b.CIJENA_SPA));
      setSortSpa([...sortspa].sort((a, b) => a.CIJENA_SPA - b.CIJENA_SPA));
    } else {
      setFullSpa([...fullspa].sort((a, b) => b.CIJENA_SPA - a.CIJENA_SPA));
      setSortSpa([...sortspa].sort((a, b) => b.CIJENA_SPA - a.CIJENA_SPA));
    }
  };
  const handleClickOpen = (id) => {
    setID(id);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/spa");
        setSortSpa(res.data);
        setFullSpa(res.data);
        let names = [];
        res.data.map((a) => {
          names.push(a.NAZIV_SPA);
        });

        setUniqueNames(Array.from(new Set(names)));
      } catch (err) {
        console.log(err);
      }
    };
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("/spa/admin");
        setSortSpa(res.data);
        setFullSpa(res.data);
        let names = [];
        res.data.map((a) => {
          names.push(a.NAZIV_SPA);
        });

        setUniqueNames(Array.from(new Set(names)));
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.JEL_ADMIN === 1) {
      fetchDataAdmin();
    } else {
      fetchData();
    }
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addSpa");
  };
  const add = (obj) => {
    addCartSpa(obj);
  };
  return (
    <>
      <Grid container spacing={2}>
        {notif && (
          <Grid item xs={12}>
            <Alert severity="success">Rezervacija je dodata na račun!</Alert>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          style={{ display: "flex", alignItems: "center" }}
          justifyContent="center"
        >
          <Paper
            elevation={2}
            sx={{ padding: 5 }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Vrsta spa</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={vrstaSelect}
                  label="Vrsta sporta"
                  onChange={handleChangeSelectVrsta}
                >
                  {fullspa.length > 0 &&
                    uniqueNames.map((s) => <MenuItem value={s}>{s}</MenuItem>)}
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
            <Box sx={{ minWidth: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Datum početka aktivnosti
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={datumSelect}
                  label="Datum početka aktivnosti"
                  onChange={handleChangeSelectDatum}
                >
                  {fullspa.length > 0 &&
                    fullspa.map((s) => (
                      <MenuItem value={s.DATUM_POCETKA_SPA}>
                        {moment(s.DATUM_POCETKA_SPA).format("DD/MM/YYYY")}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            {(vrstaSelect !== "" ||
              cijenaSelect !== "" ||
              datumSelect !== "") && (
              <Button variant="contained" onClick={handleClickReset}>
                Resetuj sort
              </Button>
            )}
          </Paper>
        </Grid>
        {currentUser.JEL_ADMIN === 1 && (
          <Grid item xs={3} key="plus">
            <Card onClick={handleClick} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="auto"
                image={plus}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Dodaj novi spa događaj
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {sortspa.map((sp) => (
          <Grid item xs={3} key="{sp.ID_SPA}">
            <Card sx={{ maxWidth: 345 }} key={sp.ID_SPA}>
              <CardMedia
                component="img"
                height="140"
                image={slika}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {sp.NAZIV_SPA}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Cijena={sp.CIJENA_SPA}KM po osobi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Opis:{sp.OPIS_SPA}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {moment(sp.DATUM_POCETKA_SPA).format("DD/MM/YYYY")} -{" "}
                  {moment(sp.DATUM_ZAVRSETKA_SPA).format("DD/MM/YYYY")}
                </Typography>
              </CardContent>
              {currentUser.JEL_ADMIN === 0 ? (
                <CardActions>
                  <Button
                    onClick={() => {
                      add(sp);
                      setNotif(true);
                    }}
                    size="small"
                  >
                    Dodaj u korpu
                  </Button>
                </CardActions>
              ) : (
                <CardActions>
                  <Button
                    onClick={() => {
                      handleClickOpen(sp.ID_SPA);
                    }}
                    size="small"
                  >
                    Pregledaj istoriju
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
        {open && (
          <Popup open={open} id={id} vrsta="spa" onClose={handleClose} />
        )}
      </Grid>
    </>
  );
}
export default Spa;
