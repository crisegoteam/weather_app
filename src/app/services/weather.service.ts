import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherDataToSend, WeatherForecastResponse } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  baseUrl = environment.api.weather;
  constructor(private http: HttpClient) {}

  getForecastWeather(
    data: WeatherDataToSend
  ): Observable<WeatherForecastResponse> {
    return this.http.get<WeatherForecastResponse>(
      `${this.baseUrl.url_forecast}?key=${this.baseUrl.key}&q=${data.query}&days=${data.days}&aqi=no&alerts=no`
    );
  }
}
