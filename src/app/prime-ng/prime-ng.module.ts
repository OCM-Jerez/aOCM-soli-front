import { NgModule } from '@angular/core';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  exports: [
    SplitButtonModule,
    ButtonModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
