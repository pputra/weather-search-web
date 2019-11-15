import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.css']
})
export class WeatherModalComponent implements OnInit {
  @Input() date;
  @Input() city;
  @Input() temperature;
  @Input() summary;
  @Input() icon;
  @Input() precipitation;
  @Input() chanceOfRain;
  @Input() windSpeed;
  @Input() humidity;
  @Input() visibility;

  DEGREE_PNG = 'https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png';


  DETAIL_WEATHER_PNG_SOURCES = {
    'clear-day': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png',
    'clear-night': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png',
    'rain': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png',
    'snow': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png',
    'sleet': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png',
    'wind': 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png',
    'fog': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png',
    'cloudy': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png',
    'partly-cloudy-day': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png',
    'partly-cloudy-night': 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png',
  };

  constructor() {}

  ngOnInit() {

  }
}
