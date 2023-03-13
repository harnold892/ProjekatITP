import { useState } from "react";
import Axios from "axios";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Spa from "./Spa";
import Navbar from "./Navbar";
import { Box } from "@mui/system";
import Nocenja from "./Nocenja";
import Sport from "./Sport";
import AddSpa from "./AddSpa";
import AddSport from "./Addsport";

import Cart from "./Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Box sx={{ width: "100%", margin: "0" }}>
        <Navbar />
        <Home />
      </Box>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/nocenja",
    element: (
      <Box sx={{ width: "100%", margin: "0" }}>
        <Navbar />
        <Nocenja />
      </Box>
    ),
  },

  {
    path: "/sportske-aktivnosti",
    element: (
      <Box sx={{ width: "100%", margin: "0" }}>
        <Navbar />
        <Sport />
      </Box>
    ),
  },
  {
    path: "/spa-aktivnosti",
    element: (
      <Box sx={{ width: "100%", margin: "0" }}>
        <Navbar />
        <Spa />
      </Box>
    ),
  },
  {
    path: "/cart",
    element: (
      <Box sx={{ width: "100%", margin: "0" }}>
        <Navbar />
        <Cart />
      </Box>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addSport",
    element: <AddSport />,
  },
  {
    path: "/addSpa",
    element: <AddSpa />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
