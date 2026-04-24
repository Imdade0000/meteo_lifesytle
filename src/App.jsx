import React, { useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastList } from './components/ForecastList';
import { LifestyleAdvice } from './components/LifestyleAdvice';
import { Loader } from './components/Loader';
import { ErrorState } from './components/ErrorState';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const { 
    location, 
    setLocation, 
    geoError, 
    isLoading: isGeoLoading 
  } = useGeolocation();

  const {
    weather,
    isLoading: isWeatherLoading,
    error: weatherError
  } = useWeather(location);

  // Mettre à jour dynamique du fond
  useEffect(() => {
    if (!weather?.current) return;
    
    const code = weather.current.weather_code;
    const isDay = weather.current.is_day === 1;
    let fallbackGradient = '';
    // Déterminer l'image de fond locale téléchargée
    let imageUrl = '';
    if ([0, 1].includes(code)) {
      imageUrl = isDay ? '/bg/sunny.jpg' : '/bg/night.jpg';
      fallbackGradient = isDay 
        ? 'linear-gradient(135deg, #2b7bc0 0%, #6fb2ff 100%)' 
        : 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
    } else if ([2, 3].includes(code)) {
      imageUrl = isDay ? '/bg/cloudy.jpg' : '/bg/night.jpg';
      fallbackGradient = 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)';
    } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      imageUrl = '/bg/rain.jpg';
      fallbackGradient = 'linear-gradient(135deg, #2b4162 0%, #fa9c7a 100%)';
    } else if (code >= 71 && code <= 86) {
      imageUrl = '/bg/snow.jpg';
      fallbackGradient = 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)';
    } else if (code >= 95) {
      imageUrl = '/bg/storm.jpg';
      fallbackGradient = 'linear-gradient(135deg, #141E30 0%, #243B55 100%)';
    } else {
      imageUrl = '/bg/sunny.jpg';
      fallbackGradient = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }

    // Appliquer au body
    document.body.style.background = `url('${imageUrl}') center/cover no-repeat fixed, ${fallbackGradient}`;
  }, [weather]);

  const handleCitySelect = (city) => {
    setLocation(city);
  };

  const handleUseLocation = () => {
    // Redemander la position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { getCityNameFromCoords } = await import('./services/geoService');
            const cityData = await getCityNameFromCoords(position.coords.latitude, position.coords.longitude);
            setLocation(cityData);
          } catch (err) { }
        }
      );
    }
  };

  const isLoading = isGeoLoading || isWeatherLoading;
  const currentError = geoError || weatherError;

  return (
    <div className="app-container">
      {/* Header & Search */}
      <div style={{ marginBottom: '1rem' }}>
        <SearchBar onCitySelect={handleCitySelect} onUseLocation={handleUseLocation} />
      </div>

      {/* Content */}
      {isLoading ? (
        <Loader text="Recherche du ciel idéal..." />
      ) : currentError ? (
        <ErrorState message={currentError} />
      ) : weather && location ? (
        <>
          <WeatherCard weather={weather} locationName={location.name} />
          <LifestyleAdvice weather={weather} />
          <ForecastList daily={weather.daily} />
        </>
      ) : (
        <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Commencez par rechercher une ville ou utiliser votre géolocalisation.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
