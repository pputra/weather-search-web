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
}
