import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  registro(login: string, email: string, password: string) {
    // TODO ! crear ruta
    // baseUrl se define en environment.ts
    const url = `${this.baseUrl}/register`;
    const body = { email, password, login };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
            localStorage.setItem('token', token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  login(email: string, password: string) {
    // const url  = `${ this.baseUrl }/auth`;
    // TODO ! crear ruta
    const url = `${this.baseUrl}/authenticate`;
    const body = { username: email, password: password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp  => {
          const jwt = this.authenticateSuccess(resp);
          if (jwt) {
            localStorage.setItem('token', jwt);
          }
        }),
        map(resp => true),
        catchError(err => of(err.error.message))
      );
  }

  validarToken(): Observable<boolean> {
    // TODO ! crear ruta renew
    const url = `${this.baseUrl}/account`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map((resp: IUser) => {
          // console.log(resp);
          //localStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.firstName!,
            id: resp.id!,
            email: resp.email!
          }
          return true;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }

  private authenticateSuccess(response: any): string {
    return response.id_token;
  }

}
