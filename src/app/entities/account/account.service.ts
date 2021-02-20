import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
//import { StateStorageService } from 'app/core/auth/state-storage.service';//

import { environment } from 'src/environments/environment';

import { IUser } from '../users/user.interface';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: IUser | null = null;
  private authenticationState = new ReplaySubject<IUser | null>(1);
  private accountCache$?: Observable<IUser | null>;

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    //private stateStorageService: StateStorageService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  // save(account: Account): Observable<{}> {
  //   // return this.http.post(SERVER_API + 'api/account', account);
  // }

  authenticate(identity: IUser | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<IUser | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap((user: IUser | null) => {
          // console.log(user);
          this.authenticate(user);

          if (user) {
            this.navigateToStoredUrl();
          }
          this.localStorageService.store('idUser', user?.id);
          this.localStorageService.store('roles', user?.authorities);
          // const roles = this.localStorageService.retrieve('roles');
          // <p ngif roles........
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<IUser | null> {
    return this.authenticationState.asObservable();
  }

  // getImageUrl(): string {
  //   return this.userIdentity ? this.userIdentity.imageUrl : '';
  // }

  private fetch(): Observable<IUser>{
    return this.http.get<IUser>(environment.baseUrl + 'account');
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    // const previousUrl = this.stateStorageService.getUrl();
    // if (previousUrl) {
    //   this.stateStorageService.clearUrl();
    //   this.router.navigateByUrl(previousUrl);
    // }
  }
}
