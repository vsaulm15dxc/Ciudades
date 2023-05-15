import React from 'react';

function Card({ data }) {
  return (
    <div className="card">
      <img src={data.flag} alt="Bandera" />
      <h2>Ciudad: {data.city}</h2>
      <p>Comunidad: {data.region}</p>
      <div className="weather-info">
        <h3>Información climática:</h3>
        <div className="temperature-chart">
          <div className="temperature-axis">
            <span>{data.minTemperature}°C</span>
            <span>{data.maxTemperature}°C</span>
          </div>
          <div className="temperature-bars">
            {data.weatherData.map((temperature, index) => (
              <div
                key={index}
                className="temperature-bar"
                style={{ height: `${temperature}px` }}
              ></div>
            ))}
          </div>
          <div className="temperature-labels">
            {data.weatherData.map((temperature, index) => (
              <span key={index}>{temperature}°C</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
