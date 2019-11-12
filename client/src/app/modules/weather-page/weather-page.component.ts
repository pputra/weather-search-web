import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { LoaderService } from '../../services/loader/loader.service';
import { AlertService } from '../../services/alert/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  city;
  state;
  temperature;
  summary;
  lat;
  lon;
  stateSeal;
  weatherData;
  hourlyDataSet;
  weeklyDataSet;

  activeTab;
  isLoading;
  isError = false;
  isFavorited;
  twitterUrl;

  constructor(
    private activeRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private loaderService: LoaderService,
    private alertService: AlertService,
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
      this.isError = false;
      alertService.message.next('');

      const useCurrentLocation = lat !== undefined && lon !== undefined;

      if (useCurrentLocation) {
        weatherService.getWeatherDataByCoordinate(lat, lon, state, true).subscribe((response: any) => {
          const {
            stateSeal,
            weatherData,
          } = response;

          this.stateSeal = stateSeal;
          this.weatherData = weatherData;
          this.lat = weatherData.latitude;
          this.lon = weatherData.longitude;
          this.temperature = weatherData.currently.temperature;
          this.summary = weatherData.currently.summary;
          this.setTwitterUrl();

          this.createHourlyDataSet();
          this.createWeeklyDataSet();
          loaderService.isLoading.next(false);
        }, (err: any) => {
          this.handleError(err);
        });
      } else {
        weatherService.getWeatherDataByFullAddress(street, city, state, true).subscribe((response: any) => {
          const {
            stateSeal,
            weatherData,
          } = response;

          this.stateSeal = stateSeal;
          this.weatherData = weatherData;
          this.lat = weatherData.latitude;
          this.lon = weatherData.longitude;
          this.temperature = weatherData.currently.temperature;
          this.summary = weatherData.currently.summary;
          this.setTwitterUrl();

          this.createHourlyDataSet();
          this.createWeeklyDataSet();
          loaderService.isLoading.next(false);
        }, (err: any) => {
          this.handleError(err);
        });
      }
    });
  }

  handleError(err) {
    this.isError = true;
    this.loaderService.isLoading.next(false);
    this.alertService.message.next(err.error.message);
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

  createWeeklyDataSet() {
    const numData = this.weatherData.daily.data.length;
    this.weeklyDataSet = this.weatherData.daily.data.map((data, i) => ({ 
      x: this.createWeeklyDataSetIndex(i, numData),
      y: [ data.temperatureLow, data.temperatureHigh ],
      label: this.convertUnixTimeToLocalTime(data.time, this.weatherData.offset),
      time: data.time,
    }));
  }

  createWeeklyDataSetIndex(i, numData) {
    return numData * 10 - i * 10;
  }

  convertUnixTimeToLocalTime(epochTimeStamp, offset) {
    const localTime = new Date(epochTimeStamp * 1000 + offset * 3600000);
    const year = localTime.getUTCFullYear();
    const month = localTime.getUTCMonth() + 1;
    const date = localTime.getUTCDate();
    return [date, month, year].join('/');
  }

  setIsFavorited() {
    const storageId = this.city + this.state;
    this.isFavorited = localStorage.getItem(storageId) !== null;
  }

  toggleFavorite() {
    const storageId = this.city + this.state;
    const hasBeenAdded = localStorage.getItem(storageId) !== null;

    if (!hasBeenAdded) {
      localStorage.setItem(storageId, 
        this.createLocalStorageFavoriteData(this.city, this.state,
        this.stateSeal, this.lat, this.lon));
    } else {
      localStorage.removeItem(storageId);
    }

    this.setIsFavorited();
  }

  createLocalStorageFavoriteData(city, state, image, lat, lon) {
    const storageId = city + state;

    return JSON.stringify({
      id: storageId,
      city,
      state,
      image,
      lat,
      lon,
    });
  }

  setTwitterUrl() {
    this.twitterUrl = `https://twitter.com/intent/tweet?text=The%20current%20temperature%20at%20${this.city}%20is%20${this.temperature}%C2%B0%20F.%20The%20weather%20conditions%20are%20${this.summary}.%20%23CSCI571WeatherSearch`
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alertService.message.next('');
  }

}
