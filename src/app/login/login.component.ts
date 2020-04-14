import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/service.index';
import {User} from '../models/user.model';

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ],
})
export class LoginComponent implements OnInit {

  rememberMe = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '932058177154-pf4e7ve9r2t512k30tc2js7dib77vb7j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token)
        .subscribe((resp) => {
          if (resp) {
            return window.location.href = '#/dashboard';
          }
        });
    });
  }

  toAccess(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);
    this.userService.login(user, form.value.rememberMe)
      .subscribe(resp => {
        if (resp) {
          return this.router.navigate(['/dashboard']);
        }
      });
    // this.router.navigate(['/dashboard']);
  }

}
