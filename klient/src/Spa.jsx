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
  const [spa, setSpa] = useState([]);
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
    const fetchData = async () => {
      try {
        const res = await Axios.get("/spa");
        setSpa(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
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
        {spa.map((sp) => (
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
