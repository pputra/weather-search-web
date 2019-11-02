import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor() { }

  getWeatherDataByFullAddress(street: string, city: string, state: string) {
    alert(`fetching data to server: ${street} ${city} ${state}`);
  }
}
