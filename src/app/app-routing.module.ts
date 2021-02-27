import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarTokenGuard }    from './guards/validar-token.guard';
import { UserComponent }        from './entities/users/user.component';
import { SolicitudComponent }   from './entities/solicitudes/solicitud.component';
import { DocumentoComponent }   from './entities/documentos/documento.component';
import { GestionComponent }     from './entities/gestiones/gestion.component';
import { SolicitudDetailComponent } from './entities/solicitudes/solicitud-detail.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./entities/solicitudes/solicitud.module').then( m => m.SolicitudModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ],
  },
  // {
  //   path: 'solicitudes',
  //   // loadChildren: () => import('./entities/solicitudes/solicitud.module').then( m => m.SolicitudModule ),
  //   canActivate: [ ValidarTokenGuard ],
  //   canLoad: [ ValidarTokenGuard ],
  //   component: SolicitudComponent,
  // },
  // {
  //   path: 'solicitudes/details',
  //   // loadChildren: () => import('./entities/solicitudes/solicitud.module').then( m => m.SolicitudModule ),
  //   canActivate: [ ValidarTokenGuard ],
  //   canLoad: [ ValidarTokenGuard ],
  //   component: SolicitudDetailComponent,
  // },
  // {
  //   path: 'documentos',
  //   component: DocumentoComponent,
  // },
  // {
  //   path: 'gestiones',
  //   component: GestionComponent,
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
  //   canActivate: [ ValidarTokenGuard ],
  //   canLoad: [ ValidarTokenGuard ]
  // },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
