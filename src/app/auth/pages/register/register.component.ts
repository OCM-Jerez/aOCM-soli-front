import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { IUser } from 'src/app/entities/users/user.interface';

import { AuthService } from '../../auth.service';
import { EmailValidatorService } from '../../../validator/email-validator.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  // TODO validators
  // https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24149906#notes
  miFormulario: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email], [this.emailValidator]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private emailValidator: EmailValidatorService
  ) { }

  registro() {
    const { login, firstName, lastName, email, password } = this.miFormulario.value;
    const activated = true;
    const langKey = 'es'
    const user: IUser = { login, firstName, lastName, email, password, activated, langKey }

    this.authService.registro(user)
      .subscribe(ok => {
        if (ok === true) {
          Swal.fire('Error', "El login ya existe", 'error');
        } else {
          Swal.fire('', 'El usuario ha sido creado correctamente', 'success');
          this.router.navigateByUrl('/login');
        }
      });
  }

}
