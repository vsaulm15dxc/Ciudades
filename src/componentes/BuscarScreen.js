import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BuscarForm from './FormularioBusqueda';
import CollapsibleCard from './CollapsibleCard';
import Card from './Card';
import GeographicalCard from './GeographicalCard';
import ClimaCard from './ClimaCard';
import MainMenu from './MainMenu';
import { HistoryContext } from './HistorialProvider';

import loadingGif from './Images/loading.gif'; // Importa el GIF animado

function BuscarScreen() {
  const [buscarResult, setBuscarResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [showLoading, setShowLoading] = useState(false); // Nueva variable de estado
  const [historial, setHistorial] = useContext(HistoryContext);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.historial) {
      setHistorial(location.state.historial);
    }
  }, [location.state, setHistorial]);

  useEffect(() => {
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
      setShowLoading(true); // Mostrar el GIF animado

      setLoading(true);
      let buscarData = null;

      if (!code) {
        setErrorMessage('El código postal no puede estar vacío.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setLoading(false);
        setShowLoading(false); // Ocultar el GIF animado
        return;
      }

      if (!/^\d+$/.test(code)) {
        setErrorMessage('El código postal debe ser numérico.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setBuscarResult(null);
        setLoading(false);
        setShowLoading(false); // Ocultar el GIF animado
        return;
      }

      if (code.length !== 5) {
        setErrorMessage('El código postal debe tener 5 dígitos.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setBuscarResult(null);
        setLoading(false);
        setShowLoading(false); // Ocultar el GIF animado
        return;
      }

      const zipopotamResponse = await fetch(`https://api.zippopotam.us/es/${code}`);
      if (!zipopotamResponse.ok) {
        setErrorMessage('El codigo introducido no está asociado a alguna ciudad.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setBuscarResult(null);
        setLoading(false);
        setShowLoading(false); // Ocultar el GIF animado
        return;
      }
      const zipopotamData = await zipopotamResponse.json();

      const placeName = zipopotamData?.places?.[0]?.['place name'];
      if (!placeName) {
        setErrorMessage('No se encontró información para el código postal ingresado.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setBuscarResult(null);
        setLoading(false);
        setShowLoading(false); // Ocultar el GIF animado
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
        setErrorMessage('No se pudo obtener la información climática.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setBuscarResult(null);
        setLoading(false);
        setShowLoading(false); // Ocultar el GIF animado
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
      setShowLoading(false); // Ocultar el GIF animado

      setHistorial((prevHistorial) => [...prevHistorial, buscarData]);
    } catch (error) {
      console.error(error);
      setErrorMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      setBuscarResult(null);
      setLoading(false);
      setShowLoading(false); // Ocultar el GIF animado
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
      {errorMessage && <p>{errorMessage}</p>}
      {showLoading && <img src={loadingGif} alt="Loading" className="loading-gif" />} 
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
