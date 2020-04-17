import {Pipe, PipeTransform} from '@angular/core';
import {URL_SERVICES} from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image: string, type: string = 'user'): any {
    let url = URL_SERVICES + '/image';
    if (!image) {
      return url + '/user/xxx';
    }
    if (image.indexOf('https') >= 0) {
      return image;
    }
    switch (type) {
      case 'user':
        url += '/user/' + image;
        break;
      case 'medic':
        url += '/medic/' + image;
        break;
      case 'hospital':
        url += '/hospital/' + image;
        break;
      default:
        console.log('type user not exist');
        url += '/user/xxx';
    }

    return url;
  }

}
