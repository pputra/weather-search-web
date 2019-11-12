import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})
export class HourlyWeatherComponent implements OnInit {
  @Input() hourlyDataSet;

  activeChart;
  chartOptions;
  chartConfigs;
  barChartLabels = [ ...Array(24).keys() ];
  barChartType = 'bar';
  barChartLegend = true;
  barColors = [
    {
      backgroundColor: this.createBackgroundColors('#80C9F1', 24),
    }
  ];

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
  }

  createBackgroundColors(color, numData) {
    const colors = [];

    for (let i = 0; i < numData; i++) {
      colors.push(color);
    }

    return colors;
  }

  createChartConfig(label, data, yAxisLabel) {
    return { 
      data: [ { data: data, label: label } ],
      barChartOptions: {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
          onClick: (e) => e.stopPropagation(),
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: yAxisLabel
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'time difference from current hour'
            }
          }],
        },
        backgroundColor: [ '#80C9F1' ],
      },
    };
  }

  setActiveChart(dataType) {
    this.activeChart = dataType;
  }

  sortObjectByIndex() {
    return 0;
  }
  
  ngOnInit() {
    this.chartConfigs = {
      temperature: this.createChartConfig('temperature', this.hourlyDataSet.temperature, 'Fahrenheit'),
      pressure: this.createChartConfig('pressure', this.hourlyDataSet.pressure, 'Millibars'),
      humidity: this.createChartConfig('humidity', this.hourlyDataSet.humidity, '% Humidity'),
      ozone: this.createChartConfig('ozone', this.hourlyDataSet.ozone, 'Dobson Units'),
      visibility: this.createChartConfig('visibility', this.hourlyDataSet.visibility, 'Miles (Maximum 10)'),
      windSpeed: this.createChartConfig('windSpeed', this.hourlyDataSet.windSpeed, 'Miles per Hour'),
    };
  }

}
