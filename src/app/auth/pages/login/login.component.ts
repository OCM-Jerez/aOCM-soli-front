import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { ILogin } from './login.interface';

import { LoginService } from './login.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    // Todo ¿Donde controlar si son validos?
    // https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24149906#notes
    username: ['admin', [Validators.required, Validators.minLength(3)]],
    password: ['admin', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
  ) { }

  login() {
    const { username, password } = this.miFormulario.value;
    const rememberMe = true;
    const login: ILogin = { username, password, rememberMe }
    // TODO ¿Porque usar subscribe en lugar de una funcion normal?
    // ! Al hacer subscribe() ¿el observable emite un valor automaticamente?
    // Existen tres login()
    // 1.- login.service.ts
    // 2.- auth.service.ts
    // 3.- autj.jwt.service.ts

    this.loginService.login(login).subscribe(
      // next es un IUser.
      next => {
        // console.log('next: ', next);
        // console.log('login: ', next.login);
        // console.log('password: ', next.password);
        // console.log('next: ', next.authorities);

        // TODO ¿Como actualizo los datos en navBar?
        environment.userLoged = next.login;
        // if (next.authorities.includes('ROLE_ADMIN')) {
        //   environment.IsAdmin = true;
        // } else {
        //   environment.IsAdmin = false;
        // }

        //  (next.authorities.includes('ROLE_ADMIN')) ? environment.IsAdmin = true : environment.IsAdmin = false;
         environment.IsAdmin = (next.authorities.includes('ROLE_ADMIN')) ? true : false;


        this.authService.login(next.login, next.password)
          .subscribe(ok => {
            // TODO ¿como hago esta comprobación?
            if (ok === true) {
              // console.log(ok);
              this.router.navigateByUrl('solicitudes');
            } else {
              // console.log(ok);

              // if(ok === 'Invalid login name or password.')
              // {
              //   ok = 'Nombre o password erroneo.'
              // }
              Swal.fire('Error', ok, 'error');
            }
          },
            error => {
              console.log(error);
            }

          );


        // this.router.navigateByUrl('solicitudes');
      });


  }

}
