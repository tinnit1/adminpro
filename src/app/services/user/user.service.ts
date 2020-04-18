import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {UploadFileService} from '../uploadFile/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public uploadFileService: UploadFileService
  ) {
    this.loadStorage();
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  isLogin() {
    return (this.token.length > 5) ? true : false;
  }

  saveLocalStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + '/login/google';

    return this.http.post(url, {token}).pipe(map((resp: any) => {
      this.saveLocalStorage(resp.id, resp.token, resp.user);
      return true;
    }));
  }

  logOut() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  login(user: User, rememberMe: boolean = false) {
    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem(' email');
    }
    const url = URL_SERVICES + '/login';
    return this.http.post(url, user)
      .pipe(
        map((resp: any) => {
          this.saveLocalStorage(resp.id, resp.token, resp.user);
          // localStorage.setItem('id', resp.id);
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('user', JSON.stringify(resp.user));

          return true;
        })
      );
  }

  createUser(user: User) {
    const url = URL_SERVICES + '/user';

    return this.http.post(url, user).pipe(map((resp: any) => {
        Swal.fire('Usuario creado', user.email, 'success');
        return resp.user;
      }
    ));

  }

  updateUser(user: any) {
    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;
    return this.http.put(url, user).pipe(map((resp: any) => {
      if (user._id === this.user._id) {
        this.saveLocalStorage(resp.user._id, this.token, resp.user);
      }
      Swal.fire('Update user', user.name, 'success');
      return true;
    }));
  }

  changeImage(file: File, id: string) {
    this.uploadFileService.uploadFile(file, 'user', id)
      .then((resp: any) => {
        this.user.image = resp.user.image;
        Swal.fire(' Imagen actualizada', this.user.name, 'success');

        this.saveLocalStorage(id, this.token, this.user);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  loadUsers(page: number = 0) {
    const url = URL_SERVICES + '/user?page=' + page;
    return this.http.get(url);
  }

  searchUsers(term: string) {
    const url = URL_SERVICES + '/search/collection/user/' + term;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.user)
      );
  }

  deleteUser(id: string) {
    let url = URL_SERVICES + '/user/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(
        map(() => {
          Swal.fire(
            'Eliminado!',
            'El usuario fue eliminado.',
            'success'
          );
          return true;
        })
      );
  }
}
