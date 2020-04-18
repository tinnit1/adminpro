import {Injectable} from '@angular/core';
import {Hospital} from '../../models/hospital.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;
  totalHospitals = 0;

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) {
  }

  loadHospitals(page: number = 0) {
    const url = URL_SERVICES + '/hospital?page=' + page;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalHospitals = resp.total;
        return resp.hospitals;
      }));
  }

  getHospitalById(id: string) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospital));
  }

  deleteHospitalById(id: string) {
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this.userService.token;
    return this.http.delete(url)
      .pipe(map(resp => Swal.fire('Hospital Borrado', 'Eliminado correctamente', 'success')));
  }

  createHospital(name: string) {
    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this.userService.token;
    return this.http.post(url, {name})
      .pipe(map((resp: any) => {
        Swal.fire('Hospital Creado', resp.hospital.name, 'success')
        return resp.hospital;
      }));
  }

  searchHospital(term: string) {
    const url = URL_SERVICES + '/search/collection/hospital/' + term;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.hospital)
      );
  }

  updateHospital(hospital: Hospital) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this.userService.token;

    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
        Swal.fire('Hospital actualizado', hospital.name, 'success')
        return resp.hospital;
      }));
  }

}
