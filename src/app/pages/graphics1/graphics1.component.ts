import { Component, OnInit } from '@angular/core';
import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: [
  ],
})
export class Graphics1Component implements OnInit {

  graphics: any = {
    graphics1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data:  [24, 30, 46],
      type: 'doughnut',
      legend: 'El pan se come con'
    },
    graphics2: {
      labels: ['Hombres', 'Mujeres'],
      data:  [4500, 6000],
      type: 'doughnut',
      legend: 'Entrevistados'
    },
    graphics3: {
      labels: ['Si', 'No'],
      data:  [95, 5],
      type: 'doughnut',
      legend: '¿Le dan gases los frijoles?'
    },
    graphics4: {
      labels: ['No', 'Si'],
      data:  [85, 15],
      type: 'doughnut',
      legend: '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit(): void {

  }

}
