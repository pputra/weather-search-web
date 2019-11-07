import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() stateSeal;
  @Input() city;
  @Input() timezone;
  @Input() temperature;
  @Input() summary;
  @Input() humidity;
  @Input() pressure;
  @Input() windSpeed;
  @Input() visibility;
  @Input() cloudCover;
  @Input() ozone;
  WEATHER_ICON_SOURCES;

  constructor() { 
   this.WEATHER_ICON_SOURCES = {
      temperature: 'https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png',
      humidity: 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png',
      pressure: 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png',
      windSpeed: 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png',
      visibility: 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png',
      cloudCover: 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png',
      ozone: 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png',
    };
  }

  ngOnInit() {
  }

}
