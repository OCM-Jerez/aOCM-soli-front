import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    // si no se usa directivas *ngFor o *ngIF no es necesario importar CommonModule.
    CommonModule
  ]
})
export class UsersModule { }
