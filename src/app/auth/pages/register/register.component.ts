import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    login:    ['', [ Validators.required ]],
    nombre:   ['', [ Validators.required ]],
    apellido: ['', [ Validators.required ]],
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(5) ]],
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
    // console.log(this.miFormulario.value);
    // this.router.navigateByUrl('/dashboard');
    const { login, nombre, apellido, email, password } = this.miFormulario.value;
    // console.log( this.miFormulario.value);
    // console.log(login, nombre, apellido, email, password);
    this.authService.registro( login, nombre, apellido, email, password )
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
