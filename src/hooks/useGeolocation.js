import { useState, useEffect } from 'react';
import { getCityNameFromCoords } from '../services/geoService';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("La géolocalisation n'est pas supportée par votre navigateur.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const cityData = await getCityNameFromCoords(latitude, longitude);
          setLocation(cityData);
        } catch (err) {
          setGeoError("Impossible de déterminer la ville actuelle.");
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setGeoError("Veuillez rechercher une ville manuellement.");
        setIsLoading(false);
      }
    );
  }, []);

  return { location, setLocation, geoError, isLoading };
};
