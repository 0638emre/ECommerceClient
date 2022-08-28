import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentModule } from './component/component.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
