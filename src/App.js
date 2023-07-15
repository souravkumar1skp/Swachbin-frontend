import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
  },
  hover: {
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/" element={<Contact />} />
        <Route exact path="/SignUp" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
