import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorState = ({ message }) => {
  return (
    <div className="glass-panel animate-fade-in" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', textAlign: 'center', background: 'rgba(255, 50, 50, 0.15)'
    }}>
      <AlertCircle size={48} color="#ff6b6b" style={{ marginBottom: '1rem' }} />
      <h3 style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Oups!</h3>
      <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{message}</p>
    </div>
  );
};
