import React from 'react';
import './GeographicalCard.css';
import mapa from '../../Images/mapa.png';


function GeographicalCard({ data }) {
  const latitude = data?.latitude;
  const longitude = data?.longitude;

  const handleClick = () => {
    const url = `https://www.google.com/maps/@${latitude},${longitude},12z`;
    window.open(url, '_blank');
  };

  return (
    <div className="card">
      <div className="card-content">
        <br />
        <h4>Latitud: {latitude}</h4>
        <h4>Longitud: {longitude}</h4>
        <div className="map-link-container">
          <button className="map-link" onClick={handleClick}>
            <span className="map-icon-wrapper">
              <img src={mapa} alt="Map Icon" className="map-icon" />
            </span>
            Ver en el mapa
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeographicalCard;