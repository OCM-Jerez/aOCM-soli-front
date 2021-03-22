import { NgModule } from '@angular/core';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  exports: [
    SplitButtonModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    SidebarModule,
   TableModule
  ]
})
export class PrimeNgModule { }
