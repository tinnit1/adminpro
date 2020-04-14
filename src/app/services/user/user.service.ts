import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
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
}
