import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BuscarForm from '../Formulario/FormularioBusqueda';
import CollapsibleCard from '../Cards/Colapsible/CollapsibleCard';
import Card from '../Cards/Card/Card';
import GeographicalCard from '../Cards/Geographic/GeographicalCard';
import ClimaCard from '../Cards/Clima/ClimaCard';
import MainMenu from '../MenuMain/MainMenu';
import { HistoryContext } from '../Historial/HistorialProvider';
import fetchZipopotam from '../Servicios/fetchZipopotam';
import fetchOpenMeteo from '../Servicios/fetchOpenMeteo';
import { handleSearch, handleSubmit } from '../ParametrosBusqueda/SearchHandleler';
import loadingGif from '../Images/loading.gif';

function BuscarScreen() {
  const [buscarResult, setBuscarResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [showLoading, setShowLoading] = useState(false);
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

  const handleSearchWrapper = async (code) => {
    await handleSearch(
      code,
      setErrorMessage,
      setBuscarResult,
      setLoading,
      setShowLoading,
      setHistorial,
      fetchZipopotam,
      fetchOpenMeteo
    );
  };

  const handleSubmitWrapper = (event) => {
    handleSubmit(event, postalCode, handleSearchWrapper);
  };

  return (
    <div className="buscar-screen">
      <MainMenu title="Ciudades" />
      <BuscarForm
        onSearch={handleSearchWrapper}
        onChange={(event) => setPostalCode(event.target.value)}
        onSubmit={handleSubmitWrapper}
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