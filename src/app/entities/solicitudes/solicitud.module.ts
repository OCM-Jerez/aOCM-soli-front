import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SolicitudComponent } from './solicitud.component';
import { SolicitudDetailComponent } from './solicitud-detail.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { solicitudRoute } from './solicitud.route';

@NgModule({

  imports: [
            CommonModule,
            FontAwesomeModule,
            RouterModule.forChild(solicitudRoute)
                 ],
  declarations: [
                 SolicitudComponent,
                 SolicitudDetailComponent,
                 NavbarComponent
                ],
  entryComponents: []
})
export class SolicitudModule {}
