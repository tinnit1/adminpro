import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public userService: UserService,
              public router: Router) {
  }

  canActivate() {
    if (this.userService.isLogin()) {
      console.log('Paso por el login Guard');
      return true;
    } else {
      console.log( 'bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
