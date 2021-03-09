import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ReactiveFormsModule,
    FontAwesomeModule,
            RouterModule.forChild(gestionRoute),
            CommonModule
          ],

  entryComponents: [
      ]
})
export class GestionModule {}
