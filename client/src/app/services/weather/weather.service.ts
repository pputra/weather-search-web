import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  DEFAULT_URL;
  constructor(private http: HttpClient) { 
    this.DEFAULT_URL = 'http://localhost:3000';
  }

  getWeatherDataByFullAddress(street: string, city: string, state: string) {
    //const url = `${this.DEFAULT_URL}/weather?street=${street}&city=${city}&state=${state}`
    const url = `assets/dummy/${state}.json`;

    return this.http.get(url);
  }

  getWeatherDataByCoordinate(lat, lon) {
    const url = `${this.DEFAULT_URL}/weather?lat=${lat}&lon=${lon}`;
    return this.http.get(url);
  }

  getWeatherDataByCoordinateAndTime(lat, lon, time) {
   //const url = `${this.DEFAULT_URL}/weather?lat=${lat}&lon=${lon}&time=${time}`;
    const url = `assets/dummy/CA.json`;
    return this.http.get(url);
  }

  getCityAutoCompleteSuggestions(keyword) {
    const url = `${this.DEFAULT_URL}/places?input=${keyword}`;
    return this.http.get(url);
  }

  getUserCoordinate() {
    const url = 'http://ip-api.com/json';

    return this.http.get(url);
  }
}
