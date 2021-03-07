import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { documentoRoute } from './documento.route';
import { DocumentoComponent } from './documento.component';
import { DocumentoUpdateComponent } from './documento-update.component';
import { DocumentoDetailComponent } from './documento-detail.component';

@NgModule({
 declarations: [
    DocumentoComponent,
    DocumentoUpdateComponent,
    DocumentoDetailComponent
    // NavbarComponent
  ],

  imports: [
            ReactiveFormsModule,
            FontAwesomeModule,
            RouterModule.forChild(documentoRoute),
            CommonModule
           ],

  entryComponents: []
})
export class DocumentoModule { }
