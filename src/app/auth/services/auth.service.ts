import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, AuthResponse1 } from '../interfaces/interfaces';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  // private _usuario!: Usuario;
  private _usuario!: IUser;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  registro(login: string, email: string, password: string) {
    // TODO ! crear ruta
    // baseUrl se define en environment.ts
    const url = `${this.baseUrl}register`;
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

  login(username: string, password: string) {
    const url = `${this.baseUrl}authenticate`;
    const body = { username, password };

    // TODO ! No entiendo porque se usa typo AuthResponse cuando lo que responde este metodo el el token.
    return this.http.post<AuthResponse1>(url, body)
      .pipe(
        tap(resp  => {
          //  console.log((resp as any).id_token);
           console.log(resp.id_token);
          // No se puede obtener id.token directamente de resp
          // Por eso es necesaria la function authenticateSuccess()
          // const jwt = this.authenticateSuccess(resp);
          // const jwt = resp.id_token
          // if (jwt) {
          //   localStorage.setItem('token', jwt);
          // }
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

  // private authenticateSuccess(response: any): string {
    // console.log(typeof(response));
    // console.log(response);
    // return response.id_token;
      // }

}
