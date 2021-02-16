import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth.service';
import { LoginService } from './login.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre:   ['admin', [ Validators.required, Validators.minLength(3)]],
    password: ['admin', [ Validators.required, Validators.minLength(4) ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService,
               private loginService: LoginService
               ) { }

  login() {
    const { nombre, password } = this.miFormulario.value;
    let loginModel = new Login( nombre, password, false);


    this.loginService.login(loginModel).subscribe(() => {
      console.log('login ok');
      this.router.navigateByUrl('solicitudes');
    });

    // this.authService.login( nombre, password )
    //   .subscribe( ok => {
    //     // console.log(ok);
    //     if ( ok === true ) {
    //       // TODO ! Si el rol =  admin poner IsAdmin a true.
    //       environment.IsAdmin = true;
    //       this.router.navigateByUrl('solicitudes');
    //     } else {
    //       if(ok === 'Invalid login name or password.')
    //       {
    //         ok = 'Nombre o password erroneo.'
    //       }
    //       Swal.fire('Error', ok, 'error');
    //     }
    //   });
  }

}
