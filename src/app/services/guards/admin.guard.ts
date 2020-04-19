import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public userService: UserService) {
  }

  canActivate() {
    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('bloqueado por guard');
      this.userService.logOut();
      return false;
    }
    return true;
  }

}
