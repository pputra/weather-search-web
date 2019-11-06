import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  currWeatherData;

  constructor(
    private activeRoute: ActivatedRoute,
    private weatherService: WeatherService,
  ) { 
    this.activeRoute.queryParams.subscribe(queries => {
      const {
        street,
        city,
        state,
        lat,
        lon,
      } = queries;

      weatherService.getWeatherDataByFullAddress(street, city, state).subscribe((response: any) => {
        let weatherData = response;

        this.currWeatherData = JSON.stringify(weatherData);
      });
    });
  }

  ngOnInit() {
  }

}
