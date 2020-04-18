import {Component, OnInit} from '@angular/core';
import {Medic} from '../../models/medic.model';
import {MedicService} from '../../services/medic/medic.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [],
})
export class MedicsComponent implements OnInit {

  medics: Medic[] = [];
  page = 0;
  loading: boolean;
  itemsLoad = 5;

  constructor(public medicService: MedicService) {
  }

  ngOnInit(): void {
    this.loadMedics();
  }

  loadMedics() {
    this.loading = true;
    this.medicService.loadMedics(this.page)
      .subscribe((medics: Medic[]) => {
        this.medics = medics;
        this.loading = false;
      });
  }

  ChangePage(value: number) {
    const page = this.page + value;
    if (page >= this.medicService.totalMedics) {
      return;
    }
    if (page < 0) {
      return;
    }
    this.page += value;
    this.loadMedics();
  }

  searchMedic(term: string) {
    if (term.length <= 0) {
      this.loadMedics();
      return;
    }
    this.medicService.searchMedic(term)
      .subscribe(medics => this.medics = medics);
  }

  createMedic() {

  }

  updateMedic(medic: Medic) {

  }

  deleteMedic(id: string) {
    this.medicService.deleteMedic(id)
      .subscribe((_) => this.loadMedics());
  }
}
