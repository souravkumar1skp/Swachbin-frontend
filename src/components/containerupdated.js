import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.378);
  const [lat, setLat] = useState(28.624);

  const start = [lng, lat];

  useEffect(() => {
    if (map.current) return; // initialize map only once
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
  
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lat, lng],
        zoom: 1,
        projection: 'globe'
      });
      map.current.on('style.load', () => {
        map.current.setFog({
            color: 'rgb(186, 210, 235)', // Lower atmosphere
            'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
            'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
            'space-color': 'rgb(11, 11, 25)', // Background color
            'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
        });
    });
      map.current.addControl(geolocateControl);
      route();
  }, [map.current]);

  const route = () => {
    map.current.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      // getRoute(start);

      // Add starting point to the map
      map.current.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start
                }
              }
            ]
          }
        },
        // paint: {
        //   'circle-radius': 10,
        //   'circle-color': '#3887be'
        // }
      });

      map.current.on('click', (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        const end = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }
          ]
        };
        if (map.current.getLayer('end')) {
          map.current.getSource('end').setData(end);
        } else {
          map.current.addLayer({
            id: 'end',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: coords
                    }
                  }
                ]
              }
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#f30'
            }
          });
        }
        // getRoute(coords);
      });
    });
  }

  // async function getRoute(end) {
  //   const query = await fetch(
  //     `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
  //     { method: 'GET' }
  //   );
  //   const json = await query.json();
  //   const data = json.routes[0];
  //   const route = data.geometry.coordinates;
  //   const geojson = {
  //     type: 'Feature',
  //     properties: {},
  //     geometry: {
  //       type: 'LineString',
  //       coordinates: route
  //     }
  //   };
  //   // if the route already exists on the map, we'll reset it using setData
  //   if (map.current.getSource('route')) {
  //     map.current.getSource('route').setData(geojson);
  //   }
  //   // otherwise, we'll make a new request
  //   else {
  //     map.current.addLayer({
  //       id: 'route',
  //       type: 'line',
  //       source: {
  //         type: 'geojson',
  //         data: geojson
  //       },
  //       layout: {
  //         'line-join': 'round',
  //         'line-cap': 'round'
  //       },
  //       paint: {
  //         'line-color': '#3887be',
  //         'line-width': 5,
  //         'line-opacity': 0.75
  //       }
  //     });
  //   }
  //   // get the sidebar and add the instructions
  //   const instructions = document.getElementById('instructions');
  //   const steps = data.legs[0].steps;

  //   let tripInstructions = '';
  //   for (const step of steps) {
  //     tripInstructions += `<li>${step.maneuver.instruction}</li>`;
  //   }
  //   instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
  //     data.duration / 60
  //   )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
  // }

  return (
    <>
      <div ref={mapContainer} className="map-container" />
      {/* <div id="instructions" className="instructions"></div> */}
    </>
  );
};

export default App;