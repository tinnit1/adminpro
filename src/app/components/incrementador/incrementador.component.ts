import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('name') legend: string;
  @Input() percentage: number;

  @Output('changeV') changeVal: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.legend = 'legend';
    this.percentage = 50;
  }

  ngOnInit(): void {
  }

  onChanges(newValue: number) {

    // const elemHTML: any = document.getElementsByName('percentage')[0];

    if (newValue >= 100){
      this.percentage = 100;
    } else if (newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }

    // elemHTML.value = this.percentage;
    this.txtProgress.nativeElement.value = this.percentage;

    this.changeVal.emit(this.percentage);

  }

  changeValue(value: number) {
    if (this.percentage >= 100 && value > 0) {
      this.percentage = 100;
      return;
    }
    if (this.percentage <= 0 && value < 0) {
      this.percentage = 0;
      return;
    }
    this.percentage = this.percentage + value;

    this.changeVal.emit(this.percentage);

    this.txtProgress.nativeElement.focus();

  }

}
