import React from 'react';

function ClimaCard({ data }) {
  return (
    <div className="clima-card">
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
  );
}

export default ClimaCard;
