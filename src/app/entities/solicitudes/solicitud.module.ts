import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';

import { solicitudRoute } from './solicitud.route';

import { SolicitudComponent } from './solicitud.component';
import { SolicitudDetailComponent } from './solicitud-detail.component';
import { SolicitudUpdateComponent } from './solicitud-update.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { StepperComponent } from '../../layouts/stepper/stepper.component';

@NgModule({
  declarations: [
    SolicitudComponent,
    SolicitudDetailComponent,
    SolicitudUpdateComponent,
    NavbarComponent, // Hay que declararlo aqui, de lo contrario da error.
    StepperComponent // Hay que declararlo aqui, de lo contrario da error.
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    PrimeNgModule,
    RouterModule.forChild(solicitudRoute)
  ],
  entryComponents: []
})
export class SolicitudModule { }
