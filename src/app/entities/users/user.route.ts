import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { IUser, User } from './user.interface';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { UserDatosComponent } from './user-datos.component';


@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser> {
  constructor(private service: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((user: HttpResponse<User>) => {
          if (user.body) {
            return of(user.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new User());
  }
}

export const userRoute: Routes = [
  {
    path: '',
    component: UserComponent
  },

  // {
  //   path: 'new',
  //   component: DocumentoUpdateComponent,
  //   resolve: {
  //     documento: DocumentoResolve
  //   },
  //   data: {
  //     // authorities: [Authority.USER],
  //     // pageTitle: 'ocmSoliServerApp.solicitud.home.title'
  //   },
  //    // canActivate: [UserRouteAccessService]
  //  },

  {
    // path: 'details/:id',
    path: '**',
    component: UserDatosComponent,
    resolve: {
      user: UserResolve
    },
  },

  {
    path: 'edit/:id',
    component: UserDatosComponent,
    resolve: {
      user: UserResolve
    },
    data: {
      // authorities: [Authority.USER],
    }
    // canActivate: [UserRouteAccessService]
  },

  {
    path: ':id',
    component: UserDatosComponent,
    resolve: {
      user: UserResolve
    },
    data: {
      // authorities: [Authority.USER],
    }
    // canActivate: [UserRouteAccessService]
  }


]
