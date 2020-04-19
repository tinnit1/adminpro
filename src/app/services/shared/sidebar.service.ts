import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];

  constructor(
    public userService: UserService
  ) {
  }

  loadMenu() {
    this.menu = this.userService.menu;
  }
}
