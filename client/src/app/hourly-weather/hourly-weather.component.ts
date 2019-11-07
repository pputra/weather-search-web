import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})
export class HourlyWeatherComponent implements OnInit {
  @Input() hourlyData;
  activeChart;
  chartOptions;
  chartConfigs;
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = [ ...Array(24).keys() ];
  barChartType = 'bar';
  barChartLegend = true;

  constructor() { 
    this.activeChart = 'temperature'
    this.chartOptions = {
      Temperature: 'temperature',
      Pressure: 'pressure',
      Humidity: 'humidity',
      Ozone: 'ozone',
      Visibility: 'visibility',
      "Wind Speed": 'windSpeed',
    };

    this.chartConfigs = {
      temperature: this.createChartConfig('temperature', [], 'Fahrenheit'),
      pressure: this.createChartConfig('pressure', [], 'Millibars'),
      humidity: this.createChartConfig('humidity', [], '% Humidity'),
      ozone: this.createChartConfig('ozone', [], 'Dobson Units'),
      visibility: this.createChartConfig('visibility', [], 'Miles (Maximum 10)'),
      windSpeed: this.createChartConfig('windSpeed', [], 'Miles per Hour'),
    };
  }

  createChartConfig(label, data, yAxisLabel) {
    return { data: [ { data: [28, 48, 40, 19, 86, 27, 90], label: label } ], yAxisLabel: yAxisLabel };
  }

  setActiveChart(dataType) {
    this.activeChart = dataType;
  }

  sortObjectByIndex() {
    return 0;
  }
  
  ngOnInit() {
    
  }

}
