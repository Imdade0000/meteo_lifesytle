import React from 'react';

export const Loader = ({ text = "Chargement..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 glass-panel animate-fade-in" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div className="spinner mb-4" style={{ marginBottom: '1rem' }}></div>
      <p className="text-secondary" style={{ color: 'var(--text-secondary)' }}>{text}</p>
    </div>
  );
};
