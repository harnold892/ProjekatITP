import { Grid, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import slika from "./img/Night_hotel.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./css/picture.css";
function App() {
  const { currentUser, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={0} className="gr">
        <Grid item xs={12}>
          <Box
            component="img"
            style={{
              width: "100%",
              display: "flex",
            }}
            alt="The house from the offer."
            src={slika}
          ></Box>
          <p className="dd">Dobro dosli {currentUser?.IME_KOR}</p>
        </Grid>
        {currentUser ? (
          <span onClick={logout}>Logout</span>
        ) : (
          <div className="butoni">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "45px",
                  paddingRight: "45px",
                }}
                onClick={login}
                variant="contained"
              >
                Login
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "45px",
                  paddingRight: "45px",
                }}
                variant="contained"
              >
                Register
              </Button>
            </Link>
          </div>
        )}
      </Grid>
    </>
  );
}
export default App;
