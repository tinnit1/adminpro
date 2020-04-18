import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {UploadFileService} from '../../services/uploadFile/upload-file.service';
import {ModalUploadImageService} from './modal-upload-image.service';

@Component({
  selector: 'app-modal-upload-image',
  templateUrl: './modal-upload-image.component.html',
  styles: [],
})
export class ModalUploadImageComponent implements OnInit {

  uploadImage: File;
  imageTemp: string | ArrayBuffer;

  constructor(
    public uploadFileService: UploadFileService,
    public modalUploadImageService: ModalUploadImageService
  ) {
  }

  ngOnInit(): void {
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

  uploadImg() {
    this.uploadFileService.uploadFile(this.uploadImage, this.modalUploadImageService.type, this.modalUploadImageService.id)
      .then(resp => {
        this.modalUploadImageService.notification.emit(resp);
        this.closeModal();
      })
      .catch(err => {
        console.log('error en la carga!');
      });
  }

  closeModal() {
    this.imageTemp = null;
    this.uploadImage = null;
    this.modalUploadImageService.hideMod();
  }
}
