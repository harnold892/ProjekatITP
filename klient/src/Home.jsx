import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { Axios } from "axios";
function App() {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <>
      <Typography>Dobro dosli {currentUser?.IME_KOR}</Typography>
      {currentUser ? (
        <span onClick={logout}>Logout</span>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </>
  );
}
export default App;
