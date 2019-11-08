import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  city;
  state;
  stateSeal;
  weatherData;
  hourlyDataSet;

  activeTab;
  isLoading;
  isFavorited;
  
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

      this.city =city;
      this.state = state;
      this.setIsFavorited();

      loaderService.isLoading.next(true);

      const useCurrentLocation = lat !== undefined && lon !== undefined;

      if (useCurrentLocation) {
        weatherService.getWeatherDataByCoordinate(lat, lon).subscribe((response: any) => {
          const {
            stateSeal,
            weatherData,
          } = response;

          this.stateSeal = stateSeal;
          this.weatherData = weatherData;;

          this.createHourlyDataSet();
          loaderService.isLoading.next(false);
        });
      } else {
        weatherService.getWeatherDataByFullAddress(street, city, state).subscribe((response: any) => {
          const {
            stateSeal,
            weatherData,
          } = response;

          this.stateSeal = stateSeal;
          this.weatherData = weatherData;;

          this.createHourlyDataSet();
          loaderService.isLoading.next(false);
        });
      }
    });
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  createHourlyDataSet() {
    this.hourlyDataSet = {
      temperature: this.getHourlyDataByType('temperature'),
      pressure: this.getHourlyDataByType('pressure'),
      humidity: this.getHourlyDataByType('humidity'),
      ozone: this.getHourlyDataByType('ozone'),
      visibility: this.getHourlyDataByType('visibility'),
      windSpeed: this.getHourlyDataByType('windSpeed'),
    };
  }

  getHourlyDataByType(type: string) {
    return this.weatherData.hourly.data.map((el) => el[type]);
  }

  setIsFavorited() {
    const storageId = this.city + this.state;
    this.isFavorited = localStorage.getItem(storageId) !== null;
  }

  toggleFavorite() {
    const storageId = this.city + this.state;
    const hasBeenAdded = localStorage.getItem(storageId) !== null;

    if (!hasBeenAdded) {
      localStorage.setItem(storageId, this.createLocalStorageFavoriteData(this.city, this.state, this.stateSeal));
    } else {
      localStorage.removeItem(storageId);
    }

    this.setIsFavorited();
  }

  createLocalStorageFavoriteData(city, state, image) {
    const storageId = city + state;

    return JSON.stringify({
      id: storageId,
      city,
      state,
      image,
    });
  }

  ngOnInit() {
  }

}
