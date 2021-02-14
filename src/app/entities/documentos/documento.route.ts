import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { DocumentoComponent } from './documento.component';

export const documentoRoute: Routes = [
  {
    path: '',
    component: DocumentoComponent,
    resolve: {
    },
    data: {
      defaultSort: 'id,asc',
    }
  }
 ]
