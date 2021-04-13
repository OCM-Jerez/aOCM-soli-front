import { NgModule } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from "primeng/timeline"

@NgModule({
  declarations: [],
  exports: [
    AvatarModule,
    SplitButtonModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    SidebarModule,
    TableModule,
    TabViewModule,
    TimelineModule,
  ]
})
export class PrimeNgModule { }
