import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      // {
      //   path: 'solicitudes',
      //   loadChildren: () => import('./solicitud/solicitud.module').then(m => m.OcmSoliServerSolicitudModule)
      // },
      // {
      //   path: 'documentos',
      //   loadChildren: () => import('./documento/documento.module').then(m => m.OcmSoliServerDocumentoModule)
      // },
      // {
      //   path: 'gestiones',
      //   loadChildren: () => import('./gestion/gestion.module').then(m => m.OcmSoliServerGestionModule)
      // }
    ])
  ]
})
export class EntitiesModule {}
