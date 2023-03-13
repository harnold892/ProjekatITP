import { useEffect, useState } from "react";
import Axios from "axios";
import dayjs, { Dayjs } from "dayjs";

import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function AddSpa() {
  const [pocetak, setPocetak] = useState(dayjs(new Date()));
  const [zavrsetak, setZavrsetak] = useState(dayjs(new Date()));

  const handleChangePocetak = (newValue1) => {
    setPocetak(newValue1);
  };
  useEffect(() => {
    setInputs((prev) => ({ ...prev, datum_pocetka: pocetak }));
  }, [pocetak]);
  const handleChangeZavrsetak = (newValue) => {
    setZavrsetak(newValue);
  };
  useEffect(() => {
    setInputs((prev) => ({ ...prev, datum_zavrsetka: zavrsetak }));
  }, [zavrsetak]);
  const [inputs, setInputs] = useState({
    naziv_spa: "",
    cijena_spa: "",
    opis_spa: "",
    datum_pocetka: null,
    datum_zavrsetka: null,
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputs.vrsta_sport !== "" &&
      inputs.kapacitet_sport !== "" &&
      inputs.cijena_sport !== ""
    ) {
      try {
        await Axios.post("/spa", inputs);
      } catch (err) {
        setError(err.response.data);
      }
      navigate("/spa-aktivnosti");
    } else {
      setError("Nisu sva polja popunjena!");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={2} sx={{ padding: 5 }}>
            <form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="naziv_spa"
                    id="outlined-basic"
                    fullWidth
                    label="Naziv spa aktivnosti"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="cijena_spa"
                    id="outlined-basic"
                    fullWidth
                    label="Cijena"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    name="opis_spa"
                    id="outlined-basic"
                    fullWidth
                    multiline
                    rows={6}
                    label="Opis"
                    variant="outlined"
                  />
                </Grid>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item>
                    <DesktopDatePicker
                      label="Datum početka aktivnosti"
                      inputFormat="DD/MM/YYYY"
                      name="datum_pocetka"
                      minDate={new Date()}
                      value={pocetak}
                      onChange={handleChangePocetak}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item>
                    <DesktopDatePicker
                      label="Datum završetka aktivnosti"
                      inputFormat="DD/MM/YYYY"
                      name="datum_zavrsetka"
                      minDate={pocetak}
                      value={zavrsetak}
                      onChange={handleChangeZavrsetak}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                </LocalizationProvider>
                <Grid item>{err && <Alert severity="error">{err}</Alert>}</Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit} fullWidth>
                    Dodaj
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}

export default AddSpa;
