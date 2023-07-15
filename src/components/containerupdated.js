import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import SwipeableEdgeDrawer from "./dragable";
import { addPath } from "../redux/Slice/path";
import { useDispatch, useSelector } from "react-redux";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const start1 = useRef(0);
  const start2 = useRef(0);
  const values = useRef(0);
  const [vis, setVis] = useState(false);
  const dispatch = useDispatch();
  const mark = useSelector((state) => state);
  console.log(mark.history);

  navigator.geolocation.getCurrentPosition(addpos);
  function addpos(e) {
    start1.current = e.coords.latitude;
    start2.current = e.coords.longitude;
    dispatch(
      addPath({
        lat: start1.current.toFixed(4),
        lng: start2.current.toFixed(4),
      })
    );
  }
  useEffect(() => {
    if (map.current) return; // initialize map only once
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    setTimeout(() => {
      geolocateControl.trigger();
    }, 2500);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 1,
      projection: "globe",
    });
    map.current.on("style.load", () => {
      map.current.setFog({
        color: "rgb(186, 210, 235)", // Lower atmosphere
        "high-color": "rgb(36, 92, 223)", // Upper atmosphere
        "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        "space-color": "rgb(11, 11, 25)", // Background color
        "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
      });
    });
    map.current.addControl(geolocateControl);
    route();
  });
  const route = () => {
    // map.current.on("load", () => {
    // make an initial directions request that
    // starts and ends at the same location
    // getRoute(start);
    map.current.on("click", (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };
      if (map.current.getLayer("end")) {
        map.current.getSource("end").setData(end);
      } else {
        map.current.addLayer({
          id: "end",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: coords,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 8,
            "circle-color": "#00ff00",
          },
        });
      }

      getRoute(coords);
    });
  };

  async function getRoute(end) {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start2.current},${start1.current};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    if (json.routes.length === 0) {
      alert("select Other Destination");
      route();
    } else {
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      // if the route already exists on the map, we'll reset it using setData
      if (map.current.getSource("route")) {
        map.current.getSource("route").setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.current.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
      // get the sidebar and add the instructions
      // dispatch(addPath({ val: data }));
      // console.log(items);
      const steps = data.legs[0].steps;
      setVis(true);
      const instructions = document.getElementById("inst");
      let dur = 0;
      let tripInstructions = "";
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
        dur += step.duration;
      }
      values.current = dur;
      instructions.innerHTML = `<ol>${tripInstructions}</ol>`;
    }
  }
  useEffect(() => {
    const markers = mark.history.data;

    markers.forEach((markerData) => {
      // const { coordinates, popupContent } = markerData;
      const coordinates = [markerData.lat, markerData.lng];
      const popupContent = `<h3>${markerData.category}</h3><p>${markerData.description}</p><p>${markerData.user_id.name}</p><p>${markerData.user_id.email}</p>`;

      const popup = new mapboxgl.Popup({ closeButton: false }).setHTML(
        popupContent
      );

      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map.current)
        .setPopup(popup);

      marker.getElement().addEventListener("mouseenter", () => {
        popup.addTo(map.current);
      });
      marker.getElement().addEventListener("mouseleave", () => {
        popup.remove(map.current);
      });
    });

    return () => map.current.remove();
  }, [mark.history.data]);

  return (
    <>
      <div ref={mapContainer} className="map-container" />
      {vis ? <SwipeableEdgeDrawer val={values} /> : <></>}
    </>
  );
};

export default App;
