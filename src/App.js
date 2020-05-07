import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import * as tennisData from "./data/tennis-courts.json"
import tennisIcon from "./tennis.svg"

const apiKey = process.env.REACT_APP_MAPBOX_TOKEN 

function App() {
  const [viewport, setViewport] = useState({
    latitude: 38.89543914794922, 
    longitude: -77.03128051757812,
    width: "100vw", 
    height: "100vh",
    zoom: 11
  })

  const [currentCourt, setCurrentCourt] = useState(null)

  const handleSelect = (court) => {
    setCurrentCourt(court)
  }

  return (
    <div className="App">
      <h1>DC Tennis</h1>

      <ReactMapGL {...viewport} mapboxApiAccessToken={apiKey}
      mapStyle="mapbox://styles/nihaprezz/ck9w5z0yu05111intcxb0x1v2"
      onViewportChange={(viewport) => setViewport(viewport)}>
        
        {tennisData.courts.map(court => {
          return (
            <Marker key={court.attributes.ID}
            latitude={court.geometry.y}
            longitude={court.geometry.x}>

            <button className="marker-btn" onClick={() => handleSelect(court)}>
              <img src={tennisIcon} alt="Tennis Icon"/>
            </button>

          </Marker>
          )
        })}

        {currentCourt ? (
          <Popup 
          latitude={currentCourt.geometry.y}
          longitude={currentCourt.geometry.x}
          onClose={() => {
            setCurrentCourt(null);
          }}>
            <div>
              <p>{currentCourt.attributes.NAME}</p>
              <p>{`Condition: ${currentCourt.attributes.CONDITION}`}</p>
              <p>{`Surface: ${currentCourt.attributes.SURFACE}`}</p>

            </div>
          </Popup>
        ): null}

      </ReactMapGL>

{/* 
      Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
    </div>
  );
}

export default App;
