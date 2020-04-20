import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {
  constructor(public userService: UserService,
              public router: Router) {
  }

  canActivate(): Promise<boolean> | boolean {
    console.log('verify token');
    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = this.expired(payload.exp);
    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verifyRen(payload.exp);
  }

  // utilizar fecha de base de datos mayor seguridad
  verifyRen(dataExpired: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(dataExpired * 1000);
      const now = new Date();

      now.setTime(now.getTime() + (4 * 60 * 60 * 1000));
      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this.userService.extendToken()
          .subscribe((_) => {
            resolve(true);
          }, (_) => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }
      resolve(true);
    });
  }

  expired(dataExpired: number) {
    const now = new Date().getTime() / 1000;
    console.log(dataExpired)
    console.log(now)
    if (dataExpired < now) {
      console.log('true')
      return true;
    } else {
      console.log('false')
      return false;
    }
  }

}
