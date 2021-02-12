import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre:   ['admin', [ Validators.required, Validators.minLength(3)]],
    password: ['admin', [ Validators.required, Validators.minLength(5) ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) { }

  login() {
    const { nombre, password } = this.miFormulario.value;
    this.authService.login( nombre, password )
      .subscribe( ok => {
        // console.log(ok);
        if ( ok === true ) {
          // console.log('Login ok.');
          this.router.navigateByUrl('/dashboard');
        } else {
          if(ok === 'Invalid login name or password.')
          {
            ok = 'Nombre o password erroneo.'
          }
          Swal.fire('Error', ok, 'error');
        }
      });
  }

}
