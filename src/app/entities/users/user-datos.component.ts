import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { IUser } from './user.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-datos',
  templateUrl: './user-datos.component.html',
  styleUrls: ['./user-datos.component.scss']
})
export class UserDatosComponent {
  miFormulario: FormGroup = this.fb.group({
    login:     ['', [ Validators.required ]],
    firstName: ['', [ Validators.required ]],
    lastName:  ['', [ Validators.required ]],
    email:     ['', [ Validators.required, Validators.email ]],
    password:  ['', [ Validators.required, Validators.minLength(5) ]],
  });

    // login:     ['Test25', [ Validators.required ]],
    // nombre:     ['Test', [ Validators.required ]],
    // apellido:     ['25', [ Validators.required ]],
    // email:    ['test25@test.com', [ Validators.required, Validators.email ]],
    // password: ['test25', [ Validators.required, Validators.minLength(5) ]],
  // });

  constructor( private fb: FormBuilder,
    private router: Router,
    private authService: AuthService ) { }
    registro() {
      const { login, firstName, lastName, email, password } = this.miFormulario.value;
      const activated = true;
      const langKey = 'es'
      const user: IUser = {login, firstName, lastName, email, password, activated, langKey  }

      this.authService.registro( user)
        .subscribe( ok => {
          if ( ok === true ) {
            Swal.fire('Error',"El nombre ya existe", 'error');
          } else {
            Swal.fire('', 'El usuario ha sido creado correctamente', 'success');
            this.router.navigateByUrl('/login');
          }
        });
    }
}
