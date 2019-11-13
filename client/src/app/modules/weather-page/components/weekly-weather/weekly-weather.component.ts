import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as CanvasJS from '../../../../../assets/canvasjs';
import { WeatherService } from '../../../../services/weather/weather.service';

@Component({
  selector: 'app-weekly-weather',
  templateUrl: './weekly-weather.component.html',
  styleUrls: ['./weekly-weather.component.css']
})
export class WeeklyWeatherComponent implements OnInit {
  @Input() city;
  @Input() lat;
  @Input() lon;
  @Input() weeklyDataSet;
  @ViewChild('modalTrigger', { static: false }) modalTrigger;

  date;
  temperature;
  summary;
  icon;
  precipitation;
  chanceOfRain;
  windSpeed;
  humidity;
  visibility;

  constructor(
    private weatherService: WeatherService
  ) { }

  toPercentage(num) {
    return Math.round(num * 100);
  }

  toTwoDecimalPlaces(num) {
    if (Number.isInteger(num)) return num;

    return num.toFixed(2);
  }

  showModal() {
    this.modalTrigger.nativeElement.click();
  }

  ngOnInit() {
    CanvasJS.addColorSet("blueShades", [ "#80C9F1" ]);

    const chart = new CanvasJS.Chart("chartContainer", {
      dataPointWidth: 14,
      colorSet: "blueShades",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Weekly Weather"
      },
      axisX: {
        title: "Days"
      },
      axisY: {
        includeZero: false,
        title: "Temperature in Fahrenheit",
        interval: 10,
        gridThickness: 0,
      },
      legend: {
        horizontalAlign: "center",
        verticalAlign: "top",
      },
      data: [{
        type: "rangeBar",
        showInLegend: true,
        indexLabel: "{y[#index]}",
        legendText: "Day wise temperature range",
        toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
        dataPoints: this.weeklyDataSet,
        click: (e) => {
          const unixTime = e.dataPoint.time;
          const localTime = e.dataPoint.label;
          this.weatherService.getWeatherDataByCoordinateAndTime(this.lat, this.lon, unixTime).subscribe((response: any) => {
            const { weatherData: { 
              currently: {
                temperature,
                summary,
                icon,
                precipIntensity,
                precipProbability,
                windSpeed,
                humidity,
                visibility,
              } 
            } 
            } = response;

            this.date = localTime === undefined || localTime === null ? 'N/A' : localTime;
            this.temperature = temperature;
            this.summary = summary === undefined || summary === null ? 'N/A' : summary;
            this.icon = icon
            this.precipitation = precipIntensity === undefined || precipIntensity === null ? 'N/A' : this.toTwoDecimalPlaces(precipIntensity);
            this.chanceOfRain =  precipProbability === undefined || precipProbability === null ? 'N/A' : `${this.toPercentage(precipProbability)} %`;
            this.windSpeed = windSpeed === undefined || windSpeed === null ? 'N/A' : `${this.toTwoDecimalPlaces(windSpeed)} mph`;
            this.humidity = humidity === undefined || humidity === null ? 'N/A' : `${this.toPercentage(humidity)} %`;
            this.visibility = visibility === undefined || visibility === null ? 'N/A' : `${this.toTwoDecimalPlaces(visibility)} miles`;

            this.showModal();
          });
       },
      }],
    });
    chart.render();
  }

}
