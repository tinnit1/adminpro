import {Component, OnInit} from '@angular/core';
import {HospitalService} from '../../services/hospital/hospital.service';
import {Hospital} from '../../models/hospital.model';
import Swal from 'sweetalert2';
import {ModalUploadImageService} from '../../components/modal-upload-image/modal-upload-image.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit {
  token: string;
  hospitals: Hospital[] = [];
  page = 0;
  loading: boolean;
  itemsLoad = 5;

  constructor(public hospitalService: HospitalService,
              public modalUploadImageService: ModalUploadImageService) {
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.modalUploadImageService.notification
      .subscribe((_) => this.loadHospitals());
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals(this.page)
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
        this.loading = false;
      });
  }

  getHospitalById(id: string) {
    this.loading = true;
    this.hospitalService.getHospitalById(id)
      .subscribe();
  }

  searchHospital(term: string) {
    if (term.length <= 0) {
      this.loadHospitals();
      return;
    }
    this.hospitalService.searchHospital(term)
      .subscribe(hospitals => this.hospitals = hospitals);
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital)
      .subscribe();
  }

  deleteHospital(id: string) {
    this.hospitalService.deleteHospitalById(id)
      .subscribe((_) => this.loadHospitals());
  }

  createHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
    }).then((result) => {
      if (result.value) {
        this.hospitalService.createHospital(result.value)
          .subscribe((_) => {
            this.loadHospitals();
          });
      }
    });
  }

  updateImage(id: string) {
    this.modalUploadImageService.showModal('hospital', id);
  }

  ChangePage(value: number) {
    const page = this.page + value;
    if (page >= this.hospitalService.totalHospitals) {
      return;
    }
    if (page < 0) {
      return;
    }
    this.page += value;
    this.loadHospitals();
  }
}
