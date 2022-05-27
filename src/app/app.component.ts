import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeolocationResponse } from './models/geolocation';
import { WeatherDataToSend, WeatherForecastResponse } from './models/weather';
import { GeolocationService } from './services/geolocation.service';
import { LocalStorageService } from './services/local-storage.service';
import { WeatherService } from './services/weather.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('0.5s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'weather_app';
  geolocationSubscription!: Subscription;
  weatherSubscription!: Subscription;
  currentLocation!: GeolocationResponse;
  forecastWeather!: WeatherForecastResponse;
  @ViewChild('searchLocationWeatherForm') searchLocationWeatherForm!: NgForm;
  @ViewChild('searchInput') searchInput!: ElementRef;
  showSidebar: boolean = false;
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
      const data: WeatherDataToSend = {
        query: currentLocation.country_name,
        days: '5',
      };
      this.getCurrentWeather(data);
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
    const data: WeatherDataToSend = {
      query: this.currentLocation.country_name,
      days: '5',
    };
    this.getCurrentWeather(data);
  }

  getCurrentWeather(data: WeatherDataToSend) {
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
      const image = weather.current.condition.icon.split('/');
      return `https://cdn.weatherapi.com/weather/128x128/${image.at(
        -2
      )}/${image.at(-1)}`;
    }
    return './assets/icons/weather/celsius.svg';
  }
  formatDate(dateWeather: string) {
    const date = new Date(dateWeather);
    const time = date.getTime();
    const options: any = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleDateString('en-EN', options);
  }
  searchLocation(location: { location: string }) {
    const data = {
      query: location.location,
      days: '5',
    };
    this.getCurrentWeather(data);
    this.searchLocationWeatherForm.reset();
    this.showSidebar = !this.showSidebar;
  }
  openSidebar(){
    this.showSidebar = !this.showSidebar;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchInput.nativeElement.focus();
    },300); 
  }
}
