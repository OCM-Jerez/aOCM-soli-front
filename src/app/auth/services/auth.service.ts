import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/interfaces';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: IUser;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  registro(login: string, email: string, password: string) {
    // baseUrl se define en environment.ts
    const url = `${this.baseUrl}register`;
    const body = {
                     "firstName": login,
                     "email": email,
                     "password": password,
                     "login":login,
                     "lastName":login,
                     "activated": true,
                     "langKey": "en"
                     };
    // console.log(body);
    // Si el nombre existe devuelve true, si no existe lo graba y devuelve false.
    return this.http.post<boolean>(url, body)
   }

  login(username: string, password: string) {
    const url = `${this.baseUrl}authenticate`;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp  => {
            localStorage.setItem('token', resp.id_token!);
         }),
        map(resp => true),
        catchError(err => of(err.error.message))
      );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}account`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

    return this.http.get<IUser>(url, { headers })
      .pipe(
        map((resp: IUser) => {
          // console.log(resp);
          //localStorage.setItem('token', resp.token!);
          this._usuario = {
            id: resp.id,
            login: resp.login,
            firstName: resp.firstName!,
            lastName: resp.lastName,
            email: resp.email,
            activated: resp.activated,
            langKey: resp.langKey,
            authorities: resp.authorities,
            createdBy: resp.createdBy,
            createdDate: resp.createdDate,
            lastModifiedBy: resp.lastModifiedBy,
            lastModifiedDate: resp.lastModifiedDate,
            password: resp.password
          }
          return true;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }

}
