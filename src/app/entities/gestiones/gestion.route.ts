import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { GestionComponent } from './gestion.component';
import { GestionDetailComponent } from './gestion-detail.component';
import { GestionUpdateComponent } from './gestion-update.component';

import { Gestion, IGestion } from './gestion.interface';

import { GestionService } from './gestion.service';

@Injectable({ providedIn: 'root' })
export class GestionResolve implements Resolve<IGestion> {
  constructor(private service: GestionService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IGestion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((documento: HttpResponse<Gestion>) => {
          if (documento.body) {
            return of(documento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Gestion());
  }
}

export const gestionRoute: Routes = [
  {
    path: '',
    component: GestionComponent
  },

  {
    path: 'new',
    component: GestionUpdateComponent,
    resolve: {
      gestion: GestionResolve
    },
    data: {
      // authorities: [Authority.USER],
      // pageTitle: 'ocmSoliServerApp.solicitud.home.title'
    },
    // canActivate: [UserRouteAccessService]
  },

  {
    path: 'details/:id',
    component: GestionDetailComponent,
    resolve: {
      gestion: GestionResolve
    },
  },

  {
    path: 'edit/:id',
    component: GestionUpdateComponent,
    resolve: {
      gestion: GestionResolve
    },
    data: {
      // authorities: [Authority.USER],
    }
    // canActivate: [UserRouteAccessService]
  },

  {
    path: ':id',
    component: GestionUpdateComponent,
    resolve: {
      gestion: GestionResolve
    },
    data: {
      // authorities: [Authority.USER],
    }
    // canActivate: [UserRouteAccessService]
  }


]
