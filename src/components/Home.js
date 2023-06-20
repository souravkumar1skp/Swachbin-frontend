import "../App.css";
import Navbar from "./navbar";
import Map from "./containerupdated";
import React from "react";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { Button, Grow } from "@mui/material";
import { grey } from "@mui/material/colors"
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  
const handleSubmit = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "lat": 30.6,
  "lng": 40.45
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const id=toast.loading('Sending your Location....')
fetch("https://swachbin-sever.onrender.com/add", requestOptions)
  .then(response => {
    if(response.status===200)
    toast.update(id, {render: "location added successfully", type: "success", isLoading: false, autoClose: 3000});
    else if(response.status===400)
    toast.update(id, {render: "Same location already exist", type: "error", isLoading: false, autoClose: 5000});
    else
    toast.update(id, {render: "some error occured", type: "error", isLoading: false, autoClose: 3000});
  })
  .catch(error => console.log('error', error));
};
  return (
    <div>
      <Navbar />
        <div id="upper">
          {/* <div className="map"><Map /></div> */}
          <Map />
          {/* <div className="btn"> */}
          <Grow in='true'>
          <ul style={{display: 'flex', flexDirection:'row', position: "absolute", bottom: "2.5rem", right: 0}}>
            
            <li className="hover">
            <Button type="submit" variant="contained" sx={{borderRadius: 50, color: grey[150], margin:'5px'}} startIcon={<TravelExploreRoundedIcon/>}>locate</Button>
            <ToastContainer />
            </li>
            <li className="hover">
            <Button onClick={handleSubmit} variant="contained" sx={{borderRadius: 50, color: grey[150], margin:'5px'}} startIcon={<AddLocationAltRoundedIcon/>}>Tag</Button>
            <ToastContainer style={{display: "none"}}/>
            </li>
          </ul></Grow>
          {/* </div> */}
        </div>
    </div>
  );
}

export default Home;
