import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Hospital} from '../../models/hospital.model';
import {MedicService} from '../../services/medic/medic.service';
import {HospitalService} from '../../services/hospital/hospital.service';
import {Medic} from '../../models/medic.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalUploadImageService} from '../../components/modal-upload-image/modal-upload-image.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [],
})
export class MedicComponent implements OnInit {

  hospitals: Hospital[] = [];
  medic: Medic = new Medic('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public medicService: MedicService,
              public hospitalService: HospitalService,
              public router: Router,
              public activatedRouter: ActivatedRoute,
              public modalUploadImageService: ModalUploadImageService) {
    activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id !== 'new') {
        this.loadMedic(id);
      }
    });
  }

  ngOnInit(): void {
    this.hospitalService.loadHospitals()
      .subscribe((hospitals: Hospital[]) => this.hospitals = hospitals);
    this.modalUploadImageService.notification.subscribe(resp => {
      this.medic.image = resp.medic.image;
    });
  }

  loadMedic(id: string) {
    this.medicService.loadMedicById(id)
      .subscribe(medic => {
        this.medic = medic;
        this.medic.hospital = medic.hospital._id;
        this.changeHospital(this.medic.hospital);
      });
  }

  saveMedic(form: NgForm) {
    console.log(form.valid);
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    this.medicService.saveMedic(this.medic)
      .subscribe(medic => {
        this.medic._id = medic._id;
        this.router.navigate(['/medic', medic._id]);
      });
  }

  changeHospital(id: string) {
    this.hospitalService.getHospitalById(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  changePicture() {
    this.modalUploadImageService.showModal('medic', this.medic._id);
  }
}
