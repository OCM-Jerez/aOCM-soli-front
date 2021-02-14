import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionComponent } from './gestion.component';
import { gestionRoute } from './gestion.route';

@NgModule({
  imports: [
            RouterModule.forChild(gestionRoute),
            CommonModule
          ],
  declarations: [
                 GestionComponent
                ],
  entryComponents: [
      ]
})
export class GestionModule {}
