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
    height: "93vh",
    zoom: 11
  })

  const [currentCourt, setCurrentCourt] = useState(null)


  return (
    <div className="App">
      <div className="header">
        <h1>Washington DC Tennis Courts</h1>
        <a href="https://opendata.dc.gov/datasets/tennis-court-sites/geoservice">Data</a>
        <a href="https://github.com/Nihaprezz/dc-tennis">Github</a>
      </div>

      <ReactMapGL {...viewport} mapboxApiAccessToken={apiKey}
      mapStyle="mapbox://styles/nihaprezz/ck9w5z0yu05111intcxb0x1v2"
      onViewportChange={(viewport) => setViewport(viewport)}>
        
        {tennisData.courts.map(court => {
          return (
            <Marker key={court.attributes.ID}
            latitude={court.geometry.y}
            longitude={court.geometry.x}>

            <button className="marker-btn" onClick={() => setCurrentCourt(court)}>
              <img src={tennisIcon} alt="Tennis Icon"/>
            </button>

          </Marker>
          )
        })}

        {currentCourt ? (
          <Popup 
          latitude={currentCourt.geometry.y}
          longitude={currentCourt.geometry.x}
          onClose={() => setCurrentCourt(null)}>
            <div>
              <p style={{fontWeight: 'bold'}}>{currentCourt.attributes.NAME}</p>
              <p>{`Address: ${currentCourt.attributes.ADDRESS}`}</p>
              <p>{`Condition: ${currentCourt.attributes.CONDITION} / Courts: ${currentCourt.attributes.COURTS}`}</p>
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
