import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogin } from './login.interface';
import { IUser } from 'src/app/entities/users/user.interface';

import { AuthServerProvider } from 'src/app/auth/auth-jwt.service';
import { AccountService } from 'src/app/entities/account/account.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private authServerProvider: AuthServerProvider,
    private accountService: AccountService
  ) { }

  login(login: ILogin): Observable<IUser | null | any> {
    // Crea el token y lo guarda de en los stores.
    console.log(login);
    return this.authServerProvider.login(login)
      .pipe
      (mergeMap(() => {                            // mergeMap = flatMap
        return this.accountService.identity(true); // retorna un IUser.
      }));
  }

  logout(): void {
    // TODO revisar porque tacha subscribe
    this.authServerProvider.logout()
      .subscribe(null, null, () => this.accountService.authenticate(null));
  }

}
