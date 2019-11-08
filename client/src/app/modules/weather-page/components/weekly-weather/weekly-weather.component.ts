import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../../../../assets/canvasjs';

@Component({
  selector: 'app-weekly-weather',
  templateUrl: './weekly-weather.component.html',
  styleUrls: ['./weekly-weather.component.css']
})
export class WeeklyWeatherComponent implements OnInit {
  @Input() weeklyDataSet;

  constructor() { }

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
      }]
    });
    chart.render();
  }

}
