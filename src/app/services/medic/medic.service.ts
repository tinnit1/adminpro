import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import Swal from 'sweetalert2';
import {Medic} from '../../models/medic.model';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  totalMedics = 0;

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) {
  }

  loadMedics(page: number = 0) {
    const url = URL_SERVICES + '/medic?page=' + page;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalMedics = resp.total;
        return resp.medics;
      }));
  }

  loadMedicById(id: string) {
    const url = URL_SERVICES + '/medic/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.medic));
  }

  searchMedic(term: string) {
    const url = URL_SERVICES + '/search/collection/medic/' + term;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medic)
      );
  }

  deleteMedic(id: string) {
    let url = URL_SERVICES + '/medic/' + id;
    url += '?token=' + this.userService.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire('Medico borrado', 'Médico borrado correctamente', 'success');
        return resp;
      }));
  }

  saveMedic(medic: Medic) {
    let url = URL_SERVICES + '/medic';
    if (medic._id) {
      // Actualizando
      url += '/' + medic._id;
      url += '?token=' + this.userService.token;
      return this.http.put(url, medic)
        .pipe(
          map( (resp: any) => {
            Swal.fire('Médico actualizado', medic.name, 'success');
            return  resp.medic;
          })
        );
    } else {
      // Creando
      url += '?token=' + this.userService.token;
      return this.http.post(url, medic)
        .pipe(
          map((resp: any) => {
            Swal.fire('Médico creado', medic.name, 'success');
            return resp.medic;
          })
        );
    }
  }
}
