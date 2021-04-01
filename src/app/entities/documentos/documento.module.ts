import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

import { documentoRoute } from './documento.route';

import { DocumentoComponent } from './documento.component';
import { DocumentoUpdateComponent } from './documento-update.component';
import { DocumentoDetailComponent } from './documento-detail.component';

@NgModule({
  declarations: [
    DocumentoComponent,
    DocumentoUpdateComponent,
    DocumentoDetailComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    PrimeNgModule,
    RouterModule.forChild(documentoRoute),
  ],

  entryComponents: []
})
export class DocumentoModule { }
