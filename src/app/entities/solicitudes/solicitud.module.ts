import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SolicitudComponent } from './solicitud.component';

@NgModule({

  imports: [
            CommonModule,
            FontAwesomeModule

           ],
  declarations: [
                 SolicitudComponent
                ],
  entryComponents: []
})
export class SolicitudModule {}
