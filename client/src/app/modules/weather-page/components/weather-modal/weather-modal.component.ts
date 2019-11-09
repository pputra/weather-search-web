import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.css']
})
export class WeatherModalComponent implements OnInit {
  @Input() date;
  @Input() temperature;
  @Input() summary;
  @Input() icon;
  @Input() precipitation;
  @Input() chanceOfRain;
  @Input() windSpeed;
  @Input() humidity;
  @Input() visibility;
  constructor() { }

  ngOnInit() {
    
  }
}
