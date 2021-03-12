import { NgModule } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [

  ],

  imports: [
    SplitButtonModule,
    PrimeNgModule,

      ]
})
export class LayoutsModule { }
