import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ],
})
export class ProgressComponent implements OnInit {

  percentage1: number;
  percentage2: number;

  constructor() {
    this.percentage1 = 30;
    this.percentage2 = 50;
   }

  ngOnInit(): void {
  }

  // updateProgress(event: number) {
  //   console.log('Evento', event);
  //   this.percentage1 = event;
  // }

}
