const fetchOpenMeteo = async (latitude, longitude) => {
    const openMeteoResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode&forecast_days=1`
    );
    if (!openMeteoResponse.ok) {
      throw new Error('No se pudo obtener la información climática.');
    }
    const openMeteoData = await openMeteoResponse.json();
  
    const weatherData = openMeteoData?.hourly?.weathercode || [];
  
    return weatherData;
  };
  
  export default fetchOpenMeteo;
  