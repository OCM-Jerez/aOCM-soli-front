import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { DocumentoComponent } from './documento.component';
import { DocumentoUpdateComponent } from './documento-update.component';
import { DocumentoDetailComponent } from './documento-detail.component';

import { DocumentoService } from './documento.service';

import { IDocumento, Documento } from './documento.interface';

@Injectable({ providedIn: 'root' })
export class DocumentoResolve implements Resolve<IDocumento> {
  constructor(private service: DocumentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumento> | Observable<never> {
    const id = route.params['id'];
    if (id)   {
      return this.service.find(id).pipe(
        flatMap((documento: HttpResponse<Documento>) => {
          if (documento.body) {
            return of(documento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Documento());
  }
}

export const documentoRoute: Routes = [
  {
    path: '',
    component: DocumentoComponent
  },

  {
    path: 'new',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve
    },
    data: {
      // authorities: [Authority.USER],
      // pageTitle: 'ocmSoliServerApp.solicitud.home.title'
    },
     // canActivate: [UserRouteAccessService]
   },

   {
    path: 'details/:id',
    component: DocumentoDetailComponent,
       resolve: {
      documento: DocumentoResolve
    },
  },

  {
    path: 'edit/:id',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve
    },
    data: {
      // authorities: [Authority.USER],
    }
     // canActivate: [UserRouteAccessService]
  },

  {
    path: ':id',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve
    },
    data: {
      // authorities: [Authority.USER],
    }
     // canActivate: [UserRouteAccessService]
  }


 ]
