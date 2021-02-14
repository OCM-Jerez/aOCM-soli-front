import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { documentoRoute } from './documento.route';
import { DocumentoComponent } from './documento.component';

@NgModule({
  imports: [
            RouterModule.forChild(documentoRoute),
            CommonModule
           ],
  declarations: [
    DocumentoComponent,
  ],
  entryComponents: []
})
export class DocumentoModule { }
