import { NgModule } from '@angular/core';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from "primeng/timeline"

@NgModule({
  declarations: [],
  exports: [
    SplitButtonModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    RatingModule,
    SidebarModule,
    TableModule,
    TabViewModule,
    TimelineModule,
  ]
})
export class PrimeNgModule { }
