export const searchCity = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=fr`
    );
    if (!response.ok) throw new Error('Erreur réseau lors de la recherche de ville');
    const data = await response.json();
    return data.map(city => ({
      name: city.display_name.split(',')[0],
      fullName: city.display_name,
      lat: parseFloat(city.lat),
      lon: parseFloat(city.lon)
    }));
  } catch (error) {
    console.error('Erreur geoService:', error);
    throw error;
  }
};

export const getCityNameFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=fr`
    );
    if (!response.ok) throw new Error('Erreur lors de la géolocalisation inverse');
    const data = await response.json();
    return {
      name: data.address.city || data.address.town || data.address.village || 'Position actuelle',
      fullName: data.display_name,
      lat,
      lon
    };
  } catch (error) {
    console.error('Erreur reverse geoService:', error);
    throw error;
  }
};
