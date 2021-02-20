import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { ILogin } from './login.interface';

import { AuthService } from '../../auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
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
    // Existen dos login()
    // 1.- auth.service.ts
    // 2.- autj.jwt.service.ts

    this.loginService.login(login).subscribe(
      // La resp es un IUser.
      resp => {
        // console.log('next: ', resp);
        // console.log('login: ', resp.login);
        // console.log('password: ', resp.password);

        this.authService.login(resp.login, resp.password)
        .subscribe(ok => {
          environment.userLoged = resp.login
          // console.log('next: ', resp.authorities);
          if (resp.authorities.includes('ROLE_ADMIN')) {
              environment.IsAdmin = true;
            } else {
              environment.IsAdmin = false;
            }

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
