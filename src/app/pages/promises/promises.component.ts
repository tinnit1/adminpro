import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ],
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.count3seconds().then(
      message => console.log('End', message)
      )
      .catch( error => console.error('Error', error));
  }

  ngOnInit(): void {
  }

  count3seconds(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        console.log(count);
        if (count === 3) {
          resolve(true);
          // reject('sample error!');
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
