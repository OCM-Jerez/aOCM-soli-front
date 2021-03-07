import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        loadChildren: () => import('./users/user.module').then(m => m.UserModule)
      },
      {
        path: 'solicitudes',
        loadChildren: () => import('./solicitudes/solicitud.module').then(m => m.SolicitudModule)
      },
      {
        path: 'documentos',
        loadChildren: () => import('./documentos/documento.module').then(m => m.DocumentoModule)
      },

      {
        path: 'gestiones',
        loadChildren: () => import('./gestiones/gestion.module').then(m => m.GestionModule)
      }
    ])
  ],
  declarations: []
})
export class EntitiesModule {}
