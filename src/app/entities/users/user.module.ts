import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { userRoute } from './user.route';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
            RouterModule.forChild(userRoute),
            CommonModule
          ],
  declarations: [
    UserComponent,
  ],
  entryComponents: [
  ]
})
export class UserModule {}
