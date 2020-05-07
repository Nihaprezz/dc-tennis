import React, { useState } from 'react';
import ReactMapGL from "react-map-gl"

const apiKey = process.env.REACT_APP_MAPBOX_TOKEN 

function App() {
  const [viewport, setViewport] = useState({
    latitude: 38.89543914794922, 
    longitude: -77.03128051757812,
    width: "100vw", 
    height: "100vh",
    zoom: 10
  })

  return (
    <div className="App">
      <h1>DC Tennis Locations</h1>

      <ReactMapGL {...viewport} mapboxApiAccessToken={apiKey}
      onViewportChange={(viewport) => setViewport(viewport)}>

      </ReactMapGL>
    </div>
  );
}

export default App;
