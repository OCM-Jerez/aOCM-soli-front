import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { IUser } from 'src/app/entities/users/user.interface';

import { AuthService } from '../../auth.service';
import { EmailValidatorService } from '../../../validator/email-validator.service';
import { LoginValidatorService } from '../../../validator/login-validator.service';
import { Login } from '../login/login.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  miError: string = '';
  // validators
  // https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24149906#notes
  miFormulario: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.pattern(this.loginValidator.loginPattern)], [this.loginValidator]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailValidator.emailPattern)], [this.emailValidator]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  get loginErrorMsg(): string {
    const errors = this.miFormulario.get('login')?.errors;
    if (errors?.required) {
      return 'login es obligatorio';
    } else if (errors?.pattern) {
      return 'El valor introducido no tiene formato adecuado';
    } else if (errors?.loginExiste) {
      return 'El login ya existe, por favor introduce otro';
    }
    return '';
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'Email es obligatorio';
    } else if (errors?.pattern) {
      return 'El valor introducido no tiene formato de correo';
    } else if (errors?.emailExiste) {
      return 'El email ya existe, por favor introduce otro';
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private emailValidator: EmailValidatorService,
    private loginValidator: LoginValidatorService
  ) { }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }

  registro() {
    const { login, firstName, lastName, email, password } = this.miFormulario.value;
    const activated = true;
    const langKey = 'es'
    const user: IUser = { login, firstName, lastName, email, password, activated, langKey }

    this.authService.registro(user)
      .subscribe(ok => {
        if (ok) {
          Swal.fire('', 'El usuario ha sido creado correctamente', 'success');
          this.router.navigateByUrl('/login');
        } else {

        }
      }, error => {
        // TODO Cambiar mensage posibles errores.
        if (error.error.message = 'Invalid login name or password.') {
          this.miError = 'Nombre de usuario o password erroneo.';
        }
        Swal.fire('Error', error.error.message, 'error');
      }, () => {
        // En teoria el observable se completa, pero no estoy seguro.
        // console.log('complete');
      });
  }

}
