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
import slika from "./img/sport.png";
import moment from "moment";
import { AuthContext } from "./authContext";
import { CartContext } from "./cartContext";
import { useContext } from "react";
import plus from "./img/plus.png";
import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
function Sport() {
  const { currentUser } = useContext(AuthContext);
  const { addCartSport } = useContext(CartContext);
  const [notif, setNotif] = useState(false);
  const [sortsports, setSortSports] = useState([]);
  const [fullsports, setFullSports] = useState([]);
  const [vrstaSelect, setVrstaSelect] = useState("");
  const [cijenaSelect, setCijenaSelect] = useState("");
  const [datumSelect, setDatumSelect] = useState("");
  const [uniqueNames, setUniqueNames] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();
  const handleChangeSelectVrsta = (event) => {
    setVrstaSelect(event.target.value);
    setSortSports(
      fullsports.filter(
        (sport) =>
          sport.VRSTA_SPORT === event.target.value &&
          (datumSelect !== ""
            ? datumSelect === sport.DATUM_POCETKA_SPORT
            : true)
      )
    );
  };
  const handleChangeSelectDatum = (event) => {
    setDatumSelect(event.target.value);
    setSortSports(
      fullsports.filter(
        (sport) =>
          sport.DATUM_POCETKA_SPORT === event.target.value &&
          (vrstaSelect !== "" ? vrstaSelect === sport.VRSTA_SPORT : true)
      )
    );
  };
  const handleClickReset = () => {
    setDatumSelect("");
    setCijenaSelect("");
    setVrstaSelect("");
    setSortSports(fullsports);
  };
  const handleChangeSelectCijene = (event) => {
    setCijenaSelect(event.target.value);
    if (event.target.value === 1) {
      setFullSports(
        [...fullsports].sort((a, b) => a.CIJENA_SPORT - b.CIJENA_SPORT)
      );
      setSortSports(
        [...sortsports].sort((a, b) => a.CIJENA_SPORT - b.CIJENA_SPORT)
      );
    } else {
      setFullSports(
        [...fullsports].sort((a, b) => b.CIJENA_SPORT - a.CIJENA_SPORT)
      );
      setSortSports(
        [...sortsports].sort((a, b) => b.CIJENA_SPORT - a.CIJENA_SPORT)
      );
    }
  };
  const handleClickOpen = (id) => {
    setID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/sport");
        setFullSports(res.data);
        setSortSports(res.data);
        let names = [];
        res.data.map((a) => {
          names.push(a.VRSTA_SPORT);
        });

        setUniqueNames(Array.from(new Set(names)));
      } catch (err) {
        console.log(err);
      }
    };
    const fetchDataAdmin = async () => {
      try {
        const res = await Axios.get("/sport/admin");
        setFullSports(res.data);
        setSortSports(res.data);
        let names = [];
        res.data.map((a) => {
          names.push(a.VRSTA_SPORT);
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
    navigate("/addSport");
  };
  const add = (obj) => {
    addCartSport(obj);
  };

  return (
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
              <InputLabel id="demo-simple-select-label">
                Vrsta sporta
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vrstaSelect}
                label="Vrsta sporta"
                onChange={handleChangeSelectVrsta}
              >
                {fullsports.length > 0 &&
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
                {fullsports.length > 0 &&
                  fullsports.map((s) => (
                    <MenuItem value={s.DATUM_POCETKA_SPORT}>
                      {moment(s.DATUM_POCETKA_SPORT).format("DD/MM/YYYY")}
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
          <Card onClick={handleClick} sx={{ maxWidth: 345 }} key={"add"}>
            <CardMedia
              component="img"
              height="auto"
              image={plus}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Dodaj novi sportski dogadjaj
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
      {sortsports.map((sport) => (
        <Grid item xs={3} key="{sport.ID_SPORT}">
          <Card sx={{ maxWidth: 345 }} key="{sport.ID_SPORT}">
            <CardMedia
              component="img"
              height="140"
              image={slika}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {sport.VRSTA_SPORT}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Kapacitet={sport.KAPACITET_SPORT}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Cijena={sport.CIJENA_SPORT}KM po osobi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Opis:{sport.OPIS}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {moment(sport.DATUM_POCETKA_SPORT).format("DD/MM/YYYY")} -{" "}
                {moment(sport.DATUM_ZAVRSETKA_SPORT).format("DD/MM/YYYY")}
              </Typography>
            </CardContent>
            {currentUser.JEL_ADMIN === 0 ? (
              <CardActions>
                <Button
                  onClick={() => {
                    add(sport);
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
                    handleClickOpen(sport.ID_SPORT);
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
        <Popup open={open} id={id} vrsta="sport" onClose={handleClose} />
      )}
    </Grid>
  );
}
export default Sport;
