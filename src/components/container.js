import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  // const [zoom, setZoom] = useState(1);
  
  useEffect(() => {
    // if(map) return;
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    geolocateControl.on('geolocate', e => {
      setLat(e.coords.latitude);
      setLng(e.coords.longitude);
    });
    
    setTimeout(() => {
      geolocateControl.trigger();
    }, 2500);

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lat, lng],
      zoom: 1,
      projection: 'globe'
    });
    map.on('style.load', () => {
      map.setFog({
          color: 'rgb(186, 210, 235)', // Lower atmosphere
          'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
          'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
          'space-color': 'rgb(11, 11, 25)', // Background color
          'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
      });
  });
    map.addControl(geolocateControl);
    
    // return () => map.remove();
  });

  return (
    <>
      <div id='map' ref={mapContainer} className="map-container" />
    </>
  );
};

export default Map;