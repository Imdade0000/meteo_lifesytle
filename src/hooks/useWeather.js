import { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weatherAPI';

export const useWeather = (location) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getWeatherData(location.lat, location.lon);
        setWeather(data);
      } catch (err) {
        setError('Impossible de récupérer la météo pour cette position.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weather, isLoading, error };
};
