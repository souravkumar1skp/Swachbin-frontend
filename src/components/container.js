import React from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "../App.css";
import { useValue } from "../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {

  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue()
  
 const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      setTimeout(() => {
        ref.trigger();
      }, 2500);
    }
  }, []);


  return (
    <div className="map">
      <ReactMapGL
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 2
        }}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/sourav-kumar/cl3oj1dm3002c15mm2mwsy76f"
        pitch={50}
      >
        <Marker
          longitude={lng}
          latitude={lat}
        />
        <NavigationControl/>
        <GeolocateControl
          ref={geolocateControlRef}
          enableHighAccuracy={true}
          trackUserLocation
          // showUserHeading={true}
          // showsUserLocation={true}
          onGeolocate={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.coords.longitude, lat: e.coords.latitude},
            })
          }
        />
          
      </ReactMapGL>
    </div>
  );
}

export default Map;
