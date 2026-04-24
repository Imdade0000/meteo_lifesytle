export const getWeatherData = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur lors de la récupération des données météo');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur weatherAPI:', error);
    throw error;
  }
};
