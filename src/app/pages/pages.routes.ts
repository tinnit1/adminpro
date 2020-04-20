import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graphics1Component} from './graphics1/graphics1.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromisesComponent} from './promises/promises.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {AdminGuard, LoginGuardGuard, VerifyTokenGuard} from '../services/service.index';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import {HospitalsComponent} from './hospitals/hospitals.component';
import {MedicComponent} from './medics/medic.component';
import {MedicsComponent} from './medics/medics.component';
import {SearchComponent} from './search/search.component';

const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerifyTokenGuard],
    data: {title: 'Dashboard'}
  },
  {path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
  {path: 'graphics1', component: Graphics1Component, data: {title: 'Graphics'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Theme settings'}},
  {path: 'promises', component: PromisesComponent, data: {title: 'Promises'}},
  {path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs'}},
  {path: 'profile', component: ProfileComponent, data: {title: 'Profile user'}},
  {path: 'search/:term', component: SearchComponent, data: {title: 'Search'}},
  // Mantenimientos
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
    data: {title: 'Users dashboard'}
  },
  {path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals dashboard'}},
  {path: 'medics', component: MedicsComponent, data: {title: 'Medics dashboard'}},
  {path: 'medic/:id', component: MedicComponent, data: {title: 'Update medic'}},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
