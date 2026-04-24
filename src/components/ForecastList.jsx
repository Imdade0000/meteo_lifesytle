import React from 'react';
import * as LucideIcons from 'lucide-react';
import { getWeatherInfo } from '../utils/weatherCodes';

const ForecastItem = ({ dateStr, min, max, code, pop }) => {
  const date = new Date(dateStr);
  const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date);
  
  const weatherInfo = getWeatherInfo(code);
  const IconComponent = LucideIcons[weatherInfo.icon] || LucideIcons.Cloud;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '1rem', flex: '0 0 auto', minWidth: '80px'
    }}>
      <div style={{ textTransform: 'capitalize', fontWeight: 500, marginBottom: '0.75rem' }}>{dayName}</div>
      <IconComponent size={32} style={{ marginBottom: '0.75rem' }} />
      <div style={{ display: 'flex', gap: '8px', fontSize: '0.9rem' }}>
        <span style={{ fontWeight: 600 }}>{Math.round(max)}°</span>
        <span style={{ color: 'var(--text-secondary)' }}>{Math.round(min)}°</span>
      </div>
      {pop > 0 && (
        <div style={{ fontSize: '0.75rem', color: '#6fb2ff', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
          <LucideIcons.Umbrella size={12} /> {pop}%
        </div>
      )}
    </div>
  );
};

export const ForecastList = ({ daily }) => {
  if (!daily || !daily.time) return null;

  // Prendre les 5 prochains jours (en sautant aujourd'hui index 0)
  const forecastDays = [1, 2, 3, 4, 5].filter(idx => daily.time[idx]);

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', overflow: 'hidden' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LucideIcons.Calendar size={18} /> Prévisions à 5 jours
      </h3>
      
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '0.5rem',
        paddingBottom: '0.5rem',
        scrollbarWidth: 'thin'
      }}>
        {forecastDays.map((idx) => (
          <ForecastItem 
            key={daily.time[idx]}
            dateStr={daily.time[idx]}
            min={daily.temperature_2m_min[idx]}
            max={daily.temperature_2m_max[idx]}
            code={daily.weather_code[idx]}
            pop={daily.precipitation_probability_max[idx]}
          />
        ))}
      </div>
    </div>
  );
};
