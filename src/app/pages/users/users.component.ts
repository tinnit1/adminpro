import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/service.index';
import Swal from 'sweetalert2';
import {ModalUploadImageService} from '../../components/modal-upload-image/modal-upload-image.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  page = 0;
  totalRegister = 0;
  loading: boolean;
  itemsLoad = 5;

  constructor(public userServices: UserService,
              public modalUploadImageService: ModalUploadImageService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.modalUploadImageService.notification.subscribe(_ => this.loadUsers());
  }


  loadUsers() {
    this.loading = true;
    this.userServices.loadUsers(this.page)
      .subscribe((resp: any) => {
        this.totalRegister = resp.total;
        this.users = resp.users;
        this.loading = false;
      });
  }

  ChangePage(value: number) {
    const page = this.page + value;
    console.log(page);
    if (page >= this.totalRegister) {
      return;
    }
    if (page < 0) {
      return;
    }
    this.page += value;
    this.loadUsers();
  }

  searchUser(term: string) {
    if (term.length <= 0) {
      this.loadUsers();
      return;
    }
    this.loading = true;
    this.userServices.searchUsers(term)
      .subscribe((users: User[]) => {
        this.users = users;
        this.loading = false;
      });
  }

  deleteUser(user: User) {
    if (user._id === this.userServices.user._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + user.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this.userServices.deleteUser(user._id)
          .subscribe(resp => {
            this.loadUsers();
          });
      }
    });
  }

  saveUser(user: User) {
    this.userServices.updateUser(user)
      .subscribe();
  }

  showModal(id: string) {
    this.modalUploadImageService.showModal('user', id);
  }
}
