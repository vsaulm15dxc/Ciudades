import React from 'react';
import { useNavigate } from 'react-router-dom';

function HistorialScreen() {
  const historial = useNavigate();
  const buscarResult = historial.location.state;

  return (
    <div className="historial-screen">
      <h1>Historial de Búsquedas</h1>
      {buscarResult ? (
        <div className="historial-card">
          <h2>Código Postal: {buscarResult.codigoPostal}</h2>
          <p>Ciudad: {buscarResult.ciudad}</p>
          <p>Región: {buscarResult.region}</p>
          <p>Datos climáticos:</p>
          <ul>
            {buscarResult.weatherData.map((temperature, index) => (
              <li key={index}>Temperatura: {temperature}°C</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay datos de búsqueda disponibles.</p>
      )}
    </div>
  );
}

export default HistorialScreen;