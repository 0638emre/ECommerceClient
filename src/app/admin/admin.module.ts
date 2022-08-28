import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { UiModule } from '../ui/ui.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    AdminModule,
    UiModule
  ],
  exports: [
    LayoutModule
  ]
})
export class AdminModule { }
