import "../App.css";
import Navbar from "./navbar";
import Map from "./containerupdated";
import React from "react";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import { Button, Grow } from "@mui/material";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fab from "@mui/material/Fab";
import { useSelector } from "react-redux";

function Home() {
  const locate = useSelector((state) => state.path);
  const handleSubmit = async () => {
    console.log(locate);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      lat: locate.lat,
      lng: locate.lng,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const id = toast.loading("Sending your Location....");
    fetch("https://swachbin-sever.onrender.com/add", requestOptions)
      .then((response) => {
        if (response.status === 200)
          toast.update(id, {
            render: "location added successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        else if (response.status === 400)
          toast.update(id, {
            render: "Same location already exist",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        else
          toast.update(id, {
            render: "some error occured",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <Navbar />
      <div id="parent">
        <div id="containit">
          <Map />
        </div>
        <Grow in="true">
          <ul
            className="btnn"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <li className="hover">
              <Fab color="secondary" aria-label="Tag">
                <Button
                  variant="text"
                  style={{ color: "white", borderRadius: "40%" }}
                >
                  <TravelExploreRoundedIcon />
                </Button>
              </Fab>
              <ToastContainer />
            </li>
            <li className="hover">
              <Fab color="secondary" aria-label="Tag">
                <Button
                  onClick={handleSubmit}
                  variant="text"
                  style={{ color: "white", borderRadius: "40%" }}
                >
                  <AddLocationAltRoundedIcon />
                </Button>
              </Fab>
              <ToastContainer style={{ display: "none" }} />
            </li>
          </ul>
        </Grow>
      </div>
    </>
  );
}

export default Home;
