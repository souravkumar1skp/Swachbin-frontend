import "../App.css";
import Navbar from "./navbar";
import Map from "./container";
import React from "react";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { Button, Grow } from "@mui/material";
import { grey } from "@mui/material/colors"
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';


function Home() {
  return (
    <div>
      <Navbar />
        <div id="upper">
          <div className="map"><Map /></div>
          <div className="btn">
          <Grow in='true'>
          <ul style={{display: 'flex', flexDirection:'row'}}>
            
            <li className="hover">
            <Button variant="contained" sx={{borderRadius: 50, color: grey[150], margin:'5px'}} startIcon={<TravelExploreRoundedIcon/>}>locate</Button>
            </li>
            <li className="hover">
            <form action="http://localhost:5000/add">
            <Button variant="contained" sx={{borderRadius: 50, color: grey[150], margin:'5px'}} startIcon={<AddLocationAltRoundedIcon/>}>Tag</Button>
            </form>
            </li>
          </ul></Grow>
          </div>
        </div>
    </div>
  );
}

export default Home;
