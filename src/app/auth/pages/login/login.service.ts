import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogin } from './login.interface';

import { AuthServerProvider } from 'src/app/auth/auth-jwt.service';
import { AccountService } from 'src/app/entities/account/account.service';
import { IUser } from 'src/app/entities/users/user.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private accountService: AccountService,
    private authServerProvider: AuthServerProvider
  ) { }

  login(login: ILogin): Observable<IUser | null | any> {
    return this.authServerProvider.login(login)
      .pipe
      // mergeMap = flatMap
      (mergeMap(() => {
        // console.log(Account);
        return this.accountService.identity(true);
      }));
    }

  logout(): void {
    this.authServerProvider.logout()
      .subscribe(null, null, () => this.accountService.authenticate(null));
  }

}
