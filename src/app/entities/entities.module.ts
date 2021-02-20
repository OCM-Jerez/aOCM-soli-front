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

      // {
      //   path: 'documentos',
      //   loadChildren: () => import('./documento/documento.module').then(m => m.OcmSoliServerDocumentoModule)
      // },
      // {
      //   path: 'gestiones',
      //   loadChildren: () => import('./gestion/gestion.module').then(m => m.OcmSoliServerGestionModule)
      // }
    ])
  ],
  declarations: []
})
export class EntitiesModule {}
