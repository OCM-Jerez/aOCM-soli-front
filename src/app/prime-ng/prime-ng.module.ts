import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
// import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
// import { TimelineModule } from "primeng/timeline"
// import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CalendarModule,
    RatingModule,
    // SidebarModule,
    TableModule,
    TabViewModule,
    // TimelineModule,
    // ToastModule,
  ]
})
export class PrimeNgModule { }
