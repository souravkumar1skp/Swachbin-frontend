import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import {createTheme, ThemeProvider} from '@mui/material';

const theme= createTheme({
  typography:{
    fontFamily: 'Quicksand',
  },
  hover: {
    "&:hover": {
      backgroundColor: 'rgb(7, 177, 77, 0.42)'
    }
  }
})

function App() {
  return (
      <ThemeProvider theme={theme}>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/contact" element={<Contact/>}/>
      </Routes>
      </ThemeProvider>
  );
}

export default App;
