const fetchZipopotam = async (code) => {
    const zipopotamResponse = await fetch(`https://api.zippopotam.us/es/${code}`);
    if (!zipopotamResponse.ok) {
      throw new Error('El codigo introducido no está asociado a alguna ciudad.');
    }
    const zipopotamData = await zipopotamResponse.json();
  
    const placeName = zipopotamData?.places?.[0]?.['place name'];
    if (!placeName) {
      throw new Error('No se encontró información para el código postal ingresado.');
    }
  
    const latitude = zipopotamData?.places?.[0]?.latitude;
    const longitude = zipopotamData?.places?.[0]?.longitude;
    const region = zipopotamData?.places?.[0]?.state;
    const regionAbbreviation = zipopotamData?.places?.[0]?.state_abbreviation;
  
    return {
      placeName,
      latitude,
      longitude,
      region,
      regionAbbreviation,
    };
  };
  
  export default fetchZipopotam;
  