import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { searchCity } from '../services/geoService';

export const SearchBar = ({ onCitySelect, onUseLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await searchCity(query);
        setSuggestions(results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  const handleSelect = (city) => {
    onCitySelect(city);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', zIndex: 50 }}>
      <div className="glass-panel" style={{ 
        display: 'flex', alignItems: 'center', padding: '0.75rem 1.5rem',
        borderRadius: '30px'
      }}>
        <Search size={20} color="var(--text-secondary)" style={{ marginRight: '10px' }} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une ville..."
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            outline: 'none',
            flex: 1,
            width: '100%',
            fontFamily: 'var(--font-family)'
          }}
        />
        {query && (
          <X 
            size={20} 
            color="var(--text-secondary)" 
            style={{ cursor: 'pointer', marginRight: '10px' }} 
            onClick={() => { setQuery(''); setSuggestions([]); }} 
          />
        )}
        <div 
          onClick={onUseLocation}
          style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          title="Utiliser ma position"
        >
          <MapPin size={22} color="var(--text-primary)" />
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="glass-panel animate-fade-in" style={{
          position: 'absolute', top: 'calc(100% + 10px)', left: 0, right: 0,
          padding: '0.5rem 0', borderRadius: '20px', maxHeight: '250px', overflowY: 'auto'
        }}>
          {suggestions.map((city, idx) => (
            <div 
              key={`${city.lat}-${city.lon}-${idx}`}
              onClick={() => handleSelect(city)}
              style={{
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
                borderBottom: idx < suggestions.length - 1 ? '1px solid var(--glass-border)' : 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontWeight: 600 }}>{city.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{city.fullName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
