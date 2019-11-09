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

  ngOnInit() {
    CanvasJS.addColorSet("blueShades", [ "#80C9F1" ]);

    const chart = new CanvasJS.Chart("chartContainer", {
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

            this.date = localTime;
            this.temperature = temperature;
            this.summary = summary
            this.icon = icon
            this.precipitation = precipIntensity;
            this.chanceOfRain =  precipProbability;
            this.windSpeed = windSpeed;
            this.humidity = humidity;
            this.visibility = visibility;

            this.showModal();
          });
       },
      }],
    });
    chart.render();
  }

  showModal() {
    this.modalTrigger.nativeElement.click();
  }

}
