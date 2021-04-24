import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { UserComponent } from './entities/users/user.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./entities/solicitudes/solicitud.module').then(m => m.SolicitudModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },

  {
    path: 'documentos',
    loadChildren: () => import('./entities/documentos/documento.module').then(m => m.DocumentoModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },

  {
    path: 'gestiones',
    loadChildren: () => import('./entities/gestiones/gestion.module').then(m => m.GestionModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

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
