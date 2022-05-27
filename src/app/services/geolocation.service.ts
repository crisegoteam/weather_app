import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeolocationResponse } from '../models/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  baseUrl = environment.api.geolocation.url;
  constructor(private http: HttpClient) {}

  getGeolocation(): Observable<GeolocationResponse> {
    return this.http.get<GeolocationResponse>(this.baseUrl);
  }
}
