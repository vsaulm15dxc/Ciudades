export async function handleSearch(
    code,
    setErrorMessage,
    setBuscarResult,
    setLoading,
    setShowLoading,
    setHistorial,
    fetchZipopotam,
    fetchOpenMeteo
  ) {
    try {
      setShowLoading(true);
  
      setLoading(true);
      let buscarData = null;
  
      if (!code) {
        setErrorMessage('El código postal no puede estar vacío.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setLoading(false);
        setShowLoading(false);
        return;
      }
  
      if (!/^\d+$/.test(code)) {
        setErrorMessage('El código postal debe ser numérico.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setBuscarResult(null);
        setLoading(false);
        setShowLoading(false);
        return;
      }
  
      if (code.length !== 5) {
        setErrorMessage('El código postal debe tener 5 dígitos.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setBuscarResult(null);
        setLoading(false);
        setShowLoading(false);
        return;
      }
  
      const zipopotamData = await fetchZipopotam(code);
  
      const { placeName, latitude, longitude, region, regionAbbreviation } = zipopotamData;
  
      const weatherData = await fetchOpenMeteo(latitude, longitude);
  
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
      setShowLoading(false);
  
      setHistorial((prevHistorial) => [...prevHistorial, buscarData]);
    } catch (error) {
      console.error(error);
      setErrorMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      setBuscarResult(null);
      setLoading(false);
      setShowLoading(false);
    }
  }
  
  export function handleSubmit(event, postalCode, handleSearch) {
    event.preventDefault();
    handleSearch(postalCode);
  }
  