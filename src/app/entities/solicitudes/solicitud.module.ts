import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SolicitudComponent } from './solicitud.component';
import { SolicitudDetailComponent } from './solicitud-detail.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { solicitudRoute } from './solicitud.route';
import { SolicitudUpdateComponent } from './solicitud-update.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    SolicitudComponent,
    SolicitudDetailComponent,
    SolicitudUpdateComponent,

    NavbarComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PrimeNgModule,
    RouterModule.forChild(solicitudRoute)
  ],
  entryComponents: []
})
export class SolicitudModule { }
