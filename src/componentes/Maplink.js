import React from 'react';

function MapLink({ latitude, longitude, zoom }) {
  const handleClick = () => {
    const url = `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`;
    window.open(url, '_blank');
  };

  return (
    <div className="map-link">
      <button onClick={handleClick}>Ver en el mapa</button>
    </div>
  );
}

export default MapLink;
