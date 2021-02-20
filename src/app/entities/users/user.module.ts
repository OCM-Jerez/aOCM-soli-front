import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { userRoute } from './user.route';
import { UserComponent } from './user.component';
import { UserDatosComponent } from './user-datos.component';

@NgModule({
  imports: [
            RouterModule.forChild(userRoute),
            CommonModule,
            ReactiveFormsModule
          ],
  declarations: [
    UserComponent,
    UserDatosComponent,
  ],
  entryComponents: [
  ]
})
export class UserModule {}
