import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SolicitudComponent } from './solicitud.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';

@NgModule({

  imports: [
            CommonModule,
            FontAwesomeModule
                 ],
  declarations: [
                 SolicitudComponent,
                 NavbarComponent
                ],
  entryComponents: []
})
export class SolicitudModule {}
