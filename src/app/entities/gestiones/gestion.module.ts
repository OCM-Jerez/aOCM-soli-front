import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';


import { gestionRoute } from './gestion.route';
import { GestionComponent } from './gestion.component';
import { GestionUpdateComponent } from './gestion-update.component';
import { GestionDetailComponent } from './gestion-detail.component';


@NgModule({

  declarations: [
    GestionComponent,
    GestionUpdateComponent,
    GestionDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    PrimeNgModule,
    RouterModule.forChild(gestionRoute),
  ],

  entryComponents: [
  ]
})
export class GestionModule { }
