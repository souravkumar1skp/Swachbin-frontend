import "../App.css";
import Navbar from "./navbar";
import Map from "./containerupdated";
import React, { useEffect, useRef, useState } from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import { Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fab from "@mui/material/Fab";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Home() {
  const nav = useNavigate();
  const items = useSelector((state) => state);
  const ide = items.details.id;
  const isGuest = useRef(false);
  const [snackbars, setSnackbars] = useState([]);
  if (items.details.email === "guest@gmail.com") isGuest.current = true;

  // Effect to navigate if user is not authenticated
  React.useEffect(() => {
    if (ide == null) {
      nav("/"); // Redirect to home if not signed in
    }
  }, [ide, nav]);

  const locate = items.path || { lat: 0, lng: 0 }; // Default coordinates

  const showSnackbar = (message, severity = "info") => {
    const id = new Date().getTime(); // Unique ID for each snackbar
    setSnackbars((prev) => [...prev, { id, message, severity }]);
  };

  useEffect(() => {
    // Show Snackbar when the component loads
    showSnackbar(
      "Click on the map to get directions from your current location."
    ); // Customize your message here
    if (isGuest.current) {
      showSnackbar(
        "Tagging location buttons are disabled in guest mode!!!",
        "warning"
      );
    }
  }, []);

  const handleShelter = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_id: ide,
      lat: locate.lng,
      lng: locate.lat,
      category: "Shelter",
      description: "Sweet Home available for needy people",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const id = toast.loading("Sending your Location....");
    fetch("https://sarathi-vercel.vercel.app/add", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          toast.update(id, {
            render: "Location added successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else if (response.status === 400) {
          toast.update(id, {
            render: "Same location already exists",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(id, {
            render: "Some error occurred",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.update(id, {
          render: "Network error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const handleFood = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_id: ide,
      lat: locate.lng,
      lng: locate.lat,
      category: "Food",
      description: "Food available for free",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const id = toast.loading("Sending your Location....");
    fetch("https://sarathi-vercel.vercel.app/add", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          toast.update(id, {
            render: "Location added successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else if (response.status === 400) {
          toast.update(id, {
            render: "Same location already exists",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(id, {
            render: "Some error occurred",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.update(id, {
          render: "Network error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      {ide == null ? null : (
        <>
          <Navbar />
          <div id="parent">
            <div id="containit">
              <Map />
            </div>
            <ul className="btnn">
              <Stack direction={"column-reverse"} spacing={1}>
                <Fab
                  onClick={handleShelter}
                  color="secondary"
                  aria-label="Tag"
                  disabled={isGuest.current}
                >
                  <FastfoodIcon />
                </Fab>
                <Fab
                  onClick={handleFood}
                  color="secondary"
                  aria-label="Tag"
                  disabled={isGuest.current}
                >
                  <NightShelterIcon />
                </Fab>
              </Stack>
            </ul>
          </div>

          {snackbars.map((snackbar, index) => (
            <Snackbar
              key={snackbar.id}
              open
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClose={() => {
                setSnackbars((prev) =>
                  prev.filter((s) => s.id !== snackbar.id)
                );
              }}
              style={{ marginBottom: index * 60 }} // Adjust margin based on index to space them out
            >
              <Alert
                onClose={() => {
                  setSnackbars((prev) =>
                    prev.filter((s) => s.id !== snackbar.id)
                  );
                }}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          ))}
        </>
      )}
    </>
  );
}

export default Home;
