import React from 'react';
import * as LucideIcons from 'lucide-react';
import { getWeatherInfo } from '../utils/weatherCodes';

export const WeatherCard = ({ weather, locationName }) => {
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const weatherInfo = getWeatherInfo(current.weather_code);
  const IconComponent = LucideIcons[weatherInfo.icon] || LucideIcons.Cloud;

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>{locationName}</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Aujourd'hui
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
        <IconComponent size={80} strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />
        <div style={{ fontSize: '5rem', fontWeight: 300, lineHeight: 1, margin: '1rem 0' }}>
          {Math.round(current.temperature_2m)}°
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 500 }}>
          {weatherInfo.label}
        </div>
        <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Ressenti {Math.round(current.apparent_temperature)}°
        </div>
      </div>

      <div style={{ 
        display: 'flex', justifyContent: 'space-between', 
        borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' 
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <LucideIcons.CloudRain size={24} color="var(--text-secondary)" />
          <span style={{ fontWeight: 600 }}>{current.precipitation} mm</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pluie</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <LucideIcons.Droplets size={24} color="var(--text-secondary)" />
          <span style={{ fontWeight: 600 }}>{current.relative_humidity_2m}%</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Humidité</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <LucideIcons.Wind size={24} color="var(--text-secondary)" />
          <span style={{ fontWeight: 600 }}>{current.wind_speed_10m} km/h</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Vent</span>
        </div>
      </div>
    </div>
  );
};
