// BuscarScreen.js
import React, { useState } from 'react';
import BuscarForm from './FormularioBusqueda';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function BuscarScreen() {
  const [buscarResult, setBuscarResult] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (postalCode) => {
    try {
      const zipopotamResponse = await fetch(`https://api.zippopotam.us/es/${postalCode}`);
      if (!zipopotamResponse.ok) {
        throw new Error('No se encontró información para el código postal ingresado.');
      }
      const zipopotamData = await zipopotamResponse.json();

      const latitude = zipopotamData?.places[0]?.latitude;
      const longitude = zipopotamData?.places[0]?.longitude;

      const openMeteoResponse = await fetch(
        `https://api.openmeteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      );
      if (!openMeteoResponse.ok) {
        throw new Error('No se pudo obtener la información climática.');
      }
      const openMeteoData = await openMeteoResponse.json();

      const ciudad = zipopotamData?.places[0]?.placename;
      const region = zipopotamData?.places[0]?.region;
      const weatherData = openMeteoData?.hourly?.temperature_2m;

      const buscarData = {
        ciudad,
        region,
        weatherData,
      };

      setBuscarResult(buscarData);
      navigate('/historial', { state: buscarData });
    } catch (error) {
      console.error(error);
      setBuscarResult(null);
    }
  };

  return (
    <div className="buscar-screen">
      <h1>Búsqueda de Código Postal</h1>
      <BuscarForm onSearch={handleSearch} />
      {buscarResult ? (
        <Card data={buscarResult} />
      ) : (
        <p>No se encontró información para el código postal ingresado.</p>
      )}
    </div>
  );
}

export default BuscarScreen;
