import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartType} from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ],
})
export class GraficoDonaComponent implements OnInit {


  @Input('labels') doughnutChartLabels: string[] = [];
  @Input('data') doughnutChartData: number[] = [];
  @Input('graphicType') doughnutChartType: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
