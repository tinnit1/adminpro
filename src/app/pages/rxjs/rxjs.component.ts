import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {filter, map, retry} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ],
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscribed: Subscription;

  constructor() {
    this.subscribed = this.returnObservable()
      .subscribe(
        numero => console.log('sub', numero),
        error => console.log('Error en el obs', error),
        () => console.log('observable end')
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('the window are will close');
    this.subscribed.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return  new Observable( (observer: Subscriber<any>) => {
      let cont = 0;
      const interval = setInterval( () => {
        cont += 1;
        const exit = {
          valor: cont
        };
        observer.next(exit);

        // if (cont === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (cont === 2) {
        //   // clearInterval(interval);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map(resp =>  resp.valor),
      filter((value, index) => {
        if ((value % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
