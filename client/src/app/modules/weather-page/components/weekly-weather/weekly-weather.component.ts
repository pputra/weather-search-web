import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../../assets/canvasjs';

@Component({
  selector: 'app-weekly-weather',
  templateUrl: './weekly-weather.component.html',
  styleUrls: ['./weekly-weather.component.css']
})
export class WeeklyWeatherComponent implements OnInit {

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
        dataPoints: [
          { x: 10, y:[80, 115], label: "11/15/19" },
          { x: 20, y:[95, 141], label: "11/14/19" },
          { x: 30, y:[98, 115], label: "11/13/19" },
          { x: 40, y:[90, 160], label: "11/12/19" },
          { x: 50, y:[100,152], label: "11/11/19" },
          { x: 60, y:[92,120], label: "11/10/19" },
          { x: 70, y:[90,100], label: "11/9/19" },
          { x: 80, y:[100,120], label: "11/8/19" },
        ]
      }]
    });
    chart.render();
  }

}
