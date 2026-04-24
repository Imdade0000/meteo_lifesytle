// WMO Weather interpretation codes (OAA)
export const weatherCodes = {
  0: { label: 'Ciel dégagé', icon: 'Sun' },
  1: { label: 'Principalement clair', icon: 'Sun' },
  2: { label: 'Partiellement nuageux', icon: 'CloudSun' },
  3: { label: 'Couvert', icon: 'Cloud' },
  45: { label: 'Brouillard', icon: 'CloudFog' },
  48: { label: 'Brouillard givrant', icon: 'CloudFog' },
  51: { label: 'Bruine légère', icon: 'CloudDrizzle' },
  53: { label: 'Bruine modérée', icon: 'CloudDrizzle' },
  55: { label: 'Bruine dense', icon: 'CloudDrizzle' },
  56: { label: 'Bruine verglaçante', icon: 'CloudSnow' },
  57: { label: 'Bruine verglaçante dense', icon: 'CloudSnow' },
  61: { label: 'Pluie faible', icon: 'CloudRain' },
  63: { label: 'Pluie modérée', icon: 'CloudRain' },
  65: { label: 'Pluie forte', icon: 'CloudRain' },
  66: { label: 'Pluie verglaçante légère', icon: 'CloudHail' },
  67: { label: 'Pluie verglaçante forte', icon: 'CloudHail' },
  71: { label: 'Chute de neige faible', icon: 'CloudSnow' },
  73: { label: 'Chute de neige modérée', icon: 'CloudSnow' },
  75: { label: 'Chute de neige forte', icon: 'Snowflake' },
  77: { label: 'Grains de neige', icon: 'Snowflake' },
  80: { label: 'Averses de pluie légères', icon: 'CloudRain' },
  81: { label: 'Averses de pluie modérées', icon: 'CloudRain' },
  82: { label: 'Averses de pluie violentes', icon: 'CloudLightning' },
  85: { label: 'Averses de neige légères', icon: 'CloudSnow' },
  86: { label: 'Averses de neige fortes', icon: 'Snowflake' },
  95: { label: 'Orage', icon: 'CloudLightning' },
  96: { label: 'Orage avec grêle légère', icon: 'CloudLightning' },
  99: { label: 'Orage avec grêle forte', icon: 'CloudLightning' },
};

export const getWeatherInfo = (code) => {
  return weatherCodes[code] || { label: 'Inconnu', icon: 'Cloud' };
};
