import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})
export class HourlyWeatherComponent implements OnInit {
  @Input() hourlyData;

  constructor() { }

  ngOnInit() {
    
  }

}
