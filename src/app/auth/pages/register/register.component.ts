import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    login:     ['Test 4', [ Validators.required ]],
    email:    ['test4@test.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(5) ]],
  });

  constructor( private fb: FormBuilder,
    private router: Router,
    private authService: AuthService ) { }

  registro() {
    // console.log(this.miFormulario.value);
    // this.router.navigateByUrl('/dashboard');
    const { login, email, password } = this.miFormulario.value;
    this.authService.registro( login, email, password )
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
