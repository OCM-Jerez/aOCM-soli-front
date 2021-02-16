import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Login } from './login.model';
import { Account } from 'src/app/entities/account/account.model';
import { AuthServerProvider } from 'src/app/auth/auth-jwt.service';
import { AccountService } from 'src/app/entities/account/account.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

   login(credentials: Login): Observable<Account | null | any> {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
   }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
