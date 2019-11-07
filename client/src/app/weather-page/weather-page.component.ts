import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LoaderService } from '../loader.service';
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
  isLoading;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private loaderService: LoaderService,
  ) { 
    this.activeTab = 'current';

    loaderService.isLoading.subscribe((val: any) => {
      this.isLoading = val;
    });

    this.activeRoute.queryParams.subscribe(queries => {
      const {
        street,
        city,
        state,
        lat,
        lon,
      } = queries;

      loaderService.isLoading.next(true);

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

          loaderService.isLoading.next(false);
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

          loaderService.isLoading.next(false);
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
