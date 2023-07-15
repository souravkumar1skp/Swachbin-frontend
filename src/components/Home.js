import "../App.css";
import Navbar from "./navbar";
import Map from "./containerupdated";
import React from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import { Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fab from "@mui/material/Fab";
import { useSelector } from "react-redux";

function Home() {
  const items = useSelector((state) => state);
  const locate = items.path;
  const ide = items.details.id;
  const handleShelter = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: ide,
      lat: locate.lng,
      lng: locate.lat,
      category: "Shelter",
      description: "Sweet Home availaible for needy people",
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

  const handleFood = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: ide,
      lat: locate.lng,
      lng: locate.lat,
      category: "Food",
      description: "food availaible for free",
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
        <ul className="btnn">
          <Stack direction={"column-reverse"} spacing={1}>
            <Fab onClick={handleShelter} color="secondary" aria-label="Tag">
              <FastfoodIcon />
            </Fab>
            <Fab onClick={handleFood} color="secondary" aria-label="Tag">
              <NightShelterIcon />
            </Fab>
          </Stack>
        </ul>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
