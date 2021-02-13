import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';

// import { JhiResolvePagingParams } from 'ng-jhipster';

// import { User, IUser } from 'app/core/user/user.model';
// import { UserService } from 'app/core/user/user.service';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
// export class UserManagementResolve implements Resolve<IUser> {
  export class UserManagementResolve {

  constructor(private service: UserService) {}

  // resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
  //   const id = route.params['login'];
  //   if (id) {
  //     return this.service.find(id);
  //   }
    // return of(new IUser());
  // }
}

export const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: {
    },
    data: {
      defaultSort: 'id,asc'
    }
  },

];
