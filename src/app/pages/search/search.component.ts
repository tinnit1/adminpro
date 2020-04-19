import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {User} from '../../models/user.model';
import {Medic} from '../../models/medic.model';
import {Hospital} from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  medics: Medic[] = [];
  hospitals: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    this.activatedRoute.params
      .subscribe(params => {
        const term = params.term;
        this.search(term);
      });
  }

  ngOnInit(): void {
  }

  search(term: string) {
    const url = URL_SERVICES + '/search/all/' + term;
    this.http.get(url)
      .subscribe((resp: any) => {
       this.hospitals = resp.hospitals;
       this.medics = resp.medics;
       this.users = resp.users;
      });
  }

}
