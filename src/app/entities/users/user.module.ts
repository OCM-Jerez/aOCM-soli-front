import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { userRoute } from './user.route';

@NgModule({
  imports: [
            RouterModule.forChild(userRoute),
            CommonModule
          ],
  declarations: [
    UserComponent,
  ],
  entryComponents: []
})
export class UserModule {}
