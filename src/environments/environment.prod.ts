export const environment = {
  production: true,
  api: {
    geolocation: { url: 'https://api.ipbase.com/v1/json/' },
    weather: {
      key: 'e0b22d7f4b884b3e85104732222605',
      url_history: 'https://api.weatherapi.com/v1/history.json',
      url_forecast: 'https://api.weatherapi.com/v1/forecast.json',
      url_current: 'https://api.weatherapi.com/v1/current.json',
    },
  },
};
