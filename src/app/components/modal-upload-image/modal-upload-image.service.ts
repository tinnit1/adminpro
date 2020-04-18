import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadImageService {

  public type: string;
  public id: string;

  public hide = 'hideModal';

  public notification = new EventEmitter<any>();

  constructor() {
    console.log('modal upload ready');
  }

  hideMod() {
    this.hide = 'hideModal';
    this.id = null;
    this.type = null;
  }

  showModal(type: string, id: string) {
    this.hide = '';
    this.id = id;
    this.type = type;
  }
}
