import { NgModule } from '@angular/core';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [],
  exports: [
    SplitButtonModule,
    ButtonModule,
    ToastModule,
    CalendarModule
  ]
})
export class PrimeNgModule { }
