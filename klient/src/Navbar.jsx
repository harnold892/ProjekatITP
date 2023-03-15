import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { AuthContext } from "./authContext";
import { CartContext } from "./cartContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const { currentUser, logout, login } = useContext(AuthContext);
  const { deleteCart } = useContext(CartContext);
  const [pages, setPages] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.JEL_ADMIN === 0) {
        setPages(["nocenje", "sportske aktivnosti", "spa aktivnosti", "korpa"]);
      } else {
        setPages([
          "nocenje",
          "sportske aktivnosti",
          "spa aktivnosti",
          "prijave admina"
        ]);
      }
    } else {
      setPages([]);
    }
  }, [currentUser]);

  const handleClick = (naziv) => {
    if (naziv === "sportske aktivnosti") {
      navigate("/sportske-aktivnosti");
    }
    if (naziv === "spa aktivnosti") {
      navigate("/spa-aktivnosti");
    }

    if (naziv === "nocenje") {
      navigate("/nocenja");
    }
    if (naziv === "korpa") {
      navigate("/cart");
    }
    if (naziv === "prijave admina") {
      navigate("/prijave-admina");
    }
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#181818",
      }}
      position="static"
    >
      <Container sx={{ width: "100%", margin: "0" }} maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOTEL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleClick(page);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {currentUser ? (
            <Button
              onClick={() => {
                navigate("/");
                deleteCart();
                logout();
              }}
              sx={{
                borderColor: "#add8e6",
                color: "#add8e6",
              }}
              variant="contained"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  borderColor: "#add8e6",
                  color: "#add8e6",
                }}
                variant="outlined"
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
