import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BuscarForm from './FormularioBusqueda';
import CollapsibleCard from './CollapsibleCard';
import Card from './Card';
import GeographicalCard from './GeographicalCard';
import ClimaCard from './ClimaCard';
import MainMenu from './MainMenu';
import { HistoryContext } from './HistorialProvider';

function BuscarScreen() {
  const [buscarResult, setBuscarResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [historial, setHistorial] = useContext(HistoryContext); // Obtener el historial del contexto
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.historial) {
      setHistorial(location.state.historial);
    }
  }, [location.state, setHistorial]);

  useEffect(() => {
    // Actualizar el estado de ubicación con el historial actualizado
    navigate('/', { state: { historial }, replace: true });
  }, [historial, navigate]);

  useEffect(() => {
    if (location.state && location.state.buscarData) {
      const lastSearchResult = location.state.buscarData;
      setBuscarResult(lastSearchResult);
      setLoading(false);
    }
  }, [location.state]);
  

  const handleSearch = async (code) => {
    try {
      setLoading(true);
      let buscarData = null;

      const zipopotamResponse = await fetch(`https://api.zippopotam.us/es/${code}`);
      if (!zipopotamResponse.ok) {
        setBuscarResult(null);
        setLoading(false);
        return;
      }
      const zipopotamData = await zipopotamResponse.json();

      const placeName = zipopotamData?.places?.[0]?.['place name'];
      if (!placeName) {
        setBuscarResult(null);
        setLoading(false);
        return;
      }

      const latitude = zipopotamData?.places?.[0]?.latitude;
      const longitude = zipopotamData?.places?.[0]?.longitude;
      const region = zipopotamData?.places?.[0]?.state;
      const regionAbbreviation = zipopotamData?.places?.[0]?.state_abbreviation;

      const openMeteoResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode&forecast_days=1`
      );
      if (!openMeteoResponse.ok) {
        setBuscarResult(null);
        setLoading(false);
        return;
      }
      const openMeteoData = await openMeteoResponse.json();

      const weatherData = openMeteoData?.hourly?.weathercode;

      buscarData = {
        codigoPostal: code,
        city: placeName,
        region: region,
        regionAbbreviation: regionAbbreviation,
        latitude: latitude,
        longitude: longitude,
        minTemperature: 0,
        maxTemperature: 0,
        weatherData: weatherData || [],
      };

      setBuscarResult(buscarData);
      setLoading(false);

      // Añadir la búsqueda al historial
      setHistorial(prevHistorial => [...prevHistorial, buscarData]);
    } catch (error) {
      console.error(error);
      setBuscarResult(null);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!postalCode) {
      alert('Ingrese un código postal válido');
      return;
    }

    if (isNaN(postalCode)) {
      alert('El código postal debe ser numérico');
      return;
    }

    handleSearch(postalCode);
  };

  return (
    <div className="buscar-screen">
      <MainMenu title="Ciudades" />
      <BuscarForm
        onSearch={handleSearch}
        onChange={(event) => setPostalCode(event.target.value)}
        onSubmit={handleSubmit}
        disabled={loading}
      />
      {!buscarResult && !loading && postalCode && (
        <p>No se encontró información para el código postal ingresado.</p>
      )}
      {loading && <p>Realizando búsqueda...</p>}
      {buscarResult && (
        <div>
          <h2>Ciudad: {buscarResult.city}</h2>
          <CollapsibleCard title="Información política">
            <Card data={buscarResult} />
          </CollapsibleCard>
          <CollapsibleCard title="Información climática">
            <ClimaCard data={buscarResult} />
          </CollapsibleCard>
          <CollapsibleCard title="Información geográfica">
            <GeographicalCard data={buscarResult} />
          </CollapsibleCard>
        </div>
      )}
    </div>
  );
}

export default BuscarScreen;
