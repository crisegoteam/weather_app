export interface WeatherDataToSend {
    query: string;
    days: string;
}
export interface WeatherForecastResponse {
  location: location;
  current: currentDay;
  forecast: forecast;
}

interface location {
  name: any;
  region: any;
  country: any;
  lat: any;
  lon: any;
  tz_id: any;
  localtime_epoch: any;
  localtime: any;
}

interface currentDay {
  last_updated_epoch: any;
  last_updated: any;
  temp_c: any;
  temp_f: any;
  is_day: any;
  condition: {
    text: any;
    icon: any;
    code: any;
  };
  wind_mph: any;
  wind_kph: any;
  wind_degree: any;
  wind_dir: any;
  pressure_mb: any;
  pressure_in: any;
  precip_mm: any;
  precip_in: any;
  humidity: any;
  cloud: any;
  feelslike_c: any;
  feelslike_f: any;
  vis_km: any;
  vis_miles: any;
  uv: any;
  gust_mph: any;
  gust_kph: any;
}

interface forecast {
  forecastday: forecastday[];
}

interface forecastday {
  date: any;
  date_epoch: any;
  day: {
    maxtemp_c: any;
    maxtemp_f: any;
    mintemp_c: any;
    mintemp_f: any;
    avgtemp_c: any;
    avgtemp_f: any;
    maxwind_mph: any;
    maxwind_kph: any;
    totalprecip_mm: any;
    totalprecip_in: any;
    avgvis_km: any;
    avgvis_miles: any;
    avghumidity: any;
    daily_will_it_rain: any;
    daily_chance_of_rain: any;
    daily_will_it_snow: any;
    daily_chance_of_snow: any;
    condition: {
      text: any;
      icon: any;
      code: any;
    };
    uv: any;
  };
  astro: {
    sunrise: any;
    sunset: any;
    moonrise: any;
    moonset: any;
    moon_phase: any;
    moon_illumination: any;
  };
  hour: hour[];
}

interface hour {
  time_epoch: any;
  time: any;
  temp_c: any;
  temp_f: any;
  is_day: any;
  condition: {
    text: any;
    icon: any;
    code: any;
  };
  wind_mph: any;
  wind_kph: any;
  wind_degree: any;
  wind_dir: any;
  pressure_mb: any;
  pressure_in: any;
  precip_mm: any;
  precip_in: any;
  humidity: any;
  cloud: any;
  feelslike_c: any;
  feelslike_f: any;
  windchill_c: any;
  windchill_f: any;
  heatindex_c: any;
  heatindex_f: any;
  dewpoint_c: any;
  dewpoint_f: any;
  will_it_rain: any;
  chance_of_rain: any;
  will_it_snow: any;
  chance_of_snow: any;
  vis_km: any;
  vis_miles: any;
  gust_mph: any;
  gust_kph: any;
  uv: any;
}
