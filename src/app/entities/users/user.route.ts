import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserComponent } from './user.component';

// @Injectable({ providedIn: 'root' })
export const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: {
    },
    data: {
      defaultSort: 'id,asc'
    }
  },
]