import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  HospitalService,
  MedicService, AdminGuard
} from './service.index';
import {ModalUploadImageService} from '../components/modal-upload-image/modal-upload-image.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    AdminGuard,
    UploadFileService,
    ModalUploadImageService,
    HospitalService,
    MedicService
  ],
  declarations: []
})
export class ServiceModule {
}
