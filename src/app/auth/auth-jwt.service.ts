import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { environment } from 'src/environments/environment';
import { ILogin } from './pages/login/login.interface';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService
  ) { }

  login(login: ILogin): Observable<void> {
    return this.http
      .post<JwtToken>(environment.baseUrl + 'authenticate', login)
      .pipe(map(response => {
        // console.log(response);
        return this.authenticateSuccess(response, true);
      }));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') ||
      this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

}
