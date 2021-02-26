import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }
  public loginPattern: string = '([a-z0-9A-Z]+)';

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const login = control.value;
    const url = `${environment.baseUrl}registerLogin`;
    const body = { "login": login };
    // console.log(body);
    // Si el login existe devuelve true, si no existe devuelve false.
    return this.http.post<any>(url, body)
      .pipe(
        map(resp => {
          return (resp)
            ? { loginExiste: true }
            : null
        })
      );
  }
}
