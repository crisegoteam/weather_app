import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeolocationResponse } from './models/geolocation';
import { WeatherDataToSend, WeatherForecastResponse } from './models/weather';
import { GeolocationService } from './services/geolocation.service';
import { LocalStorageService } from './services/local-storage.service';
import { WeatherService } from './services/weather.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import * as fakeWeatherData from './resources/weatherTestData.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 300, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
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
  isCelsius: boolean = true;
  showDataTemperature: 'temp_c' | 'temp_f' = 'temp_c';
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
        error: (error) => this.handleCurrrentWeatherResponseError(error),
      });
  }
  handleCurrrentWeatherResponseError(error: any) {
    console.log(error);
    this.forecastWeather = fakeWeatherData;
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'Api not responding',
      text: 'Test data is used',
    });
  }
  getIconWeather(icon: string) {
    if (icon) {
      const image: any = icon.split('/');
      return `https://cdn.weatherapi.com/weather/128x128/${image.at(
        -2
      )}/${image.at(-1)}`;
    }
    return './assets/icons/weather/celsius.svg';
  }
  formatDate(dateWeather: string, customOption: {} = '') {
    const date = new Date(dateWeather);
    const time = date.getTime();
    const options: any = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleDateString('en-EN', customOption || options);
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
  openSidebar() {
    this.showSidebar = !this.showSidebar;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 300);
  }
  changeTemperature(
    currentWeather: WeatherForecastResponse,
    temp: 'temp_c' | 'temp_f'
  ) {
    this.isCelsius = temp === 'temp_c' ? true : false;
    this.showDataTemperature = temp;
  }
  getTemperature(tempObj: any, prefix: any = '') {
    if (tempObj && tempObj[prefix + this.showDataTemperature]) {
      return tempObj[prefix + this.showDataTemperature];
    }
  }
}
