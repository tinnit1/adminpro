import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadImage: File;
  imageTemp: string | ArrayBuffer;

  constructor(public userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
  }

  save(user: User) {
    this.user.name = user.name;
    this.user.email = user.email;
    this.userService.updateUser(this.user)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  selectImage(file: File) {
    if (!file) {
      this.uploadImage = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.imageTemp = reader.result;
  }


  changeImage() {
    this.userService.changeImage(this.uploadImage, this.user._id);
  }

}
