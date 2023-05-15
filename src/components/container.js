import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(77.378);
  const [lat, setLat] = useState(28.624);
  // const [zoom, setZoom] = useState(1);
  
  useEffect(() => {
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
    
    map.addControl(geolocateControl);
    
    return () => map.remove();
  });

  return (
    <>
      <div id='map' ref={mapContainer} className="map-container" />
    </>
  );
};

export default Map;