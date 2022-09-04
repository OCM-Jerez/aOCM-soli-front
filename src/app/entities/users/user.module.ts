import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { userRoute } from './user.route';
import { UserComponent } from './user.component';
import { UserDatosComponent } from './user-datos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    PrimeNgModule,
    RouterModule.forChild(userRoute),
  ],
  declarations: [
    UserComponent,
    UserDatosComponent,
  ],
  entryComponents: [
  ]
})
export class UserModule { }
