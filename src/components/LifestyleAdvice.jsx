import React from 'react';
import { Shirt, Coffee, ThermometerSun, CloudRain } from 'lucide-react';

export const LifestyleAdvice = ({ weather }) => {
  if (!weather || !weather.current) return null;

  const { temperature_2m, precipitation, weather_code } = weather.current;

  // Simple logic for lifestyle advice
  let clothing = {
    title: "Comment s'habiller ?",
    text: "Une tenue légère est recommandée.",
    icon: Shirt
  };
  let activity = {
    title: "Que faire ?",
    text: "Profitez d'une promenade !",
    icon: Coffee
  };

  // Cold
  if (temperature_2m < 10) {
    clothing.text = "Sortez le manteau d'hiver et une écharpe !";
  } else if (temperature_2m < 18) {
    clothing.text = "Une veste légère ou un pull sera parfait.";
  } else if (temperature_2m > 28) {
    clothing.text = "Il fait chaud ! Privilégiez des vêtements amples et clairs (lin/coton).";
  }

  // Rain or Bad Weather
  if (precipitation > 0 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(weather_code)) {
    clothing.text += " N'oubliez pas votre parapluie ou un imperméable ☔.";
    activity.text = "Temps idéal pour un film à la maison ou un café en intérieur.";
    activity.icon = CloudRain;
  } else if (temperature_2m > 25) {
    activity.text = "Génial pour la plage ou une activité en plein air ! N'oubliez pas de vous hydrater.";
    activity.icon = ThermometerSun;
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '12px' }}>
          <clothing.icon size={24} />
        </div>
        <div>
          <h4 style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>{clothing.title}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{clothing.text}</p>
        </div>
      </div>

      <div style={{ background: 'var(--glass-border)', height: '1px', width: '100%' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '12px' }}>
          <activity.icon size={24} />
        </div>
        <div>
          <h4 style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>{activity.title}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{activity.text}</p>
        </div>
      </div>
    </div>
  );
};
