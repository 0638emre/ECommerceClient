import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    RouterModule.forChild([
      {path:"", component:OrdersComponent}
    ])
  ]
})
export class OrdersModule { }
