import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    ime: "",
    prezime: "",
    titula: "",
    datum: "",
    email: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
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
                <Grid item>
                  <TextField
                    required
                    onChange={handleChange}
                    name="datum"
                    id="outlined-basic"
                    fullWidth
                    label="Datum"
                    variant="outlined"
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
