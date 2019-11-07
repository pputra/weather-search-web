import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  city;
  stateSeal;
  weatherData;

  activeTab;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private weatherService: WeatherService,
  ) { 
    this.activeTab = 'current';

    this.activeRoute.queryParams.subscribe(queries => {
      const {
        street,
        city,
        state,
        lat,
        lon,
      } = queries;

      const useCurrentLocation = lat !== undefined && lon !== undefined;

      if (useCurrentLocation) {
        weatherService.getWeatherDataByCoordinate(lat, lon).subscribe((response: any) => {
          const {
            stateSeal,
            weatherData,
          } = response;
          this.city = city;
          this.stateSeal = stateSeal;
          this.weatherData = weatherData;;
        });
      } else {
        weatherService.getWeatherDataByFullAddress(street, city, state).subscribe((response: any) => {
          const {
            stateSeal,
            weatherData,
          } = response;
          this.city = city;
          this.stateSeal = stateSeal;
          this.weatherData = weatherData;;
        });
      }
    });
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  ngOnInit() {
  }

}
