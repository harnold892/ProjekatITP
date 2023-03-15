import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  const [rodj, setRodj] = useState(dayjs(new Date()));
  const [checked, setChecked] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    ime: "",
    prezime: "",
    titula: "",
    datum: null,
    email: "",
  });
  const handleChangeDatum = (newValue1) => {
    setRodj(newValue1);
  };
  const handleChangeAdmin = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setInputs((prev) => ({ ...prev, datum: rodj }));
  }, [rodj]);
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputs.username !== "" &&
      inputs.password !== "" &&
      inputs.ime !== "" &&
      inputs.prezime !== "" &&
      inputs.email !== ""
    ) {
      if (checked === true) {
        try {
          await Axios.post("auth/registracija", inputs);
          navigate("/");
        } catch (err) {
          setError(err.response.data);
        }
      } else {
        try {
          await Axios.post("auth/register", inputs);
          navigate("/login");
        } catch (err) {
          setError(err.response.data);
        }
      }
    } else {
      setError("Nisu sva polja popunjena!");
    }
  };
  console.log(inputs);
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
                    name="username"
                    id="outlined-basic"
                    fullWidth
                    label="Username"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="password"
                    type="password"
                    id="outlined-basic"
                    fullWidth
                    label="Password"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="ime"
                    id="outlined-basic"
                    fullWidth
                    label="Ime"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="prezime"
                    id="outlined-basic"
                    fullWidth
                    label="Prezime"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    name="titula"
                    id="outlined-basic"
                    fullWidth
                    label="Titula"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Datum rođenja"
                      inputFormat="DD/MM/YYYY"
                      value={rodj}
                      onChange={handleChangeDatum}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeAdmin} />}
                    label="Admin"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="email"
                    id="outlined-basic"
                    fullWidth
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>{err && <Alert severity="error">{err}</Alert>}</Grid>
                <Grid item>
                  Ako imate account kliknite
                  <Link to="/login">Ovdje</Link>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit} fullWidth>
                    Register
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

export default App;
