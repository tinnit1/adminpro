import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {UserService} from '../services/service.index';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) {
  }

  isSame(field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        isSame: true

      };
    };
  }

  ngOnInit(): void {
    init_plugins();
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      terms: new FormControl(false)
    }, {validators: this.isSame('password', 'confirmPassword')});
  }

  registerUser() {
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.terms) {
      Swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    const userNew = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.createUser(userNew)
      .subscribe( resp =>  this.router.navigate(['/login']));
  }

}
