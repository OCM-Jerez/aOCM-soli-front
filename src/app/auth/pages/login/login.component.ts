import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { ILogin } from './login.interface';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    // TODO validators
    // https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24149906#notes
    username: ['admin', [Validators.required, Validators.minLength(3)]],
    password: ['admin', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  login() {
    const { username, password } = this.miFormulario.value;
    const rememberMe = true;
    const login: ILogin = { username, password, rememberMe }
    // Existen tres login()
    // 1.- login.service.ts
    // 2.- auth.service.ts
    // 3.- autj.jwt.service.ts

    this.loginService.login(login).subscribe(
      // next (respuesta) es un IUser.
      next => {
        environment.userLoged = next.login;
        environment.IsAdmin = (next.authorities.includes('ROLE_ADMIN')) ? true : false;
        this.router.navigateByUrl('solicitudes');
      }, error => {
        console.log(error.message);
        console.log(error);
        Swal.fire('Error', error.message, 'error');
      }, () => {
        // En teoria el observable se completa, pero no estoy seguro.
        console.log('complete');
      });


  }

}
