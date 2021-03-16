import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { LoginService } from './login.service';

import { environment } from 'src/environments/environment';

import { ILogin } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  miError: string = '';
  miFormulario: FormGroup = this.fb.group({
    username: ['admin', [Validators.required, Validators.minLength(3)]],
    password: ['admin', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private $localStorage: LocalStorageService,

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
        // environment.userLoged = next.login;
        environment.IsAdmin = (next.authorities.includes('ROLE_ADMIN')) ? true : false;
        this.$localStorage.store('userLog',username);
        this.router.navigateByUrl('solicitudes');
      }, error => {
        if (error.error.message = 'Invalid login name or password.') {
          this.miError = 'Nombre de usuario o password erroneo.';
        }
        Swal.fire('Error', this.miError, 'error');
      }, () => {
        // En teoria el observable se completa, pero no estoy seguro.
        // console.log('complete');
      });


  }

}
