import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationResponse } from './models/geolocation';
import { WeatherDataToSend, WeatherForecastResponse } from './models/weather';
import { GeolocationService } from './services/geolocation.service';
import { LocalStorageService } from './services/local-storage.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'weather_app';
  geolocationSubscription!: Subscription;
  weatherSubscription!: Subscription;
  currentLocation!: GeolocationResponse;
  forecastWeather!: WeatherForecastResponse;
  constructor(
    private geolocationService: GeolocationService,
    private localStorageService: LocalStorageService,
    private weatherService: WeatherService
  ) {}
  ngOnInit(): void {
    this.getGeolocation();
  }
  ngOnDestroy(): void {
    this.geolocationSubscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
  }
  getGeolocation() {
    const currentLocation = this.localStorageService.getItem('currentLocation');
    if (currentLocation.country_name) {
      this.getCurrentWeather(currentLocation);
      return (this.currentLocation = currentLocation);
    }
    this.geolocationSubscription = this.geolocationService
      .getGeolocation()
      .subscribe({
        next: (geolocation: GeolocationResponse) =>
          this.handleGeoLocationResponse(geolocation),
        error: (error) => console.log(error),
      });
  }
  handleGeoLocationResponse(geolocation: GeolocationResponse) {
    this.currentLocation = geolocation;
    this.localStorageService.setItem('currentLocation', geolocation);
    this.getCurrentWeather(this.currentLocation);
  }

  getCurrentWeather(currentLocation: GeolocationResponse) {
    const data: WeatherDataToSend = {
      query: currentLocation.country_name,
      days: '5',
    };
    this.weatherSubscription = this.weatherService
      .getForecastWeather(data)
      .subscribe({
        next: (weather: WeatherForecastResponse) =>
          (this.forecastWeather = weather),
        error: (error) => console.log(error),
      });
  }
  getIconWeather(weather: WeatherForecastResponse) {
    if (weather) {
      const image = weather.current.condition.icon.split('/').pop();
      return `https://cdn.weatherapi.com/weather/128x128/night/${image}`;
    }
    return './assets/icons/weather/celsius.svg';
  }
  formatDate(dateWeather: string) {
    const date = new Date(dateWeather);
    const options: any = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-EN', options);
  }
}
