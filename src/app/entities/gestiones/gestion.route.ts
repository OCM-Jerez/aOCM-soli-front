import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { GestionComponent } from './gestion.component';

// @Injectable({ providedIn: 'root' })
export const gestionRoute: Routes = [
  {
    path: '',
    component: GestionComponent,
    resolve: {
    },
    data: {
      defaultSort: 'id,asc',
    }
  }
]
