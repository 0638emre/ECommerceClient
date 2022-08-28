import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostomersComponent } from './costomers.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CostomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: "", component:CostomersComponent}
    ])
  ]
})
export class CostomersModule { }
