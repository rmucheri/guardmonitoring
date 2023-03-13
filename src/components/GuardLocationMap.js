import React from "react";
import GoogleMapReact from "google-map-react";

const GuardLocationMap = ({ location }) => {
  const defaultProps = {
    center: { lat: location.latitude, lng: location.longitude },
    zoom: 15,
  };

  const Marker = () => <div className="marker"></div>;

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={location.latitude} lng={location.longitude} />
      </GoogleMapReact>
    </div>
  );
};

export default GuardLocationMap;
