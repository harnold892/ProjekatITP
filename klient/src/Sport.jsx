import {
  Card,
  Grid,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Alert,
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
  const [sports, setSports] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();
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
        setSports(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
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
          <Alert severity="success">Artikal je uspješno dodat u korpu!</Alert>
        </Grid>
      )}
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
      {sports.map((sport) => (
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
