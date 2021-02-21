import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const url = `${environment.baseUrl}registerEmail`;
    const body = { "email": email };
    // console.log(body);
    // Si el nombre existe devuelve true, si no existe lo graba y devuelve false.
    return this.http.post<any>(url, body)
      .pipe(
        map(resp => {
          return (resp)
            ? { emailTomado: true }
            : null
        })
      );
  }
}
